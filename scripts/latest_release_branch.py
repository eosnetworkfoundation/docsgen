#!/usr/bin/env python3

import argparse
from git import Repo
import logging
import sys
import re

parser = argparse.ArgumentParser(
                    prog = 'latest_release_branch.py',
                    description = 'get the name of the latest release branch',
                    epilog = 'its a guess based on convention from they way we do things')
parser.add_argument('-o', '--owner', required=True, help='string of the github owner')
parser.add_argument('-r', '--repository', required=True, help='name of the repository')
parser.add_argument('-d', '--directory', required=True, help='root directory of repositories')
# Parse args
args = parser.parse_args()
# put together repo path
logging.basicConfig(stream=sys.stderr, level=logging.ERROR)
repo_path= args.directory + "/" + args.owner + "/" + args.repository

# static patterns
default_release_pattern = re.compile(r"^origin/release/(.*)")
# open repository
logging.debug('opening '+repo_path+'\n');
repo = Repo(repo_path)
assert not repo.bare

# iterate through all the branches
remote_refs = repo.remote().refs

latest_branch=None
for refs in remote_refs:
    match = re.search(default_release_pattern,refs.name)
    if match:
        if latest_branch is None or match.group(1) > latest_branch:
            latest_branch= match.group(1)
print(f'release/{latest_branch}')
