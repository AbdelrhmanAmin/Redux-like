#!/bin/bash
if [ ! -d "dist" ]; then
  mkdir dist
fi
cd examples
yarn && yarn build
cp -R ./dist/* ../dist
exit 0;
