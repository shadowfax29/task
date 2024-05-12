const log = require("../model/log-model");
const { validationResult } = require("express-validator");
const logController = {};

logController.show = async (req, res) => {
  try {
    console.log(req.params.id)
    const Log = await log.findOne({ taskId: req.params.id });
    return res.json(Log);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ errors: "something went wrong", err });
  }
};

logController.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
   
    const body = req.body;
   console.log(body)
    const newLog = await log.create(body);
    return res.status(201).json(newLog);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};

module.exports = logController;
