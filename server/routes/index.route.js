const paymentRoute = require("./payment.route.js");
module.exports = (app) => {
  app.use("/payment", paymentRoute);
}