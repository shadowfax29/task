const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectiondb = require("./config/database");
const { checkSchema } = require("express-validator");

const userController = require("./app/controller/userController");
const assigneeController = require("./app/controller/assigneeController");
const assignerController = require("./app/controller/assignerController");
const taskController = require("./app/controller/taskController");

const userRegisterValidationSchema = require("./app/validation/user-register-validation");
const userLoginValidationSchema = require("./app/validation/user-login-validation");
const {
  assigneeValidation,
  assigneeEditValidation,
} = require("./app/validation/assignee-validation");
const {
  assignerValidation,
  assignerEditValidation,
} = require("./app/validation/assigner-validation");
const {taskValidation,taskUpdateValidation} = require("./app/validation/task-validation");
const authenticateUser = require("./app/middlewares/authenticateUser");
const authorizeUser = require("./app/middlewares/authorizeUser");
const Assignee = require("./app/model/assignee-model");
const logController = require("./app/controller/logcontroller");
const logValidation = require("./app/validation/log-validation");


const port = process.env.PORT;

connectiondb();
app.use(express.json());
app.use(cors());

app.post(
  "/user/register",
  checkSchema(userRegisterValidationSchema),
  userController.register
);

app.post(
  "/user/login",
  checkSchema(userLoginValidationSchema),
  userController.login
);

app.get("/user/account", authenticateUser, userController.account);

// Assignee

app.get(
  "/user/assignee/profile",
  authenticateUser,
  authorizeUser(["Assignee"]),
  assigneeController.show
);
app.get(
  "/user/assignees",
  authenticateUser,
  authorizeUser(["Assigner"]),
  assigneeController.all
);
app.post(
  "/user/assignee/profile",
  authenticateUser,
  authorizeUser(["Assignee"]),
  checkSchema(assigneeValidation),
  assigneeController.create
);
app.put(
  "/user/assignee/profile",
  authenticateUser,
  authorizeUser(["Assignee"]),
  checkSchema(assigneeEditValidation),
  assigneeController.update
);

//Assigner

app.get(
  "/user/assigner/profile",
  authenticateUser,
  authorizeUser(["Assigner"]),
  assignerController.show
);
app.post(
  "/user/assigner/profile",
  authenticateUser,
  authorizeUser(["Assigner"]),
  checkSchema(assignerValidation),
  assignerController.create
);
app.put(
  "/user/assigner/profile",
  authenticateUser,
  authorizeUser(["Assigner"]),
  checkSchema(assignerEditValidation),
  assignerController.update
);

// task

app.post(
  "/assigner/task",
  authenticateUser,
  authorizeUser(["Assigner"]),
  checkSchema(taskValidation),
  taskController.create
);
app.get(
  "/assigner/task",
  authenticateUser,
  authorizeUser(["Assigner"]),
  taskController.show
);
app.get(
  "/assignee/task",
  authenticateUser,
  authorizeUser(["Assignee"]),
  taskController.show
);
app.put(
  "/assigner/task/:id",
  authenticateUser,
  authorizeUser(["Assigner"]),checkSchema(taskUpdateValidation),
  taskController.update
);
app.put(
  "/status/:id",
  authenticateUser,
  authorizeUser(["Assignee"]),
  taskController.statusUpdate
);
app.get(
  "/task-details/:id",
  authenticateUser,
  authorizeUser(["Assignee", "Assigner"]),
  taskController.taskDetails
);
app.delete(
  "/assigner/task/:id",
  authenticateUser,
  authorizeUser(["Assigner"]),
  assignerController.delete
);
//log
app.post("/log",authenticateUser,
authorizeUser(["Assignee"]),checkSchema(logValidation) ,
logController.create)

app.get("/log/:id",authenticateUser,
authorizeUser([ "Assigner","Assignee"]),
logController.show)

//fileupload



app.listen(port, () => {
  console.log("server running on port", port);
});
