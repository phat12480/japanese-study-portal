// src/pages/AuthPage.jsx
import { useState } from "react";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: form.email,
          password: form.password,
        });

        const { token, user } = res.data;

        localStorage.setItem("jsp_token", token);
        localStorage.setItem("jsp_user", JSON.stringify(user));

        if (onAuthSuccess) onAuthSuccess({ token, user });
      } else {
        // REGISTER
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            name: form.name,
            email: form.email,
            password: form.password,
          }
        );

        alert("Register success! Now login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Authentication failed.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
        {isLogin ? "Login" : "Register"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm">Name</label>
            <input
              name="name"
              type="text"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            type="email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            name="password"
            type="password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      {/* GOOGLE LOGIN BUTTON */}
      <div className="mt-4">
        <GoogleLoginButton onSuccess={onAuthSuccess} />
      </div>

      <div className="mt-4 text-center">
        <button
          className="text-sm text-blue-600 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
