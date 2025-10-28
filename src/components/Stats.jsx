// Stats.jsx
import React from "react";

const Stats = ({ wpm, accuracy }) => {
  return (
    <div className="d-flex gap-4 align-items-center mt-3">
      <div>
        <div className="small text-muted">WPM</div>
        <div className="h5 mb-0">{wpm}</div>
      </div>
      <div>
        <div className="small text-muted">Accuracy</div>
        <div className="h5 mb-0">{accuracy}%</div>
      </div>
    </div>
  );
};

export default Stats;
