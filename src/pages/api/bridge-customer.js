// pages/api/setup-3ds.js

import axios from "axios";
import https from "https"; // Import the 'https' module

export default async function handler(req, res) {
  console.log(req.body);
  const { configuration, tokenAuth, token } = req.body;
  const endpoint = `${configuration.url}/api/v1/3ds/customer`;

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
      const response = await axiosInstance.post(
        endpoint,
        { token: token },
        {
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials (cookies) in the request
          rejectUnauthorized: false, // Ignore SSL certificate errors
        }
      );

      // Return the response data
      //append the token to the response
      response.data.token_auth = token;
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        res.status(200).json(error.response.data);
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
