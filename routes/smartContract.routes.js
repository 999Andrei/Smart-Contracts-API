module.exports = (app) => {
  const smartContracts = require("../controller/smartContract.controller.js");

  var router = require("express").Router();

  router.post("/", smartContracts.create);

  router.get("/", smartContracts.findAll);

  router.get("/:id", smartContracts.findOne);

  router.put("/:id", smartContracts.update);

  router.delete("/:id", smartContracts.delete);

  app.use("/smartContract", router);
};
