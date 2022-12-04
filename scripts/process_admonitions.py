#!/usr/bin/env python3

# goes through markdown files updating info, warning, caution, danger, note, and tip flags
# FROM: [[ info ]]
# TO: :::info
# :::
# FROM: [[ info | title ]]
# TO: :::info title
# :::
# FROM: [[ info ]]
# | some text here\n
# TO: :::info
# some text here
# :::
# FROM: [[ info | title ]]
# | some text here\n
# TO: :::info title
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
    # any match in file used for decision to overwrite file contents
    has_admonitions = False
    # different patterns to match , different groups
    # match [[ type | some stuff here ]] | inline body
    admonition_inline_body_pattern = re.compile(r"\[\[([a-z]+)\s*\|\s*([^\]]+)\]\]\s*\|\s*([^\r\n]+)")
    # match [[ type | some suff here ]]
    admonition_pattern = re.compile(r"\[\[([a-z]+)\s*\|\s*([^\]]+)\]\]")
    # match [[ type ]]
    basic_admonition_pattern = re.compile(r"\[\[([a-z]+)\]\]")
    # match [[ type ]] | inline body
    basic_admonition_inline_body_pattern = re.compile(r"\[\[([a-z]+)\]\]\s*\|\s*([^\r\n]+)")
    ## match | content text for admonition
    admonition_body_pattern = re.compile(r"\|\s*([^\r\n]+)")
    # working needed because this is multi-line pattern
    working_on_admonition = False
    admonition_type = None
    admonition_title = None
    admonition_body = None
    # entire file contents
    contents = None

    # State Vanila: not working on admonition -> print line
    #      This is initial state
    #      enter: working_on_admonition is false
    #      transition: sets working_on_admonition true
    #      previous state: None
    # State Working Line1: process line 1 and supress
    #      enter: working_on_admonition is true
    #      transition: sets state_change false
    #      previous state: Vanila
    # State Working Line2+: process line 2+ and print
    #      enter: working_on_admonition is true
    #             and state_change is false
    #      transition: reset to init
    #      previous state: Working Line 1
    def add_line(self,line):
        previous_state = self.working_on_admonition
        # check for and process admonition line1
        # if match self.working_on_admonition is True
        self.find_admonition(line)
        current_state = self.working_on_admonition

        state_change = previous_state != current_state

        logging.debug("LINE: "+line)
        logging.debug("WORKING ON AD: "+("TRUE" if self.working_on_admonition else "FALSE"))
        logging.debug("STATE CHANGE: "+("TRUE" if state_change else "FALSE"))

        # not working_on_ad.. state is Vanila
        if not self.working_on_admonition:
            logging.debug("stopped working on admonition: ")
            self.contents = (self.contents if (self.contents is not None) else "") + line
        else:
            # prevent reprocessing of first line of admonition check for state change
            if not state_change:
                logging.debug("checking following line for body: ")
                has_text_body = self.process_admonition_body(line)
                if has_text_body:
                    logging.debug("working on admonition line 2+: with text body")
                else:
                    self.contents = (self.contents if (self.contents is not None) else "") + self.print_newblock()
                    logging.debug("corner case following text line is not part of admonition so add it back\n")
                    self.contents = (self.contents if (self.contents is not None) else "") + line
                    self.reset_to_init()

    # finish processing at end of file
    # clean up dangling references
    def end_of_file(self):
        if self.working_on_admonition:
            self.contents = (self.contents if (self.contents is not None) else "") + self.print_newblock()
            self.reset_to_init()

    def needs_update(self):
        return self.has_admonitions and self.contents

    def print_newblock(self):
        if self.admonition_body is not None:
            if self.admonition_title is not None:
                return f'\n:::{self.admonition_type} {self.admonition_title}\n\n{self.admonition_body}\n\n:::\n\n'
            else:
                return f'\n:::{self.admonition_type}\n\n{self.admonition_body}\n\n:::\n\n'
        elif self.admonition_title is not None:
            return f'\n:::{self.admonition_type} {self.admonition_title}\n\n:::\n\n'
        else:
            return f'\n:::{self.admonition_type}\n\n:::\n\n'

    def reset_to_init(self):
        # reset data
        self.working_on_admonition = False
        self.admonition_type = None
        self.admonition_title = None
        self.admonition_body = None

    def process_admonition_body(self, line):
        match = re.search(self.admonition_body_pattern,line)
        if match:
            logging.debug("body match: "+match.group(1))
            if self.admonition_body is None:
                self.admonition_body = match.group(1)
            else:
                self.admonition_body = self.admonition_body + '\n' + match.group(1)
            # just incase a single line has multiple parts
            self.process_body_with_pipes()
        # need to know true/false on match
        return match

    def process_body_with_pipes(self):
        lines = self.admonition_body.split('|')
        new_lines = [(item.strip()) for item in lines]
        self.admonition_body = '\n'.join(new_lines)

    def find_admonition(self, line):
        match = re.search(self.admonition_pattern,line)
        if match:
            self.has_admonitions = True
            self.working_on_admonition = True
            logging.debug('\t\t MATCH |'+match.group(1)+'|'+match.group(2)+'|')
            self.admonition_type = match.group(1)
            self.admonition_title = match.group(2)
            inline_body_match = re.search(self.admonition_inline_body_pattern, line)
            if inline_body_match:
                logging.debug('\t\t INLINE BODY '+inline_body_match.group(3))
                self.admonition_body = inline_body_match.group(3)
                # single line inline bodies need this
                self.process_body_with_pipes()
        else:
            basic = re.search(self.basic_admonition_pattern,line)
            if basic:
                self.has_admonitions = True
                self.working_on_admonition = True
                logging.debug('\t\t MATCH |'+basic.group(1)+'|')
                self.admonition_type = basic.group(1)
                inline_body_match = re.search(self.basic_admonition_inline_body_pattern, line)
                if inline_body_match:
                    logging.debug('\t\t INLINE BODY '+inline_body_match.group(2))
                    self.admonition_body = inline_body_match.group(2)
                    # single line inline bodies need this
                    self.process_body_with_pipes()

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
all_content = input_file.readlines()
input_file.close()

f_document = Document()
for line in all_content:
    f_document.add_line(line)
# look for dangling admonitions
f_document.end_of_file()

# update and write back file
if f_document.needs_update():
    with open(full_file_path, 'w', encoding="utf-8") as f:
        f.write(f_document.contents)
