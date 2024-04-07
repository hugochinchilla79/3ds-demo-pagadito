"use client";

import React, { useEffect, useRef } from "react";

const ThreeDSecureIFrame = (props: any) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      if(props.action != "") {
        console.log("Sending form...");
        formRef.current.submit();
      }
    }
  }, []);

  return (
    <div className="container mx-auto flex justify-center">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow w-1/2 text-center">
      <form
        action={props.action}
        ref={formRef}
        method="POST"
        target="stepUpIframe"
      >
        <input type="hidden" value={props.jwt} name="JWT" />
        <input type="hidden" value={props.md} name="MD" />
      </form>
      <iframe
        name="stepUpIframe"
        height="800"
        width="400"
      ></iframe>
    </div>
    </div>
  );
};

export default ThreeDSecureIFrame;
