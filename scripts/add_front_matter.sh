#!/usr/bin/env bash

Add_Front_Matter() {
  ARG_GIT_REPO=$1
  ARG_BRANCH=$2
  ARG_TAG=$3

  BRANCH="main"
  if [ -z "$ARG_BRANCH" ] && [ -n "$ARG_TAG" ]; then
    # hard tag
    BRANCH="$ARG_TAG"
  fi
  # ONLY BRANCH
  if [ -n "$ARG_BRANCH" ] && [ -z "$ARG_TAG" ]; then
    # single branch
    BRANCH="$ARG_BRANCH"
  fi
  # BOTH BRANCH AND TAG
  if [ -n "$ARG_BRANCH" ] && [ -n "$ARG_TAG" ]; then
    BRANCH="${ARG_BRANCH}"
  fi

  RAW_PATH="${ARG_GIT_REPO:?}/tree/${BRANCH:-main}/docs/"
  META="  - ${ARG_GIT_REPO}\n  - ${BRANCH}"

  set -x

  find markdown_out -type f -name "*.md" -print0 | while IFS= read -r -d '' file
  do
    # add raw path
    THIS_FILE_META=""
    git_file=$(echo "$file" | sed 's#/markdown_out/##')
    THIS_FILE_META="tags:\n  - ${RAW_PATH}/${git_file}\n${META}"
    HAS_FRONT_MATTER=$(head -10 $file | egrep '^\---$' | wc -l)
    # Replace
    if [ "$HAS_FRONT_MATTER" -eq 2 ]; then
      awk -v THIS_META="$THIS_FILE_META" '/^---$/ && !done { gsub(/^---$/, "---\n"THIS_META); done=1 }; 1;' "$file" > "${file}_tmp"
      mv "${file}_tmp" "$file"
    fi
    # no front matter add it
    if [ "$HAS_FRONT_MATTER" -eq 0 ]; then
      echo "---" > "tmp_${file}"
      echo "$THIS_FILE_META" >> "tmp_${file}"
      echo "---" >> "tmp_${file}"
      cat "$file" >> "tmp_${file}"
      mv "tmp_${file}" "$file"
    fi
  done

  set +x

}
