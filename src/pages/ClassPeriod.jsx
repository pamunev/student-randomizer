import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import students from "../students";

export default function ClassPeriod() {
  const { period } = useParams();
  const [selected, setSelected] = useState("");
  const [noRepeats, setNoRepeats] = useState(false);
  const [used, setUsed] = useState([]);

  const roster = students[period] || [];

  const pickRandom = () => {
    let available = noRepeats
      ? roster.filter((name) => !used.includes(name))
      : roster;

    if (available.length === 0) {
      setSelected("All students have been called!");
      return;
    }

    const randomName = available[Math.floor(Math.random() * available.length)];
    setSelected(randomName);

    if (noRepeats) {
      setUsed((prev) => [...prev, randomName]);
    }
  };

  return (
    <div className="container">
      <h1>{period} Period</h1>
      <div className="display">{selected || "Click the button to start"}</div>

      <button onClick={pickRandom} className="random-btn">
        Pick Random Student
      </button>

      <div className="toggle">
        <label>
          <input
            type="checkbox"
            checked={noRepeats}
            onChange={(e) => {
              setNoRepeats(e.target.checked);
              setUsed([]);
            }}
          />
          No repeats until all are chosen
        </label>
      </div>

      <Link to="/" className="back-btn">
        ← Back to Home
      </Link>
    </div>
  );
}
