#!/usr/bin/env bash

pushd pytest || exit
pytest latest_version_full.py
popd || exit

npm install cypress --save-dev
npm run test
