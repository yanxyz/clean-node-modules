#!/usr/bin/env node

const walk = require('./walk')

walk().catch(console.error)
