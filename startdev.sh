#!/bin/sh
mkdir -p /tmp/databoxpids

echo "starting dev server..."
#cd server && npm run dev &
echo $! > /tmp/databoxpids/testappserver.pid
cd ~/databox-test-app/client && npm run watch
