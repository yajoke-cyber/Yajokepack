const { spawn } = require("child_process");
const commandSpawn = async (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args); //开辟一个子进程
    childProcess.stdout.pipe(process.stdout); //把子进程的输出给父进程看
    childProcess.stdout.pipe(process.stderr); //把子进程的报错给父进程看，不然看不到
    childProcess.on("close", () => {
      resolve();
      //使得后续的await得以执行
    });
  });
};
module.exports = {
  commandSpawn,
};
