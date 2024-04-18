## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting the environment variables

For your convenience, you can set the UID, WSK an other variables in the .env file (recommended)

```
NEXT_PUBLIC_API_PAGADITO_BASE_URL="https://sandbox-api.pagadito.com/v1/"
#SANDBOX
#NEXT_PUBLIC_API_WSK="wsk"
#NEXT_PUBLIC_API_UID="uid"
NEXT_PUBLIC_API_SETUP_3DS="setup-payer"
NEXT_PUBLIC_API_CUSTOMER="customer"
NEXT_PUBLIC_API_DEMO_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_API_ENV="sandbox"
```

Also, you need to set NEXT_PUBLIC_API_DEMO_BASE_URL to not have trouble with CORS, so if you run the demo in another port other than 3000 you MUST change this value.

## Changing params or configuration

You can change certain data on the demo to change the prices, countries, product names, even states

* src/app/data/cards.json - This contains the card demo data
* src/app/data/countries.json - This contains the countries list
* src/app/data/states.json - This contains the states list
* src/app/data/products.json - This contains the product details, you can add more if you want
