// src/hooks/useFormValidation.js

import { useState } from 'react';

export const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (event, addEmail) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);

    if (Object.keys(validationErrors).length === 0) {
      addEmail(values.email); // Add email to the list
      setValues(initialState); // Reset form values
      setIsSubmitting(false); // Reset submitting state
    } else {
      setIsSubmitting(false); // Reset submitting state if there are errors
    }
  };

  const validatePasswordStrength = (password) => {
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    const hasSpecialCharacter = /[@#$%^]/;
    return hasNumber.test(password) && hasLetter.test(password) && hasSpecialCharacter.test(password) && password.length >= 8;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validatePasswordStrength,
    validateEmail
  };
};
