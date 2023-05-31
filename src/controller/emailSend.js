const nodemailer = require("nodemailer");

const path = require("path");

const otpEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      //   host: "smtp.gmail.com",
      //   port: 465,
      //   secure: true,
      service: "Gmail",
      auth: {
        user: "deepsutariya117@gmail.com",
        pass: "felcgjiuottyhdlf",
      },
    });

    const mailOptions = {
      from: "kenilmangroliya18@gmail.com",
      to: data.email,
      subject: "Welcome!",
      template: "email", // the name of the template file i.e email.handlebars
      //   template: "deepsutariya117@gmail.com",
      html: `<b>${data.otp}</b>`,
    };

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return error.message;
      }
    });
  } catch (error) {
    console.log("🚀 ~ otpEmail ~ error:", error);
  }
};

module.exports = { otpEmail };
