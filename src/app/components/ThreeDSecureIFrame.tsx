"use client";

import iframe from "../styles/iframe.module.css";
import React, { useEffect, useRef } from "react";

const ThreeDSecureIFrame = (props: any) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      console.log("Sending form...");
      formRef.current.submit();

      const handleMessage = (event) => {
        if (event.origin === "https://centinelapistag.cardinalcommerce.com") {
          console.log("Received message from Cardinal...");
          console.log("Centinel Origin is correct");
          console.log(event.data);
          console.log("Received message from Cardinal...");
        }
      };

      // Add listener for message event
      window.addEventListener("message", handleMessage);

      // Clean up by removing the event listener when the component unmounts
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, []); // Empty dependency array means this effect will only run once, when the component mounts

  return (
    <div>
      <form
        action={props.action}
        ref={formRef}
        method="POST"
        target="collectionIframe"
      >
        <input type="hidden" value={props.jwt} name="JWT" />
      </form>
      <iframe
        id="cardinal_collection_iframe"
        name="collectionIframe"
        height="10"
        width="10"
        className={iframe.cardinalCollectionIframe}
      ></iframe>
    </div>
  );
};

export default ThreeDSecureIFrame;
