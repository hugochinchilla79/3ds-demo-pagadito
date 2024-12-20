import React, { useState } from "react";
import Link from "next/link";

interface ConfigurationData {
  onConfigurationParams: (data: any) => void;
  endpoints: any;
}

const BridgeConfiguration: React.FC<ConfigurationData> = ({
  onConfigurationParams,
  endpoints
}) => {
  const [url, setUrl] = useState(endpoints[0].url);
  const [clientId, setClientId] = useState(process.env.NEXT_PUBLIC_API_CLIENT_ID);
  const [clientSecret, setClientSecret] = useState(process.env.NEXT_PUBLIC_API_CLIENT_SECRET);
  const [env, setEnv] = useState(process.env.NEXT_PUBLIC_API_ENV);
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0].id);

  console.log(process.env.NEXT_PUBLIC_API_CLIENT_ID);
  console.log(process.env.NEXT_PUBLIC_API_CLIENT_SECRET);

  const [configurationParams, setConfigurationParams] = useState({
    url: "",
    clientId: "",
    clientSecret: "",
    env: ""
  });
  const [isConfigurationSetted, setIsConfigurationSetted] = useState(false);

  const handleUrlChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEndpoint(event.target.value);
    let endpoint = endpoints.find((endpoint: any) => endpoint.id == event.target.value);
    console.log(endpoint);
    setUrl(endpoint.url);
    setEnv(endpoint.environment);
  };

  const handleClientIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientId(event.target.value);
  };

  const handleClientSecretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientSecret(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (url === "" || clientId === "" || clientSecret === "") {
      alert("Please fill all the fields");
      return;
    }

    setIsConfigurationSetted(true);
    setConfigurationParams({ url, clientId, clientSecret, env });
    onConfigurationParams({ url, clientId, clientSecret, env });
  };

  const resetForm = () => {
    setUrl(endpoints[0].url);
    setClientId("");
    setClientSecret("");
    setIsConfigurationSetted(false);
  };

  return (
    <div className="mx-auto">
      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-bold mt-4 mb-4 rounded-lg dark:text-white">
          Configuration
        </h2>
        <form onSubmit={handleSubmit} className="rounded-lg">
          <div>
            <label htmlFor="url" className="block mb-2 dark:text-white">
              URL:
            </label>
            <select
              id="url"
              value={selectedEndpoint}
              onChange={handleUrlChange}
              className="border border-gray-300 rounded text-xs px-4 py-2 w-full h-8"
            >
              <option value="">Select URL</option>
              {endpoints.map((endpoint: any, index: number) => (
                <option key={index} value={endpoint.id}>
                  {endpoint.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="clientId" className="block mb-2 mt-2 dark:text-white">
              Client ID:
            </label>
            <input
              type="text"
              id="clientId"
              value={clientId}
              onChange={handleClientIdChange}
              className="border border-gray-300 rounded px-4 py-2 w-full text-xs h-8"
            />
          </div>
          <div>
            <label htmlFor="clientSecret" className="block mb-2 mt-2 dark:text-white">
              Client Secret:
            </label>
            <input
              type="text"
              id="clientSecret"
              value={clientSecret}
              onChange={handleClientSecretChange}
              className="border border-gray-300 rounded text-xs px-4 py-2 w-full h-8"
            />
          </div>

          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 text-xs"
              >
                Save credentials
              </button>
            </div>

            <div className="col-span-1 text-right">
              <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4 text-xs"
              onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </div>

          {isConfigurationSetted ? (
            <div className="mt-4 text-xs text-green-500">Credentials setted!</div>
          ) : (
            <div className="mt-4 text-xs text-red-500">Credentials not setted</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BridgeConfiguration;
