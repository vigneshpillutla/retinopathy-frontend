import { useAuth } from 'providers/AuthProvider';
import { useNotification } from 'providers/NotificationsProvider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import Form from './Form';

function Login() {
  const [formData, setFormData] = useState({
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
        return !validator.isEmpty(value);
      }
    }
  });

  const [loading, setLoading] = useState(false);
  const { signIn, currentUser } = useAuth();
  const { pushNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, restrict access to this page.
    if (currentUser) {
      navigate('/');
    }
  }, [JSON.stringify(currentUser)]);

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

  const onSubmit = async () => {
    const { email, password } = formData;

    try {
      setLoading(true);
      await signIn({
        email: email.value,
        password: password.value
      });
      pushNotification('Logged in successfully!', '', 'success');
      navigate('/');
    } catch (error) {
      pushNotification('User not found!', '', 'error');
    }

    setLoading(false);
  };

  return (
    <Form
      mode="signIn"
      formData={formData}
      onChange={handleFormDataChange}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}

export default Login;
