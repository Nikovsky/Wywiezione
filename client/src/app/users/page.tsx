'use client';

import { useEffect, useState } from 'react';
import api from '../../axios.conf';

// Define the user interface for type safety
interface User {
    id_user: number;
    email: string;
    surname: string;
    first_name: string;
    second_name?: null;
    created_at: string;
    updated_at: string;
    status: string;
    role: string;
    password: string;
}

export default function UsersPage() {
    const [data, setData] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/users');
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
            // Send DELETE request to the backend
            await api.delete(`/users/${id}`);
            // Filter the deleted user from the list
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
            await api.put(`/users/${id}`, user);
            alert('User updated successfully!');

            setData((prevData) =>
                prevData.map((u) =>
                    u.id_user === id
                        ? { ...u, updated_at: new Date().toISOString() }
                        : u
                )
            );

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
                    {/* {data.map((item, index) => (
                        <tr key={index}>
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
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id_user)}>Delete</button>
                                <button className="btn btn-warning">Edit</button>
                            </td>
                        </tr>
                    ))} */}
                    {data.map((user) => (
                        <tr key={user.id_user}>
                            <td>{user.id_user}</td>
                            <td>
                                {editingRow === user.id_user ? (
                                    <input
                                        type="email"
                                        value={user.email}
                                        onChange={(e) =>
                                            handleChange(user.id_user, 'email', e.target.value)
                                        }
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                {editingRow === user.id_user ? (
                                    <input
                                        type="text"
                                        value={user.surname}
                                        onChange={(e) =>
                                            handleChange(user.id_user, 'surname', e.target.value)
                                        }
                                    />
                                ) : (
                                    user.surname
                                )}
                            </td>
                            <td>
                                {editingRow === user.id_user ? (
                                    <input
                                        type="text"
                                        value={user.first_name}
                                        onChange={(e) =>
                                            handleChange(user.id_user, 'first_name', e.target.value)
                                        }
                                    />
                                ) : (
                                    user.first_name
                                )}
                            </td>
                            <td>
                                {editingRow === user.id_user ? (
                                    <input
                                        type="text"
                                        value={user.second_name || ''}
                                        onChange={(e) =>
                                            handleChange(user.id_user, 'second_name', e.target.value)
                                        }
                                    />
                                ) : (
                                    user.second_name || 'N/A'
                                )}
                            </td>
                            <td>{new Date(user.created_at).toLocaleString()}</td>
                            <td>{new Date(user.updated_at).toLocaleString()}</td>
                            <td>
                                {editingRow === user.id_user ? (
                                    <select
                                        value={user.status}
                                        onChange={(e) =>
                                            handleChange(user.id_user, 'status', e.target.value)
                                        }
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                ) : (
                                    user.status
                                )}
                            </td>
                            <td>
                                {editingRow === user.id_user ? (
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            handleChange(user.id_user, 'role', e.target.value)
                                        }
                                    >
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td>
                                {editingRow === user.id_user ? (
                                    <input
                                        type="password"
                                        value={user.password}
                                        onChange={(e) =>
                                            handleChange(user.id_user, 'password', e.target.value)
                                        }
                                    />
                                ) : (
                                    user.password
                                )}
                            </td>
                            <td>
                                {editingRow === user.id_user ? (
                                    <>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleSave(user.id_user)}
                                            disabled={isSubmitting}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={handleCancel}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleEdit(user.id_user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(user.id_user)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
//EOF