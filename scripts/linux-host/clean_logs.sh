#!/usr/bin/env bash
LOC=$1
find /home/fedevops/"$LOC"/logs -mtime +30 -print0 | while IFS= read -r -d '' logfile; do rm "$logfile" ; done 2>/home/fedevops/"$LOC"/logs/error_cron_clean.log
