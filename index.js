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
commander.command('init').action(async ()=>{
    try{
        const action = [];
        //模块名
        action.push({
            type:'input',
            name:'moduleName',
            message: "请输入模块名称",
            validate: function(input){
                if(!input){
                    return '输入不能为空';
                }
                return true;
            },
        });
        const answer = await inquirer.prompt(action);//收集用户的回答
        await mkModule(answer.moduleName)

    } catch (e){
        console.log(e);
    }
});

async function mkModule(moduleName){
    try{
        const modulePath = shell.pwd() + '/' + moduleName;
        const exit = fs.existsSync(modulePath); //判断是否已经存在
        if(!exit){
            shell.mkdir(moduleName);

        }else {
            const ret = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'isDelete',
                    message: `是否覆盖${moduleName}文件？ Y/N`,
                    validate:function(input){
                        if(!~['Y','y','N','n'].indexOf(input)){
                            return '请输入：Y/N';
                        }
                        return true;

                    }
                }
            ]);
            if(['N', 'n'].indexOf(ret.moduleName) > -1){
                shell.exit();
            }
            shell.rm('-rf', modulePath);
            shell.mkdir(moduleName);
        }

        //初始化项目
        shell.cd(modulePath);
        shell.exec(`git clone https://github.com/hevine/react-express.git ${modulePath}`);
        shell.rm('-rf', './.git');
        //下载后
        shell.exec('cd www && npm i');
    }catch(e){
        console.log(e);
    }
}
commander.parse(process.argv);