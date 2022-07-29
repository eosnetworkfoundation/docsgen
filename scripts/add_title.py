#!/usr/bin/env python3

# goes through markdown files adding title meta-tag
# ---
# title: Swift SDK for EOS
# ---

import sys
import logging
import re
# require python 3.4+
from pathlib import Path

# start at specified directory and work your way down
# open the file and check for existing meta-data
# when no meta-data add title
#    when file is named index title is directory name
#    when file is named something else use file name
# when meta-data exists make sure it confirm to standard
def usage():
    return "please pass in a directory"

if len(sys.argv) < 2:
    print (usage())
    exit(1)

############ GLOBAL VARS ################
full_file_path = sys.argv[1]
# must match pattern to continue
file_name_filter = re.compile(".+\.md$")


########### BEHAVIORS ##################
logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)

##### Class for document
class Document:
    has_metablock = False
    is_valid_metablock = False
    # patter to grab meta-data block
    metabock_pattern = re.compile(r"^---\n([a-z0-9_-]*title)\s*:\s*([^\n]+)\n---\n", re.MULTILINE)
    metabock_replace_pattern = re.compile(r"^---\n[^:]+:[^:]+\n---\n", re.MULTILINE)
    meta_name = ""
    meta_value = ""
    contents = ""

    def __init__(self, contents):
        self.contents = contents
        self.has_metablock = False
        self.is_valid_metablock = False
        match = re.search(self.metabock_pattern,contents)
        if match:
            self.has_metablock = True
            logging.debug('\t\t MATCH |'+match.group(1)+'|'+match.group(2)+'|')
            self.meta_name = match.group(1)
            self.meta_value = match.group(2)
            #self.content = match.group(3)
            if self.meta_name == "title":
                self.is_valid_metablock = True

    def is_valid_metablock(self):
        return self.is_valid_metablock

    def has_metablock(self):
        return self.has_metablock

    def set_name(self,name):
        self.meta_name = name

    def set_value(self,value):
        self.meta_value = value

    def get_name(self):
        return self.meta_name

    def get_value(self):
        return self.meta_value

    def update_metablock(self,newblock):
        return re.sub(self.metabock_replace_pattern, newblock, self.contents, 1)

##### END Class Document #######

##### Class for format of meta data
class MetaBlock:
    start_meta_section = "---"
    title = "title"
    seperator = ":"
    end_meta_section = "---"

    def block(self,value):
        return f"{self.start_meta_section}\n{self.title}{self.seperator} {value}\n{self.start_meta_section}\n"

##### END Class MetaBlock #######

#### Global Method for Determine Client Side Path
def is_client_side(file_parts):

    is_client_side = False

    if len(file_parts) > 4 and (
        file_parts[-3] == "client-side"
        or file_parts[-4] == "client-side"
        ):

        is_client_side = True

    return is_client_side

#### Global Method default way of creating title tag
def general_title(sub_directory, last_item, extensions):
    value = sub_directory.replace("_"," ")
    if last_item != "index.md":
        # remove the extenstion and turn undscr to space
        value = str(last_item).removesuffix(extensions).replace("_"," ")
    return value

#### Global Method client-side way of creating title tag
def client_side_title(sub_directory, last_item):
    value = ""
    if sub_directory == "swiftdocs" and last_item == "index.md":
        return "EOS Swift SDK"
    if sub_directory == "jsdocs" and last_item == "README.md":
        return "EOS JS SDK"
    if sub_directory == "jsdocs" and last_item == "LICENSE.md":
            return "EOS JS SDK License"
    if sub_directory == "jsdocs" and last_item == "CONTRIBUTING.md":
            return "Contributing"
    if sub_directory == "jsdocs" and last_item == "modules.md":
            return "EOS JS Exports"
    if sub_directory == "swiftdocs" and last_item == "README.md":
        return "EOS Swift Overview"
    return value

#### Global Method calculate the proper title for the doc
#### Note: ok to return empty value
####       value.len()<2 will be skipped during doc write
def calculate_value(file_name):
    p = Path(file_name)
    file_components = p.parts
    last_item = file_components[-1]
    sub_directory = file_components[-2]

    if is_client_side(file_components):
        value = client_side_title(sub_directory, last_item)
    else:
        # filename extensions
        extensions = "".join(p.suffixes)
        value = general_title(sub_directory, last_item, extensions)
        # capitalize words
        value = value.title()

    # remove leading numbers and spaces
    return value.lstrip('0123456789 ')

##################### MAIN ##################
meta_block = MetaBlock()


# check acceptable file name
# if no match, skip rest of loop and go to next item
# this skips over binary files
pass_filter = re.search(file_name_filter, full_file_path)
if not pass_filter:
    logging.debug("skipping "+full_file_path+" failed filter by name")
    exit(1)

# read file get data create document object
input_file = open(full_file_path, 'r', encoding="utf-8")
logging.debug(" fullpath = "+full_file_path)
f_content = input_file.read()
f_document = Document(f_content)
input_file.close()

# only open file for writing if it has not block or has a bad block
# leave the good files alone
if ( not f_document.has_metablock ) or \
   ( f_document.has_metablock and not f_document.is_valid_metablock):
    with open(full_file_path, 'w', encoding="utf-8") as f:
        # if no meta block : add one
        if not f_document.has_metablock:
            value = calculate_value(full_file_path)
            # default to empty
            newblock = ""
            # if value is legit set metadata
            if len(value) >2:
                logging.debug("\t\t NO METADATA BLOCK")
                newblock = meta_block.block(value)
            f.write(newblock+f_content)
            # else if meta block exists
        else:
            # however meta block is bad : update it
            if not f_document.is_valid_metablock:
                logging.debug("\t\t INVALID")
                newblock = meta_block.block(f_document.get_value())
                # replace invalid block
                f.write(f_document.update_metablock(newblock))
