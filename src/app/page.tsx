"use client";

import CardForm from "./components/CardForm";
import Card from "./components/Card";
import React, { useState } from "react";
import ThreeDSecureIFrame from "./components/ThreeDSecureIFrame";
import TransactionForm from "./components/TransactionForm";
import Configuration from "./components/Configuration";
import TransactionInformation from "./components/TransactionInformation";

export default function Home() {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cvn: "",
    expirationDate: "",
    name: "",
  });

  const [step, setStep] = useState(1);

  const [threeDSecureParams, setThreeDSecureParams] = useState({
    action: "",
    jwt: "",
    url: "",
    enabled: false,
  });

  const [transactionData, setTransactionData] = useState({
    amount: "",
    description: "",
  });


  const [configurationParams, setConfigurationParams] = useState({
    uid: "",
    wsk: "",
    url: "",
  });

  const [transactionDataSetted, setTransactionDataSetted] = useState(false);

  const handleTransactionData = (data: any) => {
    if (data.amount === "" || data.description === "") {
      alert("Please fill all the fields");
      return;
    }
    setTransactionDataSetted(true);
    setTransactionData(data);
  };

  const handleCardData = (data: any) => {
    setCardData(data);
  };

  const handleThreeDSecureParams = (data: any) => {
    setThreeDSecureParams(data);
  };

  const handleConfigurationParams = (data: any) => {
    setConfigurationParams(data);
  }; 
  return (
    <div>
      <h1 className="text-center mt-4 mb-4 font-sans text-2xl"><strong>Demo 3DSecure Pagadito</strong></h1>
      <div className="grid grid-cols-5 p-4 xs:grid-cols-1 xs:grid-cols-1">
        <div className="col-span-1 mb-4">
          <Configuration
            onConfigurationParams={handleConfigurationParams}
          ></Configuration>
          
        </div>
        <div className="col-span-3">
          {!transactionDataSetted && (
          <TransactionForm onSubmit={handleTransactionData} />
          )}

          <div className="mt-4 mb-4">
            {transactionDataSetted && (
              <CardForm
                onCardData={handleCardData}
                onRetrieveThreeDSecureParams={handleThreeDSecureParams}
                configurationParams={configurationParams}
              />
            )}

            {threeDSecureParams.enabled && (
              <div>
                <ThreeDSecureIFrame
                  url={threeDSecureParams.url}
                  action={threeDSecureParams.action}
                  jwt={threeDSecureParams.jwt}
                ></ThreeDSecureIFrame>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1">
          <TransactionInformation transactionData={transactionData}></TransactionInformation>

          <div className="mt-4 mx-auto">
            {transactionDataSetted && <Card cardData={cardData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
