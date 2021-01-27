#!/usr/bin/env bash

##shell script to commit to github with commit message
##upstream must be configured

message=$1
if [ -z "$message" ];
then
    echo "Please give a commit message"
else
    git add .
    git commit -m "$message"
    git push
fi