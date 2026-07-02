import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

   const handleRegister = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(
  "https://neurochat-4qla.onrender.com/api/auth/register",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }
);

        const data = await response.json();

        if (response.ok) {
            alert("Registered successfully!");
            navigate("/login");   // 👉 go to login page
        } else {
            alert(data.message || "Registration failed");
        }

    } catch (err) {
        console.log(err);
        alert("Server error");
    }
};

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create Account</h2>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <div className="register-footer">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;