#!/bin/bash

set -e

SRC="server/middleware/protectedAuth.ts"
DST="server/middleware/admin--protectedAuth.ts"

if [ ! -f "$SRC" ]; then
  echo "File $SRC does not exist. Are you in the /frontend directory?"
  exit 1
fi

if [ -f "$DST" ]; then
  echo "Target $DST already exists. Not overwriting. Please check manually."
  exit 1
fi

mv "$SRC" "$DST"
echo "Moved $SRC to $DST"
echo "Now protectedAuth middleware only applies to /admin/** routes!"
