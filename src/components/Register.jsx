import React, { useState } from 'react';
import Form from './Form';
import { useAuth } from 'providers/AuthProvider';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { signUp, currentUser } = useAuth();

  const onSubmit = () => {
    // const { email, password } = formData;
    signUp({
      ...formData
    });
  };

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  console.log(currentUser);
  return (
    <Form
      mode="signUp"
      formData={formData}
      onChange={handleFormDataChange}
      onSubmit={onSubmit}
    />
  );
}

export default Register;
