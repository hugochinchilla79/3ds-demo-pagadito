// pages/api/setup-3ds.js

import axios from "axios";
import https from "https"; // Import the 'https' module

export default async function handler(req, res) {
  console.log(req.body);
  const { card, configuration } = req.body;
  const endpoint = `${configuration.url}/setup-payer`;
  const username = configuration.uid;
  const password = configuration.wsk;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_API_DEMO_BASE_URL);
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
      // Make a POST request using Axios instance
      const response = await axiosInstance.post(endpoint, {card: card}, {
        auth: {
          username: username,
          password: password,
        },
        withCredentials: true, // Include credentials (cookies) in the request
      });

      // Return the response data
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
