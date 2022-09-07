#!/usr/bin/env python3

# opens glossary file
# builds a dictionary looks at '-' as start of block
# puts in name value pairs
# pays attendtion to num of spaces preceeding '-' to get nesting levels right

import sys
import logging
import re
# require python 3.4+
from pathlib import Path

def usage():
    return "please pass in a filename"

if len(sys.argv) < 2:
    print (usage())
    exit(1)

############ GLOBAL VARS ################
file = sys.argv[1]
# new entity
entity_pattern = re.compile("^[a-zA-Z0-9]+:$")
definition_wquote_pattern = re.compile('^(\s+)-\s([a-zA-Z0-9]+):\s+"(.+)"$')
definition_nquote_pattern = re.compile('^(\s+)-\s([a-zA-Z0-9]+):\s+(.+)$')
attribute_wquote_pattern = re.compile('^(\s+)([a-zA-Z0-9]+):\s+"(.+)"$')
attribute_nquote_pattern = re.compile('^(\s+)([a-zA-Z0-9]+):\s+(.+)$')
attribute_list_pattern = re.compile('^(\s+)([a-zA-Z0-9]+):\s+$')

########### BEHAVIORS ##################
logging.basicConfig(stream=sys.stderr, level=logging.WARN)

# read file get data create document object
entities = []
this_entity = {}
sub_entity = {}
line_count = 0
logging.debug("file = "+file)
is_list_mode = False
list_name = ""

with open(file, 'r', encoding="utf-8") as input_file:
    for line in input_file:
        line_count = line_count + 1
        logging.debug("processing line #"+str(line_count))
        logging.debug("    "+line)
        # ### Run the matches ###
        # Top level dictionary
        entity_match = re.search(entity_pattern,line)
        term_wquote_match = re.search(definition_wquote_pattern,line)
        term_nquote_match = re.search(definition_nquote_pattern,line)
        # New Attributes in dictionary, match withquotes and without quotes
        attr_wquote_match = re.search(attribute_wquote_pattern,line)
        attr_nquote_match = re.search(attribute_nquote_pattern,line)
        # Start of a list
        attr_list_match = re.search(attribute_list_pattern,line)


        # Top Level Terms should happen once
        if entity_match:
            # definetly end list mode no leading spaces
            is_list_mode = False
            if len(entities) > 0:   # only append if previous items, brand new do nothing
                logging.debug("  new entity")
                entities.append(this_entity)
                if term_wquote_match or term_nquote_match or attr_wquote_match or attr_nquote_match or attr_list_match:
                    logging.error("UNEXPECTED DOUBLE MATCH on line "+str(line_count)+line)

        # New terms in dictionary
        if term_wquote_match:
            leading_spaces = term_wquote_match.group(1)
            name = term_wquote_match.group(2)
            value = term_wquote_match.group(3)
        if term_nquote_match and not term_wquote_match:
            leading_spaces = term_nquote_match.group(1)
            name = term_nquote_match.group(2)
            value = term_nquote_match.group(3)

        if term_wquote_match or term_nquote_match:
            if len(leading_spaces) < 4:   # new top level term
                if len(this_entity) > 0: # append entity
                    logging.debug("  **new entity")
                    entities.append(this_entity)
                this_entity = {}
                logging.debug("  ->term adding: "+name)
                this_entity[name] = value
                # end list mode less then 4 leading spaces
                is_list_mode = False
            else:                        # just append sub level for now
                logging.debug("  ->sub term adding: "+name)
                sub_entity[name] = value
                if is_list_mode:
                    this_entity[list_name].append(sub_entity)
            if entity_match or attr_wquote_match or attr_nquote_match or attr_list_match:
                logging.error("UNEXPECTED DOUBLE MATCH on line "+str(line_count)+line)

        # New Attributes in dictionary, match withquotes and without quotes
        if attr_wquote_match and not (term_wquote_match or term_nquote_match):        # new attribute to append
            leading_spaces = attr_wquote_match.group(1)
            name = attr_wquote_match.group(2)
            value = attr_wquote_match.group(3)
            if len(leading_spaces) < 4:
                is_list_mode = False
            logging.debug("  ->attr adding: "+name)
            this_entity[name] = value
            if entity_match or attr_list_match:
                logging.error("UNEXPECTED DOUBLE MATCH on line "+str(line_count)+line)
        if attr_nquote_match and not (attr_wquote_match or term_wquote_match or term_nquote_match): # new attribute to append
            leading_spaces = attr_nquote_match.group(1)
            name = attr_nquote_match.group(2)
            value = attr_nquote_match.group(3)
            if len(leading_spaces) < 4:
                is_list_mode = False
            logging.debug("  ->attr adding: "+name)
            this_entity[name] = value
            if entity_match or attr_list_match:
                logging.error("UNEXPECTED DOUBLE MATCH on line "+str(line_count)+line)

        # Found the start of a list
        if attr_list_match and not (term_wquote_match or term_nquote_match or entity_match):
            leading_spaces = attr_list_match.group(1)
            name = attr_list_match.group(2)
            logging.debug("  ->attr list: "+name)
            is_list_mode = True
            list_name = name
            this_entity[name] = list()
            if attr_wquote_match or attr_nquote_match:
                logging.error("UNEXPECTED DOUBLE MATCH on line "+str(line_count)+line)


# Calculate File Name for Heading
p = Path(file)
file_components = p.parts
last_item = file_components[-1]
extensions = "".join(p.suffixes)
heading = str(last_item).removesuffix(extensions).replace("_"," ")
heading = heading.title()
# print heading
print (f'# {heading}')

for i, entity in enumerate(entities):
    keys = entity.keys()
    heading = entity["name"]
    ## print Glossary entry name
    print (f'## {heading}')
    print (entity["definition"].replace(r'\"', '"'))
    if "abbreviation" in keys:
        value = entity["abbreviation"]
        print (f'**Abbreviation**: {value}')
    if "related" in keys:
        list_of_items = entity["related"]
        related_string = ""
        # its a list of dict
        for rNum, rEntity in enumerate(list_of_items):
            rKeys = rEntity.keys()
            if "name" in rKeys:
                link = f'[{rEntity["name"]}](#{rEntity["name"]})'
                if len(related_string) > 0:
                    related_string = related_string + " " + link
                else: # first
                    related_string = link
        print (f'**Related**: {related_string}')

    #for k, v in entity.items():
    #    print(f'-> Name: {k}')
    #    print(f'-> Value: {v}')
