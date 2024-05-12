const nodemailer = require("nodemailer");
const User = require("../app/model/user-model");

const sendEmail = async (userIds) => {
  try {
    const users = await User.find();
    const mail = userIds.map((id) => {
      const user = users.find((user) => user._id.equals(id));
      return user ? user.email : null;
    });
    console.log(mail);

    // Create transporter and mailOptions
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ravi.kumargowda2429@gmail.com",
        pass: "gatp blle kcoc ztnc",
      },
    });
    const mailOptions = {
      from: "ravi.kumargowda2429@gmail.com",
      to: mail.join(","), // Convert the array of email addresses to a comma-separated string
      subject: "New Task",
      text: "there is a new task assigned to you please look into it",
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return mail;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;