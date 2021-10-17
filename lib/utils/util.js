const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const compile = async (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  console.log(templatePath);
  return new Promise((resolve) => {
    ejs.renderFile(templatePath, { data }, {}, (err, str) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("解析完成~");
      resolve(str);
    });
  });
};
const wirteFileAction = (data, dest) => {
  fs.writeFile(dest, data, () => {
    console.log(dest, data);
    console.log("创建cpn成功~");
  });
};
//递归创建文件夹
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else if (createDirSync(path.dirname(pathName))) {
    fs.mkdirSync(pathName);
    return true;
  }
};

module.exports = {
  compile,
  wirteFileAction,
  createDirSync,
};
