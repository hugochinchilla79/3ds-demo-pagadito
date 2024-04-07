interface ConsumerAuthenticationInformation {
  setup_request_id: string;
  referenceId: string;
  returnUrl: string;
}

interface BrowserInfo {
  customerIp: string;
  deviceFingerprintID: string;
}

interface TransactionDetail {
  quantity: number;
  description: string;
  amount: number;
}

interface BillingAddress {
  city: string;
  state: string;
  zip: string;
  countryId: string;
  line1: string;
  phone: string;
}

interface Transaction {
  merchantTransactionId: string;
  currencyId: string;
  transactionDetails: TransactionDetail[];
}

interface UserInformationData {
  card: Card;
  transaction: Transaction;
  browserInfo: BrowserInfo;
  consumerAuthenticationInformation: ConsumerAuthenticationInformation;
}

interface Card {
  number: string;
  cvv: string;
  expirationDate: string;
  cardHolderName: string;
  firstName: string;
  lastName: string;
  email: string;
  billingAddress: BillingAddress;
}


interface CardData {
  cardNumber: string;
  expirationDate: string;
  cvn: string;
  name: string;
}

interface ConfigurationParams {
  uid: string;
  wsk: string;
  url: string;
}


export type {
  ConsumerAuthenticationInformation,
  BrowserInfo,
  TransactionDetail,
  BillingAddress,
  Transaction,
  UserInformationData,
  Card,
  CardData,
  ConfigurationParams
};
