#!/bin/bash

echo ""
echo "---=== Building APP Image ===--- "
echo ""

VERSION=$(cat package.json | grep -oP '(?<="version": ")[^"]*')

docker build -t inpe/terrabrasilis-data-hub .
