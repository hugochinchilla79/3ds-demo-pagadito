import React, { useState } from "react";

const DataForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("El Salvador");
  const [state, setState] = useState("San Salvador");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="222">El Salvador</option>
      </select>
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="San Salvador">San Salvador</option>
      </select>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Zip Code"
      />
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DataForm;
