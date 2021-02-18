#!/bin/bash

echo ""
echo "---=== Building APP Image ===--- "
echo ""

VERSION=$(cat package.json | grep -oP '(?<="version": ")[^"]*')

docker build -t terrabrasilisrd/data-hub .
