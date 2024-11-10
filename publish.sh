#!/usr/bin/env bash

set -xeuo pipefail

npm version patch

npm publish

ssh victron "cd /data/home/nodered/.node-red/ && sudo -u nodered -g nodered npm update nodered-utilities"

ssh victron "killall node-red"
