const Migrations = artifacts.require("Migrations");
const Registry = artifacts.require("registry")
module.exports = async function (deployer) {
await deployer.deploy(Migrations);
await deployer.deploy(Registry);
};