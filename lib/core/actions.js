const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const open = require("open");

const { promisify } = require("util");
const download = promisify(require("download-git-repo"));

const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const { compile, wirteFileAction, createDirSync } = require("../utils/util");
const createProjectAction = async (project) => {
  try {
    console.log("creating~", project);
    await download(vueRepo, project, { clone: true }); //在当前目录创建一个名字为project变量的脚手架
    const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
    console.log("npm install~");
    await commandSpawn(npmCommand, ["install"], { cwd: `./${project}` });
    //开启一个子终端命令
    console.log("npm serving~");
    open("http//localhost:8080/");
    await commandSpawn(npmCommand, ["run", "serve"], { cwd: `./${project}` });
  } catch (err) {
    console.log(err);
  }
};
const addComponentsAction = async (name) => {
  const result = await compile("vue-compoent.ejs", {
    name: name,
    lowername: name.toLowerCase(),
  });
  const dest = program._optionValues.dest || "src/components/";
  if (createDirSync(dest)) {
    wirteFileAction(result, path.resolve(dest, `./${name}.vue`));
  }
};
const addPagesAction = async (page) => {
  const dest = program._optionValues.dest || "src/pages/";
  if (createDirSync(dest)) {
    const cpnResult = await compile("vue-compoent.ejs", {
      name: page,
      lowername: page.toLowerCase(),
    });
    const rounterResult = await compile("vue-router.ejs", {
      name: page,
      lowername: page.toLowerCase(),
    });
    wirteFileAction(cpnResult, path.resolve(dest, `./${page}.vue`));
    wirteFileAction(rounterResult, path.resolve(dest, "./router.js"));
  }
};
const addStoreAction = async (store) => {
  const result = await compile("vue-store.ejs", {});
  const dest = program._optionValues.dest || "src/store/";
  if (createDirSync(dest)) {
    wirteFileAction(result, path.resolve(dest, `./${store}.js`));
  }
};

module.exports = {
  createProjectAction,
  addComponentsAction,
  addPagesAction,
  addStoreAction,
};
