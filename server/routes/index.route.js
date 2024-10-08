const paymentRoute = require("./payment.route.js");
const feeRoute = require("./fee.route.js");
module.exports = (app) => {
  app.use("/payments", paymentRoute);
  app.use("/fees",feeRoute);
}