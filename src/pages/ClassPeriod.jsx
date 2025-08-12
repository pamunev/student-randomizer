import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import students from "../students";

export default function ClassPeriod() {
  const { period } = useParams();
  const [selected, setSelected] = useState("");
  const [noRepeats, setNoRepeats] = useState(false);
  const [used, setUsed] = useState([]);
  const [showRoster, setShowRoster] = useState(false);
  const [flash, setFlash] = useState(false);
  const [isCycling, setIsCycling] = useState(false);

  const roster = students[period] || [];
  const intervalRef = useRef(null);

  const pickRandom = () => {
    if (isCycling) return; // Prevent double clicks

    let available = noRepeats
      ? roster.filter((name) => !used.includes(name))
      : roster;

    if (available.length === 0) {
      setSelected("All students have been called!");
      return;
    }

    setIsCycling(true);
    let cycleCount = 0;
    intervalRef.current = setInterval(() => {
      // Show random name quickly
      const randomName =
        available[Math.floor(Math.random() * available.length)];
      setSelected(randomName);
      cycleCount++;
      // After ~20 cycles (~2 seconds), stop cycling
      if (cycleCount > 20) {
        clearInterval(intervalRef.current);
        setIsCycling(false);
        setFlash(true);
        // Reset flash after animation
        setTimeout(() => setFlash(false), 500);

        if (noRepeats) {
          setUsed((prev) => [...prev, randomName]);
        }
      }
    }, 100);
  };

  return (
    <div className="container">
      <h1>{period} Period</h1>
      <div className={`display ${flash ? "flash" : ""}`}>
        {selected || "Click the button to start"}
      </div>

      <button
        onClick={pickRandom}
        className="random-btn"
        disabled={isCycling}
        style={{
          opacity: isCycling ? 0.6 : 1,
          cursor: isCycling ? "not-allowed" : "pointer",
        }}
      >
        {isCycling ? "Picking..." : "Pick Random Student"}
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
            disabled={isCycling}
          />
          No repeats until all are chosen
        </label>
      </div>

      {/* View Roster toggle 
      <div className="roster-section">
        <button
          className="roster-btn"
          onClick={() => setShowRoster((prev) => !prev)}
          disabled={isCycling}
        >
          {showRoster ? "Hide Roster" : "View Roster"}
        </button>
        {showRoster && (
          <ul className="roster-list">
            {roster.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        )}
      </div> */}

      <Link to="/" className="back-btn" tabIndex={isCycling ? -1 : 0}>
        ← Back to Home
      </Link>
    </div>
  );
}
