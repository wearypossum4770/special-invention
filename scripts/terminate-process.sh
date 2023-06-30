#!/bin/sh
# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex
echo "what process do you want to force terminate?"
read PORT
echo "" && echo "" && echo "" && echo ""
echo "killing the process on port: $PORT"
kill $(lsof -t -i:$PORT)
echo "command complete"
