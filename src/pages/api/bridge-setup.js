// pages/api/setup-3ds.js

import axios from "axios";
import https from "https"; // Import the 'https' module

export default async function handler(req, res) {
  console.log(req.body);
  const { userInformationData, configuration } = req.body;
  const authEndpoint = `${configuration.url}/api/token`;
  const endpoint = `${configuration.url}/api/v1/3ds/setup-payer`;
  const clientId = configuration.clientId;
  const clientSecret = configuration.clientSecret;

  console.log(userInformationData);
  console.log(JSON.stringify(userInformationData));

  console.log(configuration);

  // Set CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.NEXT_PUBLIC_API_DEMO_BASE_URL
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Create an instance of Axios with custom HTTPS agent configuration
  const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // Ignore SSL certificate errors
    }),
  });

  // Handle POST requests
  if (req.method === "POST") {
    try {
      // Handle authentication with secret and client id
      const authResponse = await axios.post(
        authEndpoint,
        {
          client_id: clientId,
          client_secret: clientSecret,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = authResponse.data.token;
      userInformationData.returnUrl = "http://localhost:3000/api/bridge-validate";

      const response = await axiosInstance.post(endpoint, userInformationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials (cookies) in the request
        rejectUnauthorized: false, // Ignore SSL certificate errors
      });

      // Return the response data
      //append the token to the response
      response.data.token_auth = token;
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
