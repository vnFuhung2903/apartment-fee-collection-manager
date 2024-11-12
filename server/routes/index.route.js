const paymentRoute = require("./payment.route.js");
const feeRoute = require("./fee.route.js");
const authenRoute = require("./authen.route.js");
module.exports = (app) => {
  app.use("/auth", authenRoute);
  app.use("/payments", paymentRoute);
  app.use("/fees",feeRoute);
}