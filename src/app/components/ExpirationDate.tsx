import React, { useState } from "react";

interface ExpirationDateData {
  onExpirationDateString: (data: any) => void; // Add a new onData prop to the ExpirationDateData interface
}

const ExpirationDate: React.FC<ExpirationDateData> = ({
  onExpirationDateString,
}) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => currentYear + index);

  const [expirationDate, setExpirationDate] = useState("");

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(event.target.value);
    setExpirationDate(`${event.target.value}/${year}`);
    onExpirationDateString(`${event.target.value}/${year}`);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
    setExpirationDate(`${month}/${event.target.value}`);
    onExpirationDateString(`${month}/${event.target.value}`);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="expirationDate" className="block mb-2 dark:text-white">
          Expiration Date:
        </label>
        <div className="flex">
          <select
            id="month"
            value={month}
            onChange={handleMonthChange}
            className="border border-gray-300 rounded px-4 py-2 mr-2"
          >
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, index) => (
              <option
                key={index + 1}
                value={index + 1 < 10 ? `0${index + 1}` : index + 1}
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </option>
            ))}
          </select>
          <select
            id="year"
            value={year}
            onChange={handleYearChange}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExpirationDate;
