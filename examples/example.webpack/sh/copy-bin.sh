#!/bin/bash

# 
# DEBUG: Copy updates to the .bin/uiharness files during development
# 

cp ../../libs/webpack/lib/bin/uiharness.js ./node_modules/.bin/uiharness
chmod 777 ./node_modules/.bin/uiharness
