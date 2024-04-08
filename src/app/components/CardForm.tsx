"use client";
import React, { useState } from "react";
import ExpirationDate from "./ExpirationDate";
import CardSelector from "./CardSelector";
import Loading from "./Loading";
import { ConfigurationParams } from "../interfaces/TransactionInterfaces";

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

interface CardData {
  onCardData: (data: any) => void;
  onRetrieveThreeDSecureParams: (data: any) => void,
  onRetrieveSetupInformation: (data: any) => void,
  configurationParams: ConfigurationParams;
}

//fetch cards.json from local file located in ./data/cards.json

const cards = require("../data/cards.json");

const CardForm: React.FC<CardData> = ({
  onCardData,
  onRetrieveThreeDSecureParams,
  onRetrieveSetupInformation,
  configurationParams
}) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvn, setCvn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectorEnabled, setSelectorEnabled] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    setIsSubmitting(true);

    const card = {
      number: cardNumber,
      expirationDate: expirationDate,
      cvv: cvn,
      cardHolderName: name,
    }


    axios
      .post("/api/setup-payer", {
        card: card,
        configuration: configurationParams,
      })
      .then((response: any) => {
        console.log(response);
        let data = {
          action: response.data.deviceDataCollectionUrl,
          jwt: response.data.accessToken,
          url: response.data.deviceDataCollectionUrl,
          enabled: true,
        };

        let setupInformation = {
          referenceId: response.data.referenceId,
          setup_request_id: response.data.request_id,
        };

        console.log(data);
        onRetrieveThreeDSecureParams(data);
        onRetrieveSetupInformation(setupInformation);

        setIsSubmitting(false);
      })
      .catch((error: any) => {
        setIsSubmitting(false);
        console.error(error);
      });

    event.preventDefault();
  };

  const handleExpirationDate = (data: string) => {
    setExpirationDate(data);
    onCardData({
      name,
      cardNumber,
      expirationDate: data,
      cvn,
    });
  };

  const handleCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
    onCardData({
      name,
      cardNumber: event.target.value,
      expirationDate,
      cvn,
    });
  };

  const handleCardChange = (cardNumber: string) => {
    setCardNumber(cardNumber);
    onCardData({
      name,
      cardNumber,
      expirationDate,
      cvn,
    });
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    onCardData({
      name: event.target.value,
      cardNumber,
      expirationDate,
      cvn,
    });
  };

  const handleCvn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCvn(event.target.value);
    onCardData({
      name,
      cardNumber,
      expirationDate,
      cvn: event.target.value,
    });
  };

  return (
    <div className="mx-auto">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
        <h2 className="text-xl font-bold mt-4 mb-4 rounded-lg dark:text-white">
          Card Details
        </h2>

        <hr className="mb-4" />
        <form onSubmit={handleSubmit} className="rounded-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 dark:text-white">
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleName}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-2 dark:text-white">
              Card Number (
              <a
                onClick={() => setSelectorEnabled(!selectorEnabled)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Use Card {selectorEnabled ? "Number" : "Selector"}
              </a>
              ):
            </label>
            {selectorEnabled ? (
              <CardSelector cards={cards} onCardChange={handleCardChange} />
            ) : (
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumber}
                maxLength={19} // Update the maxLength to 4
                pattern="^\d{16,19}$" // Add a pattern to enforce the digit limit
                required
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            )}
          </div>

          <ExpirationDate onExpirationDateString={handleExpirationDate} />

          <div className="mb-4">
            <label htmlFor="cvn" className="block mb-2 dark:text-white">
              CVV:
            </label>
            <input
              type="text"
              id="cvn"
              value={cvn}
              onChange={handleCvn}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          {!isSubmitting && (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting..." : "Submit"}
          >
            Submit
          </button>
          )}

          {isSubmitting && (
            <Loading></Loading>
          )}
        </form>
      </div>
    </div>
  );
};

export default CardForm;
