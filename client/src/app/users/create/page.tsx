'use client';
import { useState } from 'react';
import api from '../../../axios.conf';
import { User } from '../../types';

export default function CreateUserPage() {
  const [formData, setFormData] = useState<Partial<User>>({
    email: '',
    surname: '',
    first_name: '',
    second_name: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Make an async POST request to create a user
      const response = await api.post('/users/create', formData);
      setSuccessMessage('User created successfully!');
      setFormData({
        email: '',
        surname: '',
        first_name: '',
        second_name: '',
        password: '',
      });
      console.log('User created:', response.data);
    } catch (err: any) {
      console.error('Error creating user:', err);
      setError(err.response?.data?.message || 'Failed to create user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            value={formData.surname || ''}
            onChange={handleChange}
            required
            placeholder="Enter surname"
          />
        </div>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name || ''}
            onChange={handleChange}
            required
            placeholder="Enter first name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="second_name">Second Name</label>
          <input
            type="text"
            className="form-control"
            id="second_name"
            name="second_name"
            value={formData.second_name || ''}
            onChange={handleChange}
            placeholder="Enter second name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            required
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create User'}
        </button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      {successMessage && <p className="text-success mt-3">{successMessage}</p>}
    </div>
  );
};
//EOF