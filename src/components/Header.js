import React, { useState } from "react";
import axios from "axios";

const Header = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ageResponse = await axios.get(`https://api.agify.io?name=${name}`);
      setAge(ageResponse.data.age);

      const genderResponse = await axios.get(
        `https://api.genderize.io?name=${name}`
      );
      setGender(genderResponse.data.gender);
      const countryResponse = await axios.get(
        ` https://api.nationalize.io?name=${name}`
      );

      setCountry(countryResponse.data.country);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Guess Age, Gender, and Country by Name</h1>
      <form onSubmit={submitHandler}>
        <input
          style={{ margin: "5px" }}
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {age && gender && country && (
        <div>
          <h2>Results:</h2>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
          <h3>Country:</h3>
          {country.map((item, index) => (
            <p key={index}>{item.country_id}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
