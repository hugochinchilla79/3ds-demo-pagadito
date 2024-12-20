import React, { useState } from "react";
import axios from "axios";
import ExpirationDate from "./ExpirationDate";
import CardSelector from "./CardSelector";
import BillingAddressForm from "./BillingAddressForm";
import Loading from "./Loading";
import {
  BridgeConfigurationParams,
  TransactionDetail,
} from "../interfaces/TransactionInterfaces";

import dotenv from "dotenv";
dotenv.config();

interface BridgeFormProps {
  transactionData: TransactionDetail[];
  configurationParams: BridgeConfigurationParams;
  onRetrieveThreeDSecureParams: (data: any) => void;
  onRetrieveSetupInformation: (data: any) => void;
  onPagaditoTransactionSuccess: (data: any) => void;
  onStepUpFormRequired: (data: any) => void;
  onCardData: (data: any) => void;
  onRetrieveTokenPG: (data: any) => void;
  onRetrieveTokenAuth: (data: any) => void;
}

const cards = require("../data/cards.json");

const BridgeForm: React.FC<BridgeFormProps> = ({
  transactionData,
  configurationParams,
  onPagaditoTransactionSuccess,
  onRetrieveThreeDSecureParams,
  onRetrieveSetupInformation,
  onStepUpFormRequired,
  onCardData,
  onRetrieveTokenPG,
  onRetrieveTokenAuth,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Card Information
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvn, setCvn] = useState("");
    const [selectorEnabled, setSelectorEnabled] = useState(true);

  // User Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState({
    city: "",
    state: "",
    zip: "",
    countryId: "",
    line1: "",
    phone: "",
  });

  const handleBillingAddress = (data: any) => {
    setBillingAddress(data);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const card = {
      number: cardNumber,
      expirationDate: expirationDate,
      cvv: cvn,
      cardHolderName: name,
    };

    const cardData = {
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvn: cvn,
      name: name,
    };

    onCardData(cardData);

    const userInformationData = {
      card: {
        ...card,
        firstName,
        lastName,
        email,
        billingAddress,
      },
      transaction: {
        merchantTransactionId: "TRS-" + Math.floor(Math.random() * 1000),
        currencyId: "USD",
        transactionDetails: transactionData,
      },
      browserInfo: {
        deviceFingerprintID: "123456478998",
        customerIp: "179.51.3.105",
      },
    };

    console.log(userInformationData);

    axios
      .post("/api/bridge-setup", {
        userInformationData: userInformationData,
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
        console.log(setupInformation);
        onRetrieveThreeDSecureParams(data);
        onRetrieveSetupInformation(setupInformation);
        onRetrieveTokenPG(response.data.token);
        onRetrieveTokenAuth(response.data.token_auth);
      });

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
        <h1 className="text-xl font-semibold dark:text-white">Unified Form</h1>
        <hr className="mt-4 mb-4" />
        <form onSubmit={handleSubmit} className="rounded-lg">
          {/* User Information */}
          <div className="mb-4">
            <label className="block mb-2 dark:text-white">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full h-8 text-xs"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 dark:text-white">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full h-8 text-xs"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 dark:text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full h-8 text-xs"
            />
          </div>

          <BillingAddressForm onBillingAddressData={handleBillingAddress} />

          {/* Card Information */}
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

          <div className="mb-4">
            {!isSubmitting ? (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 h-8 text-xs"
              >
                Submit
              </button>
            ) : (
              <Loading />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BridgeForm;
