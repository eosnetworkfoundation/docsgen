#!/usr/bin/env python3

import argparse
import re
import sys
import logging
import semver

from git import Repo

def init_argparse() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog = 'latest_release_branch.py',
        description = 'get the name of the latest release branch',
        epilog = 'its a guess based on convention from they way we do things')
    parser.add_argument('-o', '--owner', required=True, help='string of the github owner')
    parser.add_argument('-r', '--repository', required=True, help='name of the repository')
    parser.add_argument('-d', '--directory', required=True, help='root directory of repositories')
    # default false, switch to true when option provided
    parser.add_argument('-b', '--show-branch', action='store_true', help='by default display latest tag, this option show latest branch')
    return parser

####
# Encapsulate patterns in a function
####
def patterns() -> {}:
    pattern = {}
    pattern['branch'] = re.compile(r"^origin/release/(.*)")
    pattern['tag'] = re.compile(r"^refs/tags/v(.*)")
    return pattern
####
# Want to use semver. Doesn't always work because patch level is missing
# leads to some complicated logic to get latest version
####
def compare_versions(canidate, this_release) -> bool:
    if (semver.VersionInfo.isvalid(canidate) and semver.VersionInfo.isvalid(this_release)):
        c = semver.VersionInfo.parse(canidate)
        t = semver.VersionInfo.parse(this_release)
        return semver.VersionInfo.compare(c, t) > 0
    return canidate > this_release

####
# Iterates over a list of strings, using 'compare_verions' function to find best
####
def search_references(refs, pattern) -> str:
    latest_name=None
    for name in refs:
        match = re.search(pattern, name)
        if match:
            if latest_name is None or compare_versions(match.group(1),latest_name):
                latest_name= match.group(1)
    return latest_name

####
# cdt repo had weird tags used this to clean out the junk
####
def clean_tags(tags) -> []:
    cleaned = []
    for name in tags:
        match = re.search(r"\^\{\}",name)
        if not match:
            cleaned.append(name)
    return cleaned

####
# queries remote for a list of tags
####
def latest_tag(repo, pattern) -> str:
    # get tags, returns a multi-line, tab seperated string
    remote_refs = repo.git.ls_remote("--tags", "origin").split('\n')
    # if empty, abort : otherwise error will occure
    if (len(remote_refs) < 1) or (len(remote_refs) == 1 and not remote_refs[0]):
        logging.debug("no tags found returning None")
        return None
    tag_names = clean_tags(map(lambda ref: ref.split('\t')[1], remote_refs))
    latest_name = search_references(tag_names, pattern)

    if latest_name is None:
        return None

    full_name = f'v{latest_name}'
    return full_name

####
# queries remote for a list of branches
####
def latest_branch(repo, pattern) -> str:
    # get all remote branches
    remote_refs = repo.remote().refs
    # get the name
    branch_names = map(lambda ref: ref.name, remote_refs)
    latest_name = search_references(branch_names, pattern)

    if latest_name is None:
        return None

    full_name = f'release/{latest_name}'
    return full_name

###################### MAIN #################################
def main(passed_args) -> str:
    parser = init_argparse()
    # Parse args, sys.argv for testing
    args = parser.parse_args(passed_args)
    # put together repo path
    logging.basicConfig(stream=sys.stderr, level=logging.ERROR)
    repo_path= args.directory + "/" + args.owner + "/" + args.repository

    # static patterns
    pattern = patterns()

    # open repository
    logging.debug('opening %s\n', repo_path)
    repo = Repo(repo_path)
    assert not repo.bare

    full_name=None
    if args.show_branch:
        full_name = latest_branch(repo, pattern['branch'])
    else:
        full_name = latest_tag(repo, pattern['tag'])

    return full_name

if __name__ == "__main__":
    print(main(sys.argv[1:]))
