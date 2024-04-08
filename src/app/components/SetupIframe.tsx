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
    <div className="mx-auto">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow w-full text-center">
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
        className="mx-auto"
      ></iframe>
    </div>
    </div>
  );
};

export default ThreeDSecureIFrame;
