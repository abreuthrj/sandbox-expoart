#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx prettier --write pages/*.{js,jsx,ts,tsx} components/*.{js,jsx,ts,tsx} store/*.{js,jsx,ts,tsx}
yarn tsc
yarn lint