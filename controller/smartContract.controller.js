const SmartContract = require("../model/smartContract.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const smartContract = new SmartContract({
    id: req.body.id,
    chainId: req.body.chainId,
    address: req.body.address,
    name: req.body.name,
    symbol: req.body.symbol,
    icon: req.body.icon,
    createdAtBlock: req.body.createdAtBlock,
  });

  SmartContract.create(smartContract, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the smartContract.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  SmartContract.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving smartContracts.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  SmartContract.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found smartContract with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving smartContract with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  SmartContract.updateById(
    req.params.id,
    new SmartContract(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found smartContract with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating smartContract with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  SmartContract.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found smartContract with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete smartContract with id " + req.params.id,
        });
      }
    } else res.send({ message: `smartContract was deleted successfully!` });
  });
};
