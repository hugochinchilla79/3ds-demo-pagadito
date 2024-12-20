"use client";

import Header from "@/app/components/Header";
import Configuration from "@/app/components/Configuration";
import endpointsConnect from "../app/data/endpoints-connect.json";
import Cart from "@/app/components/Cart";
import { TransactionDetail } from "@/app/interfaces/TransactionInterfaces";
import Checkout from "@/app/components/Checkout";
import React, { useState } from "react";
import "../app/globals.css";
const Pagadito = require("pagadito-sdk");

export default function ConnectDemo() {
  const [configurationParams, setConfigurationParams] = useState({
    uid: "",
    wsk: "",
    url: "",
    env: "",
  });

  const [transactionDetails, setTransactionDetails] = useState<
    TransactionDetail[]
  >([]);

  const handleUpdateTransactionDetails = (
    transactionDetails: TransactionDetail[]
  ) => {
    setTransactionDetails(transactionDetails);
  };

  const handleConfigurationParams = (params: any) => {
    setConfigurationParams(params);
  };

  const handleSubmit = () => {
    //You must create an instance of the Pagadito class to use the SDK
    let pagadito = new Pagadito(
      configurationParams.uid,
      configurationParams.wsk
    );

    //pagadito.setErn("TRS-" + Math.floor(Math.random() * 1000000));
    pagadito.setErn("200002858720");

    transactionDetails.map((product, index) => {
      pagadito.addDetail(
        product.quantity,
        product.description,
        product.amount,
        "https://product-url.com/product" + index + 1
      );
    });

    pagadito
      .execTrans()
      .then((response: any) => {
        if(response.code == "PG1002"){
          location.href = response.data.url;
        }
      })
      .catch((error: any) => {
        alert("Transaction Failed");
      });
  };

  return (
    <div>
      <Header title="Connect Demo" />

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
            endpoints={endpointsConnect}
            onConfigurationParams={handleConfigurationParams}
          ></Configuration>
        </div>

        <div className="col-span-2 m-4">
          <Cart onUpdateTransactionDetails={handleUpdateTransactionDetails} />
        </div>

        <div className="col-span-2 m-4">
          <Checkout
            type="redirect"
            onSubmit={handleSubmit}
            transactionDetails={transactionDetails}
          />
        </div>
      </div>
    </div>
  );
}
