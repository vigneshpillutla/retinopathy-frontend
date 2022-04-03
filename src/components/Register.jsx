import React, { useState } from 'react';
import Form from './Form';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Form mode="signUp" formData={formData} onChange={handleFormDataChange} />
  );
}

export default Register;
