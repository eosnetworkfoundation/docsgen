#!/usr/bin/env bash

Help() {
  echo "builds an index.md for a directory results to stdout "
  echo "required arguments"
  echo " -d directory to index"
  echo " -n name of index"
  echo "optional args"
  echo " [-f include files]"
  echo " [-x include directories]"
  echo "example: build_index_md.sh -d classes -n 'API Class List' -f -x > classes/index.md"
  exit 1
}

# Get the options
while getopts "d:n:fx" option; do
   case $option in
      d) # set build dir
        ARG_DIR=${OPTARG}
        ;;
      n) # set branch
        ARG_NAME=${OPTARG}
        ;;
      f) # set tag
        ARG_FILE_TYPE=1
        ;;
      x) # set identity
        ARG_DIR_TYPE=1
        ;;
      :) # no args
        Help;
        ;;
      *) # abnormal args
        Help;
        ;;
   esac
done
# check for required args
if [ -z "${ARG_DIR}" ] || [ -z "${ARG_NAME}" ]; then
  echo "Missing required arguments -d directory -n name"
  Help;
fi

# default both files and directories
# default handles case of both and neither
type_arg=(\( -type f -o -type d \))
# just dirs
if [ -z "${ARG_FILE_TYPE}" ] && [ -n "$ARG_DIR_TYPE" ]; then
  type_arg=(-type d)
fi
# just files
if [ -n "${ARG_FILE_TYPE}" ] && [ -z "$ARG_DIR_TYPE" ]; then
  type_arg=(-type f)
fi


# max depth just 1 level, min depth skip directory name
#CMD="find \"${ARG_DIR}\" ${type_arg} -maxdepth 1 -mindepth 1 -print0 "
find_args=("${ARG_DIR}" "${type_arg[@]}" -maxdepth 1 -mindepth 1 -print0)

echo "---"
echo "title: ${ARG_NAME}"
echo "sidebar_position: 1"
echo "---"
echo ""
echo "# ${ARG_NAME}"
echo ""

find "${find_args[@]}" | while IFS= read -r -d '' file
do
  base_name=$(basename "$file")
  # skip . files and main dir
  if [ -d "$file" ]; then
    display_name=$base_name
    base_name="${base_name}/"
  else
    display_name=$(echo "$base_name" | cut -d. -f1)
    # base_name unchanged
  fi
  [ ! "${base_name:0:1}" = '.' ] && echo "- [${display_name}](${base_name})"
done
