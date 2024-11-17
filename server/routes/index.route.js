const paymentRoute = require("./payment.route.js");
const feeRoute = require("./fee.route.js");
const authenRoute = require("./authen.route.js");
const apartmentRoute = require("./apartment.route.js");
const householdRoute = require("./househole.route.js");
const overviewRoute = require("./overview.route.js");
module.exports = (app) => {
  app.use("/auth", authenRoute);
  app.use("/payments", paymentRoute);
  app.use("/fees", feeRoute);
  app.use("/apartments", apartmentRoute);
  app.use("/household", householdRoute);
  app.use("/", overviewRoute);
}