import React, { useState, useEffect } from "react";
import "./FlightBooking.css"; // Assume your CSS is in this file

const FlightBookingForm = () => {
  const [bookingInfo, setBookingInfo] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    isOneWay: false,
    /*}
    passengers: 1,
    travelClass: "Economy",*/
  });

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlightsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://658dafc07c48dce947399a24.mockapi.io/flights"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFlights(data);
      } catch (e) {
        setError(e.message);
        console.log(e);
      }
      setLoading(false);
    };

    fetchFlightsData();
  }, []);

  if (loading) {
    return <p>Loading flights...</p>;
  }

  if (error) {
    return <p>There was an error loading the flights: {error}</p>;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingInfo({
      ...bookingInfo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Booking Info:", bookingInfo);
  };

  return (
    <div className="flight-booking-container">
      <form className="flight-booking-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="text"
            name="from"
            value={bookingInfo.from}
            placeholder="Flying from"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="to"
            value={bookingInfo.to}
            placeholder="Flying to"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-row">
          <input
            type="date"
            name="departureDate"
            value={bookingInfo.departureDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="returnDate"
            value={bookingInfo.returnDate}
            onChange={handleInputChange}
            disabled={bookingInfo.isOneWay}
            required
          />
        </div>
        <div className="input-row">
          <label>
            <input
              type="checkbox"
              name="isOneWay"
              checked={bookingInfo.isOneWay}
              onChange={handleInputChange}
            />
            One Way
          </label>
          {/*
          <select
            name="passengers"
            value={bookingInfo.passengers}
            onChange={handleInputChange}
          >
            <option value="1">1 Passenger</option>
            <option value="2">2 Passengers</option>
            <option value="3">3 Passengers</option>
            <option value="4">4 Passengers</option>

          </select>
          <select
            name="travelClass"
            value={bookingInfo.travelClass}
            onChange={handleInputChange}
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
            
          </select>
          */}
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default FlightBookingForm;
