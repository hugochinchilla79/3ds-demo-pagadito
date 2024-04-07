"use client";

import React from "react";
import { useRouter } from 'next/router';
import TransactionInformation from "../app/components/TransactionInformation";
import "../app/globals.css";
const SuccessValidation = () => {
    const router = useRouter();
    const { amount, description, authorization, merchantTransactionId, payment_token, totalAmount } = router.query;

    let transactionData = {
        amount: amount,
        description: description
    };

    let infoPagadito = {
        authorization: authorization,
        merchantTransactionId: merchantTransactionId,
        payment_token: payment_token,
        totalAmount: totalAmount
    };
    


    return (
        <div className="container justify-center mx-auto">
            <TransactionInformation title="Transaction Success With 3DSecure Pagadito" transactionData={transactionData} infoPagadito={infoPagadito} />
        </div>
    );
};

export default SuccessValidation;