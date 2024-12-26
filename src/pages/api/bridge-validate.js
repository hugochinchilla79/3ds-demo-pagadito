import axios from "axios";
import https from "https";
import { useRouter } from "next/router";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.NEXT_PUBLIC_API_DEMO_BASE_URL
  );
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
    let { transactionId, tokenPG, token, configuration } = jsonBody;
    const endpoint = `${configuration.url}/api/v1/3ds/payment-validation`;

    console.log(jsonBody);

    axios
      .post(
        endpoint,
        { token: tokenPG, transactionId: transactionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials (cookies) in the request
          rejectUnauthorized: false, // Ignore SSL certificate errors
        }
      )
      .then((response) => {
        console.log("Response from payment validation");
        console.log(response);
        console.log(response.data);
        

        // Assuming successful processing, redirect to a success page with query parameters

        let customer_reply = response.data.customer_reply;

        const queryParams = new URLSearchParams({
          authorization: customer_reply.authorization,
          amount: customer_reply.totalAmount,
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
