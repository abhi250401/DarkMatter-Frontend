import { useState } from 'react'
import { Link } from 'react-router-dom'
function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            alert('registration success')
        }
        else {
            alert('error email already exists')
        }
    }

    return (
        <div style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center", marginTop: "100px", display: "flex", flexDirection: "column", maxWidth: "80%", minWidth: "50%", marginLeft: "auto", marginRight: "auto", padding: "12px", borderRadius: "8px" }}>
            <h1>Register</h1>
            <form onSubmit={registerUser} style={{ color: "white", maxWidth: "420px", width: "100%" }}>
                <p className="form-input"  >Name</p>
                <input
                    value={name}
                    style={{ width: "80%", padding: "8px", borderRadius: "8px" }}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />
                <br />
                <p className="form-input" style={{ color: "white" }} >Email</p>

                <input
                    value={email}
                    style={{ width: "80%", padding: "8px", borderRadius: "8px" }}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <br />
                <p className="form-input" style={{ color: "white" }} >Password</p>

                <input
                    value={password}
                    style={{ width: "80%", padding: "8px", borderRadius: "8px" }}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <br />
                <div style={{ justifyContent: "center", alignItems: "center", display: "flex", margin: "20px" }}>
                    <button className="btn" style={{ padding: "10px", borderRadius: "8px", backgroundColor: "#A12568", color: "white", borderColor: "Background" }}>Register</button>
                </div>                    <p> Have an account ? <Link to="/login" style={{ color: "red" }}> LOGIN</Link>
                </p>
            </form>
        </div>
    )
}

export default Register