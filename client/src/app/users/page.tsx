'use client';
import { useEffect, useState } from 'react';
import api from '../../axios.conf';
import { User } from '../types';

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      setData((prevData) => prevData.filter((user) => user.id_user !== id));
      alert(`User with ID ${id} deleted successfully!`);
    } catch (error: any) {
      console.error('Failed to delete user:', error.message);
      setError(`Failed to delete user with ID ${id}`);
    }
  };

  const handleEdit = (id: number) => {
    setEditingRow(id);
  };

  const handleSave = async (id: number) => {
    const user = data.find((u) => u.id_user === id);
    if (!user) return;

    setIsSubmitting(true);
    try {
      const response = await api.put(`/users/${id}`, user);
      const updatedUser = response.data;
      setData((prevData) =>
        prevData.map((u) =>
          u.id_user === id ? updatedUser : u
        )
      );
      alert('User updated successfully!');
      setEditingRow(null);
    } catch (error: any) {
      console.error('Failed to update user:', error.message);
      setError('Failed to update user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleChange = (id: number, field: string, value: string) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id_user === id ? { ...user, [field]: value } : user
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h1>Data from Database</h1>
      <table className="table table-striped table-bordered table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Surname</th>
            <th>First Name</th>
            <th>Second Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Status</th>
            <th>Role</th>
            <th>Password</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {editingRow === item.id_user ? (
                <>
                  <td>{item.id_user}</td>
                  <td><input type="email" value={item.email} onChange={(e) => handleChange(item.id_user, 'email', e.target.value)} /></td>
                  <td><input type="text" value={item.surname} onChange={(e) => handleChange(item.id_user, 'surname', e.target.value)} /></td>
                  <td><input type="text" value={item.first_name} onChange={(e) => handleChange(item.id_user, 'first_name', e.target.value)} /></td>
                  <td><input type="text" value={item.second_name || ''} onChange={(e) => handleChange(item.id_user, 'second_name', e.target.value)} /></td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>{new Date(item.updated_at).toLocaleString()}</td>
                  <td>
                    <select value={item.status} onChange={(e) => handleChange(item.id_user, 'status', e.target.value)}>
                      <option value="active" defaultChecked>Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="banned">Banned</option>
                    </select>
                  </td>
                  <td>
                    <select value={item.role} onChange={(e) => handleChange(item.id_user, 'role', e.target.value)}>
                      <option value="user" defaultChecked>User</option>
                      <option value="administrator">Admin</option>
                      <option value="worker">Admin</option>
                      <option value="root">Admin</option>
                    </select>
                  </td>
                  <td><input type="password" value={item.password} onChange={(e) => handleChange(item.id_user, 'password', e.target.value)} /></td>
                  <td>
                    <button className="btn btn-sm btn-success" onClick={() => handleSave(item.id_user)} disabled={isSubmitting}>Save</button>
                    <button className="btn btn-sm btn-secondary" onClick={handleCancel} disabled={isSubmitting}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.id_user}</td>
                  <td>{item.email}</td>
                  <td>{item.surname}</td>
                  <td>{item.first_name}</td>
                  <td>{item.second_name}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>{new Date(item.updated_at).toLocaleString()}</td>
                  <td>{item.status}</td>
                  <td>{item.role}</td>
                  <td>{item.password}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id_user)}>Delete</button>
                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item.id_user)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
//EOF