// pages/api/setup-3ds.js

import axios from "axios";
import https from "https"; // Import the 'https' module

export default async function handler(req, res) {
  const { customerInformation, configuration } = req.body;
  const endpoint = `${configuration.url}customer`;
  const username = configuration.uid;
  const password = configuration.wsk;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
      const response = await axiosInstance.post(endpoint, customerInformation, {
        auth: {
          username: username,
          password: password,
        },
        withCredentials: true, // Include credentials (cookies) in the request
      });
        res.status(response.status).json(response.data);
      // Return the response data
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      if(error.response){
        res.status(200).json(error.response.data);
      }else {
        res.status(500).json({ error: "Internal server error" });
      }
     
      
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
