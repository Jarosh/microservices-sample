#!/bin/bash

cd /app
#npm install
#npm run build

sleep 10

printf "\n\n\n\n\n\n\n\n"
echo "============================== UP AND RUNNING =============================="
printf "\n\n\n\n\n\n\n\n"

nginx -g 'daemon off;'
