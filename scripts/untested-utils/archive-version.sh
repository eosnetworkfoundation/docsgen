#!/usr/bin/env bash

BUILD_ROOT="/Users/eric/eosnetworkfoundation/build_root"

cd "${BUILD_ROOT}"/devdocs/

dir="leap"
tag="2.0"
npm run docusaurus docs:version:"${dir}" "${tag}"


for i in $(find "${dir}"_versioned_docs -type f -name "*.md")
do
  sed "s/\/${dir}\/latest\//\/${dir}\/${tag}\//g" $i > tmp.md
  mv tmp.md $i
done
