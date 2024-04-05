import React from "react";

interface TransactionInformationData {
    amount: string;
    description: string;
}

const TransactionInformation : React.FC<{transactionData: TransactionInformationData}> = ({transactionData}) => {
    return (
        <div className="container">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-2xl font-bold mt-4 mb-4 rounded-lg dark:text-white">
                    Transaction Information
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
            </div>
        </div>
    );
}

export default TransactionInformation;