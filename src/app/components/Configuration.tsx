import React, { useState } from "react";
import Link from "next/link";

const endpoints = require("../data/endpoints.json");

interface ConfigurationData {
  onConfigurationParams: (data: any) => void;
}

const Configuration: React.FC<ConfigurationData> = ({
  onConfigurationParams,
}) => {
  const [url, setUrl] = useState(endpoints[0].url);
  const [uid, setUid] = useState(process.env.NEXT_PUBLIC_API_UID);
  const [wsk, setWsk] = useState(process.env.NEXT_PUBLIC_API_WSK,);
  const [configurationParams, setConfigurationParams] = useState({
    url: "",
    uid: "",
    wsk: "",
  });
  const [isConfigurationSetted, setIsConfigurationSetted] = useState(false);

  const handleUrlChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUrl(event.target.value);
  };

  const handleUidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUid(event.target.value);
  };

  const handleWskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWsk(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (url === "" || uid === "" || wsk === "") {
      alert("Please fill all the fields");
      return;
    }

    setIsConfigurationSetted(true);
    setConfigurationParams({ url, uid, wsk });
    onConfigurationParams({ url, uid, wsk });
  };


  const resetForm = () => {
    setUrl(endpoints[0].url);
    setUid("");
    setWsk("");
    setIsConfigurationSetted(false);
  }


  return (
    <div className="mx-auto">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold mt-4 mb-4 rounded-lg dark:text-white">
          Configuration
        </h2>
        <form onSubmit={handleSubmit} className="rounded-lg">
          <div>
            <label htmlFor="url" className="block mb-2 dark:text-white">
              URL:
            </label>
            <select
              id="url"
              value={url}
              onChange={handleUrlChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            >
              <option value="">Select URL</option>
              {endpoints.map((endpoint: any, index: number) => (
                <option key={index} value={endpoint.url}>
                  {endpoint.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="uid" className="block mb-2 mt-2 dark:text-white">
              UID:
            </label>
            <input
              type="text"
              id="uid"
              value={uid}
              onChange={handleUidChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="wsk" className="block mb-2 mt-2 dark:text-white">
              WSK:
            </label>
            <input
              type="text"
              id="wsk"
              value={wsk}
              onChange={handleWskChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>

          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Save credentials
              </button>
            </div>

            <div className="col-span-1 text-right">
              <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
              onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </div>

          {isConfigurationSetted ? (
            <div className="mt-4 text-green-500">Credentials setted!</div>
          ) : (
            <div className="mt-4 text-red-500">Credentials not setted</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Configuration;
