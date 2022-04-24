import React, { useEffect, useState } from 'react';
import Form from './Form';
import { useAuth } from 'providers/AuthProvider';
import validator from 'validator';
import { useNotification } from 'providers/NotificationsProvider';
import { useNavigate } from 'react-router-dom';
import { updateData } from 'utils/firebaseUtils';
import { ROLES } from 'config/roles';

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
    },
    ophthalmologist: {
      value: false,
      isValid: true,
      dirty: false,
      validate: () => true
    }
  });

  const [loading, setLoading] = useState(false);

  const { signUp, currentUser } = useAuth();
  const { pushNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [JSON.stringify(currentUser)]);

  const onSubmit = async () => {
    const { email, password, name, ophthalmologist } = formData;

    try {
      setLoading(true);
      const response = await signUp({
        email: email.value,
        password: password.value,
        name: name.value
      });

      const { user } = response;
      const role = ophthalmologist.value ? ROLES.OPHTHALMOLOGIST : ROLES.USER;
      await updateData(`users/${user.uid}`, {
        email: email.value,
        name: name.value,
        role
      });
      pushNotification('Successfully signed Up!', '', 'success');
    } catch (error) {
      console.log(error);
      pushNotification('Failed to sign up', 'Try Again Later', 'error');
    }

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
