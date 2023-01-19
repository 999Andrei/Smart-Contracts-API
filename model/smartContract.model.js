const sql = require("./db.model.js");

const SmartContract = function (smartContract) {
  this.id = smartContract.id;
  this.chainId = smartContract.chainId;
  this.address = smartContract.address;
  this.name = smartContract.name;
  this.symbol = smartContract.symbol;
  this.icon = smartContract.icon;
  this.createdAtBlock = smartContract.createdAtBlock;
};

SmartContract.create = (newSmartContract, result) => {
  sql.query(
    "INSERT INTO smartContracts SET ?",
    newSmartContract,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created smartContract: ", {
        id: res.insertId,
        ...newSmartContract,
      });
      result(null, { id: res.insertId, ...newSmartContract });
    }
  );
};

SmartContract.findById = (smartContractId, result) => {
  sql.query(
    `SELECT * FROM smartContracts WHERE id =${smartContractId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found smartContract: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

SmartContract.getAll = (result) => {
  sql.query("SELECT * FROM smartContracts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("smartContracts: ", res);
    result(null, res);
  });
};

SmartContract.updateById = (id, smartContract, result) => {
  sql.query(
    "UPDATE smartContracts SET address = ?, name = ?, symbol = ?, icon = ?, createdAtBlock = ? WHERE id = ?",
    [
      smartContract.address,
      smartContract.name,
      smartContract.symbol,
      smartContract.icon,
      smartContract.createdAtBlock,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated smartContract: ", { id: id, ...smartContract });
      result(null, { id: id, ...smartContract });
    }
  );
};

SmartContract.remove = (id, result) => {
  sql.query("DELETE FROM smartContracts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted smartContract with id: ", id);
    result(null, res);
  });
};

module.exports = SmartContract;
