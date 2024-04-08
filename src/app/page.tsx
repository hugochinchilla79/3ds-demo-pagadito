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
import Header from "./components/Header";
import Cart from "./components/Cart";
import { TransactionDetail } from "./interfaces/TransactionInterfaces";
import Checkout from "./components/Checkout";

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
  };

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

  const [transactionDetails, setTransactionDetails] = useState<
    TransactionDetail[]
  >([]);

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

  const handleTransactionData = () => {
    setTransactionDataSetted(true);
  };

  const handleUpdateTransactionDetails = (data: TransactionDetail[]) => {
    setTransactionDetails(data);
  };

  const handlePagaditoSuccess = (data: any) => {
    setTransactionData({
      amount: data.totalAmount,
      description: "Payment for products",
    });
    setInfoPagadito(data);
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

  const handleRequiredStepUpForm = (data: any) => {
    setStepUpRequired(true);
    setStepUpData(data);
  };

  return (
    <div>
      <Header />
      <h1 className="text-center mt-20 mb-4 font-sans text-2xl">
        <br />
        <a
          onClick={() => (location.href = "")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Reset Demo
        </a>
      </h1>
      <div className="grid p-4 grid-cols-1 2xl:grid-cols-5 xl:grid-cols-5 md:grid-cols-5 sm:grid-cols-1 h-screen">
        <div className="col-span-1 m-4">
          <Configuration
            onConfigurationParams={handleConfigurationParams}
          ></Configuration>
        </div>
        <div className="col-span-2 m-4">
          {!transactionDataSetted && (
            <div>
              {/*<TransactionForm onSubmit={handleTransactionData} />*/}
              <Cart
                onUpdateTransactionDetails={handleUpdateTransactionDetails}
              />
            </div>
          )}

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

          {isProfilerCompleted &&
            infoPagadito == null &&
            !stepUpData.enabled && (
              <UserInformationForm
                cardData={cardData}
                transactionData={transactionDetails}
                setupInformation={setupInformation}
                configuration={configurationParams}
                onPagaditoTransactionSuccess={handlePagaditoSuccess}
                onStepUpFormRequired={handleRequiredStepUpForm}
              ></UserInformationForm>
            )}

          {stepUpData.enabled && (
            <SetupIframe
              action={stepUpData.action}
              jwt={stepUpData.jwt}
              md={stepUpData.md}
            />
          )}

          {infoPagadito && (
            <TransactionInformation
              infoPagadito={infoPagadito}
              transactionData={transactionData}
              title="Transaction Information"
            />
          )}
        </div>
        <div className="col-span-2">
          <div className="mt-4 mb-4 mx-auto">
            <Checkout
              onSubmit={handleTransactionData}
              transactionDetails={transactionDetails}
            />
          </div>
          <div className="mt-4 mx-auto">
            {transactionDataSetted && <Card cardData={cardData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
