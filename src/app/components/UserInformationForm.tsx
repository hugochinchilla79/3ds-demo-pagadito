import React from "react";
import axios from "axios";

import {
  CardData,
  UserInformationData,
  TransactionDetail,
} from "../interfaces/TransactionInterfaces";
import { useState } from "react";
import BillingAddressForm from "./BillingAddressForm";
import Loading from "./Loading";

const UserInformationForm: React.FC<{
  cardData: CardData;
  transactionData: any;
  setupInformation: any;
  configuration: any;
  onPagaditoTransactionSuccess: any;
  onStepUpFormRequired: any;
}> = ({
  cardData,
  transactionData,
  setupInformation,
  configuration,
  onPagaditoTransactionSuccess,
  onStepUpFormRequired
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = (event: React.FormEvent) => {
    const card = {
      number: cardData.cardNumber,
      expirationDate: cardData.expirationDate,
      cvv: cardData.cvn,
      cardHolderName: cardData.name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      billingAddress: billingAddress,
    };

    let transactionDetail: TransactionDetail = {
      amount: transactionData.amount,
      quantity: 1,
      description: transactionData.description,
    };

    let userInformationData: UserInformationData = {
      card: card,
      transaction: {
        merchantTransactionId: "TRS-" + Math.floor(Math.random() * 1000),
        currencyId: "USD",
        transactionDetails: [transactionDetail],
      },
      browserInfo: {
        deviceFingerprintID: "123456478998",
        customerIp: "179.51.3.105",
      },
      consumerAuthenticationInformation: {
        setup_request_id: setupInformation.setup_request_id,
        referenceId: setupInformation.referenceId,
        returnUrl: "http://localhost:3000/api/validate",
      },
    };

    setIsSubmitting(true);
    axios
      .post("/api/customer", {
        customerInformation: userInformationData,
        configuration: configuration,
      })
      .then((response: any) => {
        setIsSubmitting(false);
        console.log(response);

        switch (response.data.response_code) {
          case "PG200-00":
            onPagaditoTransactionSuccess(response.data.customer_reply);
            break;
          case "PG402-05":
            onStepUpFormRequired({
              action: response.data.customer_reply.stepUpUrl,
              jwt: response.data.customer_reply.accessToken,
              md: JSON.stringify({customerInformation: userInformationData, configuration: configuration}),
              enabled: true,
            });
            break;
          default:
            alert("Transaction failed - Reload Demo");
            break;
        }
      })
      .catch((error: any) => {
        console.error(error);
        setIsSubmitting(false);
      });

    event.preventDefault();
  };

  return (
    <div className="container mx-auto flex justify-center">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-1/2">
        <h1 className="text-xl font-semibold dark:text-white">
          User Information Form
        </h1>
        <hr className="mt-4 mb-4" />
        <form onSubmit={handleSubmit} className="rounded-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 dark:text-white">
              Firstname
            </label>
            <input
              type="text"
              id="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 dark:text-white">
              Lastname
            </label>
            <input
              type="text"
              id="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 dark:text-white">
              Email
            </label>
            <input
              type="text"
              id="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>

          <BillingAddressForm
            onBillingAddressData={handleBillingAddress}
          ></BillingAddressForm>

          <div className="mb-4">
            {!isSubmitting && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}

            {isSubmitting && <Loading />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInformationForm;
