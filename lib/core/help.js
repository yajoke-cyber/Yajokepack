const program = require("commander");
const helpOptions = () => {
  program.option("-w", "a command to check nmd");
  program.option("-d --dest <dest>", "a command to check nmd");
  program.on("-d", function () {
    console.log("w");
  });
  //on只适用于--help和--version，用来添加注释说明
};
module.exports = helpOptions;
