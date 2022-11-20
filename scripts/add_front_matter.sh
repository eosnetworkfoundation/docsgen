#!/usr/bin/env bash

Calculate_Branch() {
  ARG_BRANCH=$1
  ARG_TAG=$2

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

  echo "${BRANCH}"
}

Add_Front_Matter() {
  ARG_GIT_REPO=$1
  CONTENT_DIR=$2
  ARG_BRANCH=$3
  ARG_TAG=$4

  BRANCH=$(Calculate_Branch "${ARG_BRANCH}" "${ARG_TAG}")

  RAW_PATH="${ARG_GIT_REPO:?}/tree/${BRANCH:-main}/docs/"
  # remove all trailing slashes
  # shellcheck disable=SC2001
  RAW_PATH=$(echo "$RAW_PATH" | sed 's#/*$##')

  find "$CONTENT_DIR" -type f -name "*.md" -print0 | while IFS= read -r -d '' file
  do
    # add raw path
    THIS_FILE_META=""
    # remove working directory, ignore SC2001 because sed replace is complex
    # shellcheck disable=SC2001
    git_file=$(echo "$file" | sed "s#${CONTENT_DIR}##")
    # sed cleans up excess directory slashes
    HAS_FRONT_MATTER=$(head -10 "$file" | grep -Ec '^\---$')
    # enhance existing front matter
    # note ${myvar#/} expansion removes leading slash
    if [ "$HAS_FRONT_MATTER" -eq 2 ]; then
      awk -v RAW_PATH="${RAW_PATH}" \
        -v GIT_FILE="${git_file#/}" \
        -v GIT_REPO="${ARG_GIT_REPO}" \
        -v BRANCH="${BRANCH:-main}" \
        '/^---$/ && !done { gsub(/^---$/, "---\ntags:\n  - "RAW_PATH"/"GIT_FILE"\n  - "GIT_REPO"\n  - "BRANCH); done=1 }; 1;' \
        "$file" > "${file}_tmp"
      mv "${file}_tmp" "$file"
    fi
    # no front matter add it
    if [ "$HAS_FRONT_MATTER" -eq 0 ]; then
      echo "---" > "${file}_tmp"
      # shellcheck disable=SC2129
      printf '%s\n' "${THIS_FILE_META}" >> "${file}_tmp"
      echo "---" >> "${file}_tmp"
      cat "$file" >> "${file}_tmp"
      mv "${file}_tmp" "$file"
    fi
  done

}
