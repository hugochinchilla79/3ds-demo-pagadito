import { get } from "http";
import React, { useEffect } from "react";

const countries = require("../data/countries.json");
const states = require("../data/states.json");

interface BillingAddressData {
  onBillingAddressData: (data: any) => void;
}

const BillingAddressForm: React.FC<BillingAddressData> = ({
  onBillingAddressData,
}) => {
  const [country, setCountry] = React.useState(countries[0].id);
  const [state, setState] = React.useState(states[0].id);
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [line1, setLine1] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    onBillingAddressData({
      city: event.target.value,
      state: state,
      zip: zip,
      countryId: country,
      line1: line1,
      phone: phone,
    });
  };

  const handleZip = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value);
    onBillingAddressData({
      city: city,
      state: state,
      zip: event.target.value,
      countryId: country,
      line1: line1,
      phone: phone,
    });
  }

  const handleLine1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLine1(event.target.value);
    onBillingAddressData({
      city: city,
      state: state,
      zip: zip,
      countryId: country,
      line1: event.target.value,
      phone: phone,
    });
  }

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    onBillingAddressData({
      city: city,
      state: state,
      zip: zip,
      countryId: country,
      line1: line1,
      phone: event.target.value,
    });
  }

  const getAvailableStates = (countryId: string) => {
    return states.filter((state: any) => state.countryId == countryId);
  };
  const [statesToDisplay, setStatesToDisplay] = React.useState(
    getAvailableStates(countries[0].id)
  );

  const handleState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
    onBillingAddressData({
      city: city,
      state: event.target.value,
      zip: zip,
      countryId: country,
      line1: line1,
      phone: phone,
    });
  };

  const populateFields = () => {
    setCountry("222"); //El Salvador
    setState(1); //San Salvador
    setCity("San Salvador");
    setZip("000000");
    setLine1("San Salvador");
    setPhone("50300000000");

    onBillingAddressData({
      city: "San Salvador",
      state: "San Salvador",
      zip: "000000",
      countryId: "222",
      line1: "San Salvador",
      phone: "50300000000",
    });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatesToDisplay(getAvailableStates(event.target.value));
    setCountry(event.target.value);
    onBillingAddressData({
      city: city,
      state: state,
      zip: zip,
      countryId: event.target.value,
      line1: line1,
      phone: phone,
    });
  };

  return (
    <div>
      <div className="mb-4">
        <hr />

        <a
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={populateFields}
        >
          Quick populate
        </a>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 dark:text-white">
          Country
        </label>
        <select
          value={country}
          onChange={handleCountryChange}
          className="border border-gray-300 rounded px-4 py-2 w-full h-8 text-xs"
        >
          {countries.map((country: any) => (
            <option key={country.isoNum} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 dark:text-white">
          State
        </label>
        <select
          className="border border-gray-300 rounded px-4 py-2 w-full h-8 text-xs"
          value={state}
          onChange={handleState}
        >
          {statesToDisplay.map((state: any) => (
            <option key={state.stateId} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 dark:text-white">
          City
        </label>
        <input
          type="text"
          id="name"
          className="border border-gray-300 rounded px-4 py-2 w-full h-8 text-xs"
          onChange={handleCity}
          value={city}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 dark:text-white">
          Zip
        </label>
        <input
          type="text"
          id="name"
          className="border border-gray-300 rounded px-4 py-2 w-full h-8 text-xs"
          onChange={handleZip}
          value={zip}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 dark:text-white">
          Address
        </label>
        <input
          type="text"
          id="name"
          className="border border-gray-300 rounded px-4 py-2 w-full h-8 text-xs"
          onChange={handleLine1}
          value={line1}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 dark:text-white">
          Phone
        </label>
        <input
          type="text"
          id="name"
          className="border border-gray-300 rounded px-4 py-2 w-full h-8 text-xs"
          onChange={handlePhone}
          value={phone}
        />
      </div>
    </div>
  );
};

export default BillingAddressForm;
