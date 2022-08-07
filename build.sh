#!/bin/bash
if [ ! -d "dist" ]; then
  mkdir dist
fi
cd examples
yarn build
cp -R ./dist/* ../dist
exit 0;
