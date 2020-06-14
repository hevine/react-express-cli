#!/usr/bin/env node
const shell = require('shelljs');
const commander = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

//version
commander.option('-v --version', 'print nodecli version', ()=>{
    console.log(require('./package.json').version);
});

commander.parse(process.argv);