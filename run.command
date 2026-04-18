#!/bin/zsh

cd "$(dirname "$0")"

if command -v npm >/dev/null 2>&1; then
  if [ ! -d node_modules ]; then
    echo "Installing project dependencies with npm..."
    npm install --legacy-peer-deps || {
      echo
      echo "Dependency install failed."
      read -k 1 "?Press any key to close..."
      exit 1
    }
  fi

  echo "Starting the DECA PMCD Risk Wheel with npm..."
  npm run dev
  exit $?
fi

if command -v bun >/dev/null 2>&1; then
  if [ ! -d node_modules ]; then
    echo "Installing project dependencies with Bun..."
    bun install || {
      echo
      echo "Dependency install failed."
      read -k 1 "?Press any key to close..."
      exit 1
    }
  fi

  echo "Starting the DECA PMCD Risk Wheel with Bun..."
  bun run dev
  exit $?
fi

echo "Node.js is not installed yet."
echo "Install Node.js from https://nodejs.org and then run this file again."
read -k 1 "?Press any key to close..."
exit 1
