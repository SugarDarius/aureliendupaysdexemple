#!/bin/bash

echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

if echo "$VERCEL_GIT_COMMIT_MESSAGE" | grep -q "\[skip build\]" ; then
    echo "🔺 - Build skipped"
    exit 0

else
    echo "✅ - Build can procceed"
    exit 1
fi