#!/usr/bin/env python3

# goes through markdown files updating info, warning, caution, danger, note, and tip flags
# FROM: [[info | some text here ]]
# TO: :::info
# some text here
# :::

import sys
import logging
import re
# require python 3.4+
from pathlib import Path

def usage():
    return "please pass in a file"

if len(sys.argv) < 2:
    print (usage())
    exit(1)

############ GLOBAL VARS ################
full_file_path = sys.argv[1]
# must match pattern to continue
file_name_filter = re.compile(".+\.md$")


########### BEHAVIORS ##################
logging.basicConfig(stream=sys.stderr, level=logging.ERROR)

##### Class for document
class Document:
    has_admonition = False
    admonition_pattern = re.compile(r"\[\[([a-z]+)\s*\|\s*([^\]]+)\]\]")
    basic_admonition_pattern = re.compile(r"\[\[([a-z]+)\]\]")
    contents = None

    def __init__(self, contents):
        self.contents = contents

    def needs_update(self):
        return self.has_admonition and self.contents

    def newblock(self, type, value):
        return f':::{type}\n{value}\n:::'

    def update_metablock(self):
        match = re.search(self.admonition_pattern,self.contents)
        if match:
            self.has_admonition = True
            logging.debug('\t\t MATCH |'+match.group(1)+'|'+match.group(2)+'|')
            meta_type = match.group(1)
            meta_value = match.group(2)
            newblock = self.newblock(meta_type,meta_value)
            self.contents = re.sub(self.admonition_pattern, newblock, self.contents)
        else:
            basic = re.search(self.basic_admonition_pattern,self.contents)
            if basic:
                self.has_admonition = True
                logging.debug('\t\t MATCH |'+basic.group(1)+'|')
                meta_type = basic.group(1)
                newblock = self.newblock(meta_type,"")
                self.contents = re.sub(self.basic_admonition_pattern, newblock, self.contents)

##### END Class Document #######


##################### MAIN ##################

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
all_content = input_file.read()
f_document = Document(all_content)
f_document.update_metablock()
input_file.close()

# update and write back file
if f_document.needs_update():
    with open(full_file_path, 'w', encoding="utf-8") as f:
        f.write(f_document.contents)
