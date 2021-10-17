const program = require("commander");
const {
  createProjectAction,
  addComponentsAction,
  addPagesAction,
  addStoreAction,
} = require("./actions");
console.log(createProjectAction);
const createCommands = () => {
  program
    .command("create <project> [others]")
    .description("clone a repository into a folder:")
    .action(createProjectAction);
  program
    .command("addcpn <name> [others]")
    .description(
      "add a component into a position eg:yajoe addcpn name [-d src/path] default: src/components'"
    )
    .action(addComponentsAction);
  program
    .command("addpage <page> [others]")
    .description(
      "add a routerpage into a position eg:yajoe addpage name [-d src/path] default: src/pages'"
    )
    .action(addPagesAction);
  program
    .command("addstore <store> [others]")
    .description(
      "add a store into a position eg:yajoe addstore name [-d src/path] default: src/store'"
    )
    .action(addStoreAction);
};
module.exports = createCommands;
