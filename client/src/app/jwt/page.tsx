'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export default function JwtDataPage() {
  const [jwtData, setJwtData] = useState<JwtPayload | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setJwtData(jwtDecode<JwtPayload>(token));
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2>JWT Token Data</h2>
      {jwtData ? (
        <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <th>User ID</th>
              <td>{jwtData.sub}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{jwtData.email}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{jwtData.role}</td>
            </tr>
            <tr>
              <th>Issued At</th>
              <td>{jwtData.iat ? new Date(jwtData.iat * 1000).toLocaleString() : 'N/A'}</td>
            </tr>
            <tr>
              <th>Expires At</th>
              <td>{jwtData.exp ? new Date(jwtData.exp * 1000).toLocaleString() : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning">No JWT token found or invalid token.</div>
      )}
    </div>
  );
}
//EOF