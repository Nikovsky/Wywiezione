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
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
//EOF