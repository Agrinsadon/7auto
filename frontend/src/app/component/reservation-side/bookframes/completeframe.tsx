import React from 'react';
import './completeframe.css';

const CompleteFrame: React.FC = () => {
  return (
    <div className="success-container">
      <div className="checkmark-circle">
        <svg className="checkmark" viewBox="0 0 52 52" width="60" height="60" >
          <circle className="checkmark-circle-bg" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark-check" fill="none" d="M14 27l7 7 17-17" />
        </svg>
      </div>
      <p className="success-message">Kiitos, lähetimme varmistuksen sähköpostiin.</p>
    </div>
  );
};

export default CompleteFrame;
