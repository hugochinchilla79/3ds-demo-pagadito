"use client";

import CardForm from "./components/CardForm";
import Card from "./components/Card";
import React, { useState } from "react";
import ThreeDSecureIFrame from "./components/ThreeDSecureIFrame";
import TransactionForm from "./components/TransactionForm";
import Configuration from "./components/Configuration";
import TransactionInformation from "./components/TransactionInformation";
import UserInformationForm from "./components/UserInformationForm";
import SetupIframe from "./components/SetupIframe";

export default function Home() {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cvn: "",
    expirationDate: "",
    name: "",
  });

  const [isProfilerCompleted, setIsProfilerCompleted] = useState(false);

  const [setupInformation, setSetupInformation] = useState({
    referenceId: "",
    setup_request_id: "",
  });

  const handleSetupInformation = (data: any) => {
    setSetupInformation(data);
  }

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

  const [infoPagadito, setInfoPagadito] = useState(null);
  const [stepUpRequired, setStepUpRequired] = useState(false);
  const [stepUpData, setStepUpData] = useState({
    action: "",
    jwt: "",
    md: "",
    enabled: false,
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

  const handlePagaditoSuccess = (data: any) => {
    setInfoPagadito(data);
  }

  const handleCardData = (data: any) => {
    setCardData(data);
  };

  const handleThreeDSecureParams = (data: any) => {
    setThreeDSecureParams(data);
  };

  const handleConfigurationParams = (data: any) => {
    setConfigurationParams(data);
  };

  const handleRequiredStepUpForm = (data: any) => {
    setStepUpRequired(true);
    setStepUpData(data);
  }

  return (
    <div>
      <h1 className="text-center mt-4 mb-4 font-sans text-2xl">
        <strong>Demo 3DSecure Pagadito</strong>
      </h1>
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
            {transactionDataSetted && !isProfilerCompleted && (
              <CardForm
                onCardData={handleCardData}
                onRetrieveThreeDSecureParams={handleThreeDSecureParams}
                configurationParams={configurationParams}
                onRetrieveSetupInformation={handleSetupInformation}
              />
            )}

            {threeDSecureParams.enabled && (
              <div>
                <ThreeDSecureIFrame
                  url={threeDSecureParams.url}
                  action={threeDSecureParams.action}
                  jwt={threeDSecureParams.jwt}
                  onProfilerCompleted={() => {
                    setIsProfilerCompleted(true);
                  }}
                ></ThreeDSecureIFrame>
              </div>
            )}
          </div>

          {(isProfilerCompleted && infoPagadito == null) && !stepUpData.enabled && (
            <div className="mt-4 mb-4">
              <UserInformationForm
                cardData={cardData}
                transactionData={transactionData}
                setupInformation={setupInformation}
                configuration={configurationParams}
                onPagaditoTransactionSuccess={handlePagaditoSuccess}
                onStepUpFormRequired={handleRequiredStepUpForm}
              ></UserInformationForm>
            </div>
          )}
          
          {stepUpData.enabled && (
            <SetupIframe action={stepUpData.action} jwt={stepUpData.jwt} md={stepUpData.md} />
          )
}
        </div>
        <div className="col-span-1">
          <TransactionInformation
            title="Transaction Information"
            transactionData={transactionData}
            infoPagadito={infoPagadito}
          ></TransactionInformation>

          <div className="mt-4 mx-auto">
            {transactionDataSetted && <Card cardData={cardData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
