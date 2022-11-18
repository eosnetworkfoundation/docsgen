#!/usr/bin/env bash

# compute script dir for copying files from here to web directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

NY=$(TZ=America/New_York date "+%a %b %d %r")
LA=$(TZ=America/Los_Angeles date "+%a %b %d %r")
HK=$(TZ=Asia/Hong_Kong date "+%a %b %d %r")
EB=$(TZ=Europe/Budapest date "+%a %b %d %r")

sed "s/##America\/Los_Angeles##/$LA/" "${SCRIPT_DIR:?}"/../web/last_updated.html | \
  sed "s/##America\/New_York##/$NY/" | \
  sed "s/##Asia\/Hong_Kong##/$HK/" | \
  sed "s/##Europe\/Budapest##/$EB/"
