import { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css';
function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                password,
            }),
        })

        const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful')
            window.location.href = '/dashboard'
        } else {
            alert('Please check your username and password')
        }
    }

    return (
        <div style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center", marginTop: "100px", display: "flex", flexDirection: "column", maxWidth: "80%", minWidth: "50%", marginLeft: "auto", marginRight: "auto", padding: "12px", borderRadius: "8px" }}>
            <h1>Login</h1>
            <form onSubmit={loginUser} style={{ color: "black", maxWidth: "420px", width: "100%" }}>
                <p className="form-input" style={{ color: "white" }} >Email</p>
                <input
                    value={email}
                    style={{ width: "80%", padding: "8px", borderRadius: "8px" }}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />

                <br />
                <p className="form-input" style={{ color: "white" }}>Password</p>

                <input
                    style={{ width: "80%", padding: "8px", borderRadius: "8px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)
                    }
                    type="password"
                    placeholder="Password"
                />
                <br />
                <div style={{ justifyContent: "center", alignItems: "center", display: "flex", margin: "20px" }}>
                    <button className="btn" style={{ padding: "10px", borderRadius: "8px", backgroundColor: "#A12568", color: "white", borderColor: "Background" }}>Login</button>
                </div>
            </form >
            Don't have an account <Link to="/signup" style={{ color: "#D23F57" }}>Sign up here</Link>
        </div >
    )
}

export default App