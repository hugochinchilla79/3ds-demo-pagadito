"use client";

import card from "@material-tailwind/react/theme/components/card";
import React from "react";

interface CardData {
  cardNumber: string;
  expirationDate: string;
  cvn: string;
  name: string;
}

const Card: React.FC<{ cardData: CardData }> = ({ cardData }) => {
  return (
    <div className="space-y-16">
      <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
        {cardData.cardNumber.startsWith("4") ? (
          <img
            className="relative object-cover w-full h-full rounded-xl"
            src="/img/visa.jpg"
          />
        ) : cardData.cardNumber.startsWith("5") ? (
          <img
            className="relative object-cover w-full h-full rounded-xl"
            src="/img/mastercard.jpg"
          />
        ) : null}

        <div className="w-full px-8 absolute top-8">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light">Name</p>
              <p className="font-medium tracking-widest">
                {cardData.name != "" ? cardData.name : "CardHolder Name"}
              </p>
            </div>
            {cardData.cardNumber.startsWith("4") ? (
              <img
                src="/img/logos/visa_white.png" // Path to the Visa logo
                className="w-24 h-18"
                alt="Visa Logo"
              />
            ) : cardData.cardNumber.startsWith("5") ? (
              <img
                src="/img/logos/mastercard.svg" // Path to the Mastercard logo
                className="w-16 h-14"
                alt="Mastercard Logo"
              />
            ) : null}
          </div>
          <div className="pt-1">
            <p className="font-light">Card Number</p>
            <p className="font-medium tracking-more-wider">
              {cardData.cardNumber.match(/.{1,4}/g)?.join(" ")}
            </p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div className="">
                <p className="font-light text-xs text-xs">Expiry</p>
                <p className="font-medium tracking-wider text-sm">
                  {cardData.expirationDate != ""
                    ? cardData.expirationDate
                    : "MM/YY"}
                </p>
              </div>

              <div className="">
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {cardData.cvn != "" ? cardData.cvn : "***"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
