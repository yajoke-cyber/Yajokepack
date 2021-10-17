#!/usr/bin/env node
//使用这个自定义node指令
const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/createCommands");
const program = require("commander");
program.version(require("./package.json").version);
helpOptions();
createCommands();
program.parse(process.argv);
