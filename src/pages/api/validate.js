import axios from "axios";
import https from "https";
import { useRouter } from "next/router";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_API_DEMO_BASE_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method != "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  } else {
    console.log(req.body);
    let jsonBodyStringMD = req.body.MD;
    let jsonBody = JSON.parse(jsonBodyStringMD);
    const transactionId = req.body.TransactionId;

    let { customerInformation, configuration } = jsonBody;
    //Append transactionId node to customerInformation.consumerAuthenticationInformation
    customerInformation.consumerAuthenticationInformation.transactionId =
      transactionId;

    const endpoint = `${configuration.url}validate-process-card`;

    axios
      .post(endpoint, customerInformation, {
        auth: {
          username: configuration.uid,
          password: configuration.wsk,
        },
        withCredentials: true,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      })
      .then((response) => {
        console.log(response.data);

        // Assuming successful processing, redirect to a success page with query parameters

        let customer_reply = response.data.customer_reply;

        const queryParams = new URLSearchParams({
            authorization: customer_reply.authorization,
            amount: customer_reply.amount,
            description: "Payment Successful 3DSecure",
            merchantTransactionId: customer_reply.merchantTransactionId,
            totalAmount: customer_reply.totalAmount,
            payment_token: customer_reply.payment_token,
        }).toString();
        console.log(`/success-validation?${queryParams}`);
        res.writeHead(302, { Location: `/success-validation?${queryParams}` }); // Replace '/success' with the path of your success page
        res.end();
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          res.status(200).json(error.response.data);
        } else {
          res.status(500).json({ error: "Internal server error" });
        }
      });
  }
}
