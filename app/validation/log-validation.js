const logValidation = {
    time: {
      in: ["body"],
      exists: {
        errorMessage: "time is required",
      },
      notEmpty: {
        errorMessage: "time should not be empty",
      },
      trim: true,
    },
    taskId: {
      in: ["body"],
      exists: {
        errorMessage: "taskId is required",
      },
      notEmpty: {
        errorMessage: "taskId should not be empty",
      },
      trim: true,
    }}
  module.exports = logValidation;