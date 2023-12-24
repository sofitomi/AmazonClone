const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OO3k1DisYtKipizYDN18dViPAYBC0ejWAlT04XnAzlSblPXEokcCm6rNrNunpbtgMCzteaR5xN34N4kNotcmmVf00VnObx4q9"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // ok-created
  response.status(201).send({ clientSecret: paymentIntent.client_secret });
});

// losten command
exports.api = functions.https.onRequest(app);
