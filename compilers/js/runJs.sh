#!/usr/bin/env bash

# can have both errors and warnings inside err.txt (Both should be in jsApp to be
# shown to the frontend)
# node ./readonly/main.js > jsApp 2>&1 
node ./readonly/main.js # stream FD1 and FD2 to docker cli
