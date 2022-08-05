#!/usr/bin/env bash

MYSITE=${1:-http://localhost:39999}

echo "Examing Site ${MYSITE}"

echo "Intalling Broken Link Checker"
npm i puppeteer > /dev/null

echo "Running Broken Link Checker"
npx blc $MYSITE -rov
