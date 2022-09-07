#!/usr/bin/env bash

Install_Mandel-eosjs() {
  SCRIPT_DIR=$1
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_BRANCH=$4
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_TAG=$5

  # required dependancy
  npm install --save @types/text-encoding
  # generate the docs there is a typedoc.json config
  node_modules/typedoc/bin/typedoc --plugin typedoc-plugin-markdown

  # We need to move things around
  # typedoc-out will become SDK API
  # and SDK API will be nested under typedoc-out
  # replace bad index (modules.md) with good index (index.md)
  [ -d "SDK Reference" ] && rm -rf "SDK Reference"
  mv typedoc-out "SDK Reference"
  rm "SDK Reference"/modules.md
  # typedoc copies README into place and we don't want that
  rm "SDK Reference"/README.md

  "${SCRIPT_DIR}"/build_index_md.sh -d "SDK Reference" -n 'eosjs Code References' > "SDK Reference"/index.md
  find "SDK Reference" -type f -name "*.md" -print0 | while IFS= read -r -d '' file
  do
    sed 's/(..\/modules.md)/(..\/index.md)/g' "$file" > tempIDX.md
    mv tempIDX.md "$file"
  done

  [ -d markdown_out ] && rm -rf markdown_out
  mkdir markdown_out
  mv "SDK Reference" markdown_out


  # add contributing and license files
  cp ./CONTRIBUTING.md markdown_out/
  # remove reference to LICENSE
  grep -v LICENSE README.md > markdown_out/README.md

  # copy files in, view framework will convert from Markdown to HTML
  [ -d "${ARG_BUILD_DIR}"/devdocs/eosdocs/eosjs ] && rm -rf "${ARG_BUILD_DIR:?}"/devdocs/eosdocs/eosjs
  mkdir -p "${ARG_BUILD_DIR:?}"/devdocs/eosdocs/eosjs || exit 1
  cp -R markdown_out/* "${ARG_BUILD_DIR:?}"/devdocs/eosdocs/eosjs
}
