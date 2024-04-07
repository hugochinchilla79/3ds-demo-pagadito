import React from "react";

interface TransactionInformationData {
    amount: any;
    description: any;
}

const TransactionInformation : React.FC<{transactionData: TransactionInformationData, infoPagadito: any, title: string}> = ({transactionData, infoPagadito, title}) => {
    return (
        <div className="container">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-2xl font-bold mt-4 mb-4 rounded-lg dark:text-white">
                    {title}
                </h2>
                <hr className="mb-4" />
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="amount" className="block mb-2 dark:text-white">
                            Amount:
                        </label>
                       <strong className="dark:text-white">
                            ${transactionData.amount}
                       </strong>
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="description" className="block mb-2 dark:text-white">
                            Description:
                        </label>
                        <strong className="dark:text-white">
                            {transactionData.description}
                        </strong>
                    </div>
                </div>
                <hr className="mt-4 mb-4" />
                {infoPagadito && (
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <label htmlFor="amount" className="block mb-2 dark:text-white">
                                Autorización:
                            </label>
                            <strong className="dark:text-white">
                                {infoPagadito.authorization}
                            </strong>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="description" className="block mb-2 dark:text-white">
                                Transaction ID:
                            </label>
                            <strong className="dark:text-white">
                                {infoPagadito.merchantTransactionId}
                            </strong>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="description" className="block mb-2 dark:text-white">
                                Total:
                            </label>
                            <strong className="dark:text-white">
                                {infoPagadito.totalAmount}
                            </strong>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="description" className="block mb-2 dark:text-white">
                                Payment Token:
                            </label>
                            <strong className="dark:text-white">
                                {infoPagadito.payment_token}
                            </strong>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TransactionInformation;