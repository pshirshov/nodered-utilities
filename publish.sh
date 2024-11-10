#!/usr/bin/env bash

set -xeuo pipefail

npm version patch

npm publish
