#!/bin/bash
# try-it-on-heroku.sh
# Temporarily test our current edits on Heroku
# https://rhodesmill.org/brandon/2012/quietly-pushing-to-heroku/

set -e

git add .
git commit -m 'Heroku temporary commit'
git push heroku main --force

echo
echo "Press Enter once you have tested the app on Heroku"
read

git reset --soft HEAD~1
git push heroku main --force

echo
echo "Okay, the app is restored to where it was before"
echo