#!/usr/bin/env bash

sudo adduser fedevops --disabled-password
sudo su - fedevops
mkdir .ssh
chmod 700 .ssh
touch .ssh/authorized_keys
chmod 600 .ssh/authorized_keys
cat public.key >> .ssh/authorized_keys
