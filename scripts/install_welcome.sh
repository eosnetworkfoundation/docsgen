#!/usr/bin/env bash

# Populates the following directories
# images go into static/welcome
#
#  welcome
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
#     welcome
Install_Welcome() {
  SCRIPT_DIR=$1
  ARG_GIT_REPO=$2
  ARG_BUILD_DIR=$3
  ARG_BRANCH=$4
  ARG_TAG=$5

  IMG_DIR=${ARG_BUILD_DIR}/devdocs/static/welcome
  # place for welcome static image files
  [ ! -d $IMG_DIR ] && mkdir $IMG_DIR

  # copy out to keep docs clean and process idempotent
  [ ! -d markdown_out ] && mkdir markdown_out
  cp -R docs/* markdown_out

  # setup images
  if [ -d markdown_out/01_overview/images ]; then
     cp -r markdown_out/01_overview/images/* $IMG_DIR
     # move it out of the way so it doens't get copied as doc
     mv markdown_out/01_overview/images ./overview-images
  fi
  # update image paths
  for i in $(find markdown_out/01_overview -type f -name "*.md"); do
    sed 's/(\.\/images\//(\/welcome\//g' $i > tmpP.md
    mv tmpP.md $i
  done

  # setup images
  if [ -d markdown_out/02_getting-started/images ]; then
     cp -r markdown_out/02_getting-started/images/* $IMG_DIR
     # move it out of the way so it doens't get copied as doc
     mv markdown_out/02_getting-started/images ./getting-started-images
  fi
  # update image paths
  for i in $(find markdown_out/02_getting-started -type f -name "*.md"); do
    sed 's/(\.\.\/images\//(\/welcome\//g' $i > tmpP.md
    mv tmpP.md $i
  done

  # setup images
  if [ -d markdown_out/04_protocol/images ]; then
      cp -r markdown_out/04_protocol/images/* $IMG_DIR
      # move it out of the way so it doens't get copied as doc
      mv domarkdown_outcs/04_protocol/images ./protocol-images
  fi
  # update image paths
  for i in $(find markdown_out/04_protocol -type f -name "*.md"); do
    sed 's/(images\//(\/welcome\//g' $i > tmpP.md
    mv tmpP.md $i
  done

  # patch up files titles
  ${SCRIPT_DIR}/add_title.py markdown_out/index.md
  find markdown_out -type f | xargs -I{} ${SCRIPT_DIR}/add_title.py {}
  find markdown_out -type f | xargs -I{} ${SCRIPT_DIR}/process_admonitions.py {}

  # fix paths for dev tools
  for file in $(find markdown_out -type f -name "*.md")
  do
    FIND="\/eosdocs\/developer-tools\/cleos\/how-to-guides\/how-to-create-a-wallet.md"
    REPLACE="\/leap\/latest\/cleos\/how-to-guides\/how-to-create-a-wallet"
    sed "s/${FIND}/${REPLACE}/g" $file > tempCW.md

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

    mv tempG.md $file
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
  sed "s/${FIND}/${REPLACE}/" markdown_out/index.md > tmp_index.md
  mv tmp_index.md markdown_out/04_protocol/index.md

  # copy in the files to build root
  cp glossary.md $ARG_BUILD_DIR/devdocs/eosdocs/welcome
  cp markdown_out/index.md $ARG_BUILD_DIR/devdocs/eosdocs/welcome
  for d in 01_overview 02_getting-started 03_tutorials 04_protocol \
      05_community-developer-tools 06_eosio-blockchain-networks \
      07_migration-guides
  do
    cp -r markdown_out/${d} $ARG_BUILD_DIR/devdocs/eosdocs/welcome
  done

}
