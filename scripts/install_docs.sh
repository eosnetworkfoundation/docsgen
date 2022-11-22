#!/usr/bin/env bash

# Populates the following directories
# images go into static/docs
#
#  docs
#     getting-started (has images)
#     getting-started
#            development-environment
#            smart-contract-development
#     overview (has images)
#     eosio-blockchain-networks
#     get-involved
#     tutorials
#     protocol (has images)
#     community-developer-tools
#  static
#     docs
Install_Docs() {
  SCRIPT_DIR=$1
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_BRANCH=$4
  # shellcheck disable=SC2034  # Unused variables to keep method call enforced
  ARG_TAG=$5

  IMG_DIR="${ARG_BUILD_DIR:?}"/devdocs/static/docs
  # place for docs static image files
  [ ! -d "$IMG_DIR" ] && mkdir "$IMG_DIR"

  # copy out to keep docs clean and process idempotent
  [ -d markdown_out ] && rm -rf markdown_out
  mkdir markdown_out
  cp -R docs/* markdown_out

  # added meta data for repo and branch to each file
  # shellcheck source=scripts/add_front_matter.sh
  source "${SCRIPT_DIR}"/add_front_matter.sh
  # 2nd arg our working directory
  Add_Front_Matter "$ARG_GIT_REPO" "markdown_out" "$ARG_BRANCH" "$ARG_TAG"

  # setup images
  if [ -d markdown_out/01_overview/images ]; then
     cp -r markdown_out/01_overview/images/* "$IMG_DIR"
     # move it out of the way so it doens't get copied as doc
     mv markdown_out/01_overview/images ./overview-images
  fi
  # update image paths
  find markdown_out/01_overview -type f -name "*.md" -print0 | while IFS= read -r -d '' i
  do
    sed 's/(\.\/images\//(\/docs\//g' "$i" > tmpP.md
    mv tmpP.md "$i"
  done

  # setup images
  if [ -d markdown_out/02_getting-started/images ]; then
     cp -r markdown_out/02_getting-started/images/* "$IMG_DIR"
     # move it out of the way so it doens't get copied as doc
     mv markdown_out/02_getting-started/images ./getting-started-images
  fi
  # update image paths
  find markdown_out/02_getting-started -type f -name "*.md" -print0 | while IFS= read -r -d '' i
  do
    sed 's/(\.\.\/images\//(\/docs\//g' "$i" > tmpP.md
    mv tmpP.md "$i"
  done

  # setup images
  if [ -d markdown_out/04_protocol/images ]; then
      cp -r markdown_out/04_protocol/images/* "$IMG_DIR"
      # move it out of the way so it doens't get copied as doc
      mv markdown_out/04_protocol/images ./protocol-images
  fi
  # update image paths
  find markdown_out/04_protocol -type f -name "*.md" -print0 | while IFS= read -r -d '' i
  do
    sed 's/(images\//(\/docs\//g' "$i" > tmpP.md
    mv tmpP.md "$i"
  done

  # patch up files titles
  find markdown_out -type f -print0 | xargs -0 -I{} "${SCRIPT_DIR:?}"/process_admonitions.py {}

  # fix paths for dev tools
  find markdown_out -type f -name "*.md" -print0 | while IFS= read -r -d '' file
  do
    FIND="\/eosdocs\/developer-tools\/cleos\/how-to-guides\/how-to-create-a-wallet.md"
    REPLACE="\/leap\/latest\/cleos\/how-to-guides\/how-to-create-a-wallet"
    sed "s/${FIND}/${REPLACE}/g" "$file" > tempCW.md

    FIND="\/eosdocs\/developer-tools\/cleos\/how-to-guides\/how-to-create-an-account.md"
    REPLACE="\/leap\/latest\/cleos\/how-to-guides\/how-to-create-an-account"
    sed "s/${FIND}/${REPLACE}/g" tempCW.md > tempCA.md

    FIND="\/developer-tools\/02_cleos\/03_command-reference\/set\/set-account.md"
    REPLACE="\/leap\/latest\/02_cleos\/03_command-reference\/set\/set-account"
    sed "s/${FIND}/${REPLACE}/g" tempCA.md > tempSA.md

    FIND="\/eosdocs\/developer-tools\/cleos\/command-reference\/wallet\/create.md"
    REPLACE="\/leap\/latest\/cleos\/command-reference\/wallet\/create"
    sed "s/${FIND}/${REPLACE}/g" tempSA.md > tempWC.md

    # handles full URLs
    FIND="\/eosdocs\/developer-tools"
    REPLACE="\/leap\/latest"
    sed "s/${FIND}/${REPLACE}/g" tempWC.md > tempDT.md

    # fix glossary
    sed 's/(\/glossary.md/(glossary.md/g' tempDT.md > tempG.md

    mv tempG.md "$file"
  done

  FIND="action-reference\/eosio\.bios"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosiobios_1_1bios"
  sed "s/${FIND}/${REPLACE}/" markdown_out/04_protocol/index.md > tmp_index.md
  mv tmp_index.md markdown_out/04_protocol/index.md

  FIND="action-reference\/eosio\.system"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosiosystem_1_1system__contract"
  sed "s/${FIND}/${REPLACE}/" markdown_out/04_protocol/index.md > tmp_index.md
  mv tmp_index.md markdown_out/04_protocol/index.md

  FIND="action-reference\/eosio\.msig"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosio_1_1multisig"
  sed "s/${FIND}/${REPLACE}/" markdown_out/04_protocol/index.md > tmp_index.md
  mv tmp_index.md markdown_out/04_protocol/index.md

  FIND="action-reference\/eosio\.token"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosio_1_1token"
  sed "s/${FIND}/${REPLACE}/" markdown_out/04_protocol/index.md > tmp_index.md
  mv tmp_index.md markdown_out/04_protocol/index.md

  FIND="action-reference\/eosio\.wrap"
  REPLACE="\/system-contracts\/latest\/reference\/Classes\/classeosio_1_1wrap"
  sed "s/${FIND}/${REPLACE}/" markdown_out/04_protocol/index.md > tmp_index.md
  mv tmp_index.md markdown_out/04_protocol/index.md


  # add front matter for glossary: one off special
  echo "---" > "${ARG_BUILD_DIR:?}"/devdocs/eosdocs/docs/glossary.md
  BRANCH=$(Calculate_Branch "${ARG_BRANCH}" "${ARG_TAG}")
  RAW_PATH="${ARG_GIT_REPO:?}/tree/${BRANCH:-main}/"
  THIS_FILE_META=$(printf 'tags:\n  - %s/glossary.md\n  - %s\n  - %s' "${RAW_PATH}" "${ARG_GIT_REPO}" "${BRANCH:-main}" | sed 's#///#/#g' | sed 's#//#/#g')
  # shellcheck disable=SC2129
  printf '%s\n' "${THIS_FILE_META}" >> "${ARG_BUILD_DIR:?}"/devdocs/eosdocs/docs/glossary.md
  echo "---" >> "${ARG_BUILD_DIR:?}"/devdocs/eosdocs/docs/glossary.md
  cat glossary.md >> "${ARG_BUILD_DIR:?}"/devdocs/eosdocs/docs/glossary.md

  # copy in the files to build root
  cp markdown_out/index.md "${ARG_BUILD_DIR:?}"/devdocs/eosdocs/docs
  cp -r markdown_out/* "${ARG_BUILD_DIR:?}"/devdocs/eosdocs/docs
}
