const Task = require("../model/task-model");
const User = require("../model/user-model");
const sendEmail = require("../../config/sendEmail");

const { validationResult } = require("express-validator");
const taskController = {};

taskController.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const body = req.body;
    body.userId = req.user.id;
    const task = await Task.create(req.body);
    if (task) {
      const userIds = task.assignedTo.map((ele) => {
        return ele.value;
      });

      sendEmail(userIds);
    }
    return res.status(201).json({ task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: "something went wrong" });
  }
};

taskController.show = async (req, res) => {
  try {
    const tasklist = await Task.find();
    return res.json(tasklist);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};

taskController.taskDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const taskDetails = await Task.findById(id);
    return res.json(taskDetails);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};
taskController.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.json(updatedTask);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};
taskController.statusUpdate = async (req, res) => {
  const newStatus = req.body.status

  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status: newStatus }, { new: true });
    return res.json(updatedTask);
  } catch (err) {
    return res.status(500).json({ errors: "Something went wrong" });
  }
  
};


module.exports = taskController;
