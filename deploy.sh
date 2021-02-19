#!/usr/bin/env bash
yarn build &&
cd build &&
git init &&
git add . &&
git commit -m "deploy" &&
git remote add origin git@github.com:lichen404/react-epic.git &&
git push origin master:gh-pages -f
cd -
