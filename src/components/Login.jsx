import React, { useState } from 'react';
import Form from './Form';

function Login() {
  const [formData, setFormData] = useState({
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
    <Form mode="signIn" formData={formData} onChange={handleFormDataChange} />
  );
}

export default Login;
