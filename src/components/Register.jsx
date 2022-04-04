import React, { useState } from 'react';
import Form from './Form';
import { useAuth } from 'providers/AuthProvider';
import validator from 'validator';
import { useNotification } from 'providers/NotificationsProvider';

function Register() {
  const [formData, setFormData] = useState({
    name: {
      value: '',
      isValid: false,
      dirty: false,
      validate(value) {
        return !validator.isEmpty(value);
      }
    },
    email: {
      value: '',
      isValid: false,
      dirty: false,
      validate(value) {
        return validator.isEmail(value);
      }
    },
    password: {
      value: '',
      isValid: false,
      dirty: false,
      validate(value) {
        return validator.isStrongPassword(value);
      }
    }
  });

  const [loading, setLoading] = useState(false);

  const { signUp, currentUser } = useAuth();
  const { pushNotification } = useNotification();

  const onSubmit = async () => {
    const { email, password, name } = formData;

    try {
      setLoading(true);
      await signUp({
        email: email.value,
        password: password.value,
        name: name.value
      });
      pushNotification('Successfully signed Up!', '', 'success');
    } catch {}

    setLoading(false);
  };

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const inputField = prev[name];
      return {
        ...prev,
        [name]: {
          ...inputField,
          value,
          dirty: true,
          isValid: inputField.validate(value)
        }
      };
    });
  };
  return (
    <Form
      mode="signUp"
      formData={formData}
      onChange={handleFormDataChange}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}

export default Register;
