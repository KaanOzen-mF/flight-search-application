import { React, useState } from "react";

export default function SearchPage() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    isOneWay: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  console.log(formData);
  return (
    <>
      <form>
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
          placeholder="From"
        />

        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={handleChange}
          placeholder="To"
        />

        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
        />

        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
          disabled={formData.isOneWay} // Disable if 'One Way' is checked
        />

        <label>
          <input
            type="checkbox"
            name="isOneWay"
            checked={formData.isOneWay}
            onChange={handleChange}
          />
          One Way
        </label>
      </form>
    </>
  );
}
