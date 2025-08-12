import React from "react";
import { Link } from "react-router-dom";

const periods = ["1st", "2nd", "3rd", "5th", "6th", "7th"];

export default function Home() {
  return (
    <div className="container">
      <h1>Pick a Class Period</h1>
      <div className="grid">
        {periods.map((period) => (
          <Link key={period} to={`/class/${period}`} className="period-btn">
            {period} Period
          </Link>
        ))}
      </div>
    </div>
  );
}
