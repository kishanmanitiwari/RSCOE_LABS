import { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export default function App() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('John')
    const [password, setPassword] = useState('12345')
    const [token, setToken] = useState('')
    const [dashboardMessage, setDashboardMessage] = useState('')
    const [error, setError] = useState('')

     async function fetchUsers() {
        try {
            setError('')
            const response = await axios.get(`${API_BASE_URL}/users`) 
            setUsers(response.data)
        } catch (requestError) {
            setError(requestError.response?.data || 'Error fetching users')
        }
    }

    async function login() {
        try {
            setError('')
            setDashboardMessage('')
            const response = await axios.get(`${API_BASE_URL}/login`, {
                params: { name, password },
            })
            setToken(response.data.token)
        } catch (requestError) {
            setToken('')
            setError(requestError.response?.data || 'Error logging in')
        }
    }

    async function accessDashboard() {
        try {
            setError('')
            const response = await axios.get(`${API_BASE_URL}/dashboard`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setDashboardMessage(response.data)
        } catch (requestError) {
            setDashboardMessage('')
            setError(requestError.response?.data || 'Error accessing dashboard')
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
            <h1>Backend API Demo</h1>

            <section>
                <h2>Users</h2>
                <button onClick={fetchUsers}>Refresh Users</button>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.id} - {user.name}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Login</h2>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button onClick={login}>Login</button>
                </div>
                {token && <p><strong>Token:</strong> {token}</p>}
            </section>

            <section>
                <h2>Dashboard</h2>
                <button onClick={accessDashboard} disabled={!token}>
                    Access Dashboard
                </button>
                {dashboardMessage && <p>{dashboardMessage}</p>}
            </section>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
