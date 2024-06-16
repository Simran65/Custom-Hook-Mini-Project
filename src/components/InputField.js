// components/InputField.js

import React from 'react';

const InputField = ({ type, name, value, onChange, error }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default InputField;
