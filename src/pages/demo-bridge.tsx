"use client";

import "../app/globals.css";
import Card from "@/app/components/Card";
import React, { useState } from "react";
import ThreeDSecureIFrame from "@/app/components/ThreeDSecureIFrame";
import TransactionForm from "@/app/components/TransactionForm";
import BridgeConfiguration from "@/app/components/BridgeConfiguration";
import TransactionInformation from "@/app/components/TransactionInformation";
import SetupIframe from "@/app/components/SetupIframe";
import Header from "@/app/components/Header";
import Cart from "@/app/components/Cart";
import { TransactionDetail } from "@/app/interfaces/TransactionInterfaces";
import Checkout from "@/app/components/Checkout";
import BridgeForm from "@/app/components/BridgeForm";
import Loading from "@/app/components/Loading";
import axios from "axios";

const endpoints = require("@/app/data/endpoints-bridge.json");

export default function Home() {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cvn: "",
    expirationDate: "",
    name: "",
  });

  const [isProfilerCompleted, setIsProfilerCompleted] = useState(false);
  const [tokenPG = "", setTokenPG] = useState("");
  const [tokenAuth = "", setTokenAuth] = useState("");

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
    clientId: "",
    clientSecret: "",
    url: "",
    env: "",
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
    console.log(data);
    setConfigurationParams(data);
  };

  const handleRequiredStepUpForm = (data: any) => {
    setStepUpRequired(true);
    setStepUpData(data);
  };

  const handleTokenPG = (data: any) => {
    setTokenPG(data);
  };

  const handleTokenAuth = (data: any) => {
    setTokenAuth(data);
  };

  const handleProfilerCompleted = () => {
    setIsProfilerCompleted(true);

    axios
      .post("/api/bridge-customer", {
        configuration: configurationParams,
        token: tokenPG,
        tokenAuth: tokenAuth,
      })
      .then((response: any) => {
        console.log(response.data.data);
        console.log("Repuesta de Customer");
        console.log(response);
        const data = response.data.data;

        switch (data.response_code) {
          case "PG200-00":
            handlePagaditoSuccess(data.customer_reply);
            break;
          case "PG402-05":
            handleRequiredStepUpForm({
              action: data.customer_reply.stepUpUrl,
              jwt: data.customer_reply.accessToken,
              md: JSON.stringify({
                tokenPG: tokenPG,
                token: tokenAuth,
                configuration: configurationParams,
                transactionId: data.customer_reply.id_transaction,
              }),
              enabled: true,
            });
            break;
          default:
            alert("Transaction failed - Reload Demo");
            break;
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header title="Demo 3DSecure" />
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
          <BridgeConfiguration
            endpoints={endpoints}
            onConfigurationParams={handleConfigurationParams}
          ></BridgeConfiguration>
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
            <BridgeForm
              transactionData={transactionDetails}
              configurationParams={configurationParams}
              onPagaditoTransactionSuccess={handlePagaditoSuccess}
              onStepUpFormRequired={handleRequiredStepUpForm}
              onCardData={handleCardData}
              onRetrieveThreeDSecureParams={handleThreeDSecureParams}
              onRetrieveSetupInformation={handleSetupInformation}
              onRetrieveTokenPG={handleTokenPG}
              onRetrieveTokenAuth={handleTokenAuth}
            ></BridgeForm>
          )}

          {threeDSecureParams.enabled && (
            <div>
              <ThreeDSecureIFrame
                url={threeDSecureParams.url}
                action={threeDSecureParams.action}
                jwt={threeDSecureParams.jwt}
                env={configurationParams.env}
                onProfilerCompleted={handleProfilerCompleted}
              ></ThreeDSecureIFrame>
            </div>
          )}

          {isProfilerCompleted &&
            infoPagadito == null &&
            !stepUpData.enabled && (
              <div className="mb-4">
                Profiler Ejecutado, esperando respuesta de Pagadito...
                <Loading />
              </div>
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
              type="tokenization"
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
