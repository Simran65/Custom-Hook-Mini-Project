// src/components/Form.js

import React, { useState } from 'react';
import { useFormValidation } from './hooks/useFormValidation';
import InputField from './InputField';


const initialState = {
  email: '',
  password: ''
};

const Form = () => {
  const [emails, setEmails] = useState([]);

  const addEmail = (email) => {
    setEmails([...emails, email]);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!validatePasswordStrength(values.password)) {
      errors.password = 'Password must be at least 8 characters long, and include at least one letter, one number, and one special character (@, #, $, %, ^).';
    }

    return errors;
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validatePasswordStrength,
    validateEmail
  } = useFormValidation(initialState, validate);

  return (
    <div
      className="form-container"
    
    >
      <form onSubmit={(e) => handleSubmit(e, addEmail)}>
        <InputField
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />
        <InputField
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <div className="email-list">
        <h3>Submitted Emails</h3>
        <ul>
          {emails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
