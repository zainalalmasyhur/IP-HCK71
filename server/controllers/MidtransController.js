const axios = require("axios");
const midtransClient = require("midtrans-client");
require("dotenv").config();

class MidtransController {
  static async initiateMidtransTrx(req, res, next) {
    try {
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVER_KEY_MIDTRANS,
      });

      const orderId = Math.random().toString();
      const amount = 100000;

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: req.user.username,
          email: req.user.email,
        },
      };
      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      res
        .status(200)
        .json({ message: "Order created", transactionToken, orderId });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MidtransController;
