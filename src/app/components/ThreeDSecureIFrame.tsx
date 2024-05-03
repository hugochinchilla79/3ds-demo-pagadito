"use client";

import iframe from "../styles/iframe.module.css";
import React, { useEffect, useRef } from "react";

const endpointEnvironments = {
  "sandbox": "https://centinelapistag.cardinalcommerce.com",
  "production": "https://centinelapi.cardinalcommerce.com"
}

const ThreeDSecureIFrame = (props: any) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      console.log("Sending form...");
      formRef.current.submit();

      const handleMessage = (event) => {
        console.log(event.origin);
        console.log(endpointEnvironments[props.env]);
        console.log(props.env);
        if (event.origin === endpointEnvironments[props.env]) {

        try {
          let rsp = JSON.parse(event.data);
          if (rsp.MessageType === "profile.completed") {
            console.log("Profile completed");
            props.onProfilerCompleted();
          }
        } catch (error) {
          
        }
         
        }
      };

      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, []);

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
