#!/usr/env bash

# can have both compile errors and warnings inside err.txt
# gcc -o compC ./readonly/main.c 2>err.txt || exit 1
gcc -o compC ./readonly/main.c || exit 1 # stream to docker cli FD1 or FD2

if [ $? -eq 0 ]; then
# can have both errors and warnings inside err.txt
    # ./compC > cApp 2>&1 || exit 2
    ./compC || exit 2
fi

# redundant but being explicit
exit 0
