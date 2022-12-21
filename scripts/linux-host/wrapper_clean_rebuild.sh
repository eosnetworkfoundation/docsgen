#!/usr/bin/env bash

LOC="$1"
NOW=$(date +%y-%m-%d)

pushd /home/fedevops/"$LOC"/docsgen || exit
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>>/dev/null)
git pull origin "$BRANCH"
popd || exit
/home/fedevops/"$LOC"/docsgen/scripts/clean_rebuild.sh -d /home/fedevops/ENF/build_dir/ -y -s 2>>/home/fedevops/"$LOC"/logs/error_"$NOW".log >>/home/fedevops/"$LOC"/logs/nightly_staging_build_"$NOW".log
