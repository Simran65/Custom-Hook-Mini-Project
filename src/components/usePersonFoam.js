import { useState, useRef } from 'react';

const usePersonForm = (initialState = { firstName: '', lastName: '', email: '', age: '', occupation: '' }) => {
  const [person, setPerson] = useState(initialState);
  const firstnameInput = useRef(null);

  const onChange = (event) => {
    setPerson({ ...person, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setPerson(initialState);
    firstnameInput.current && firstnameInput.current.focus();
  };

  return { person, onChange, resetForm, firstnameInput };
};

export default usePersonForm;
