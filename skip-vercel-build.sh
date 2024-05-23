#!/bin/bash

echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

if echo "$VERCEL_GIT_COMMIT_MESSAGE" | grep -q "\[skip build\]" ; then
    echo "🔺 - Build skipped"
    exit 1

else
    echo "✅ - Build can procceed"
    exit 0
fi