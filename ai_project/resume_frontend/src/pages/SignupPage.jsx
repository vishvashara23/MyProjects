import React, { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/users/add", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setSuccess(true);
        setFormData({email: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Something went wrong!");
      } else {
        setError("Failed to connect to the server. Check backend!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">Signup successful!</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label flex items-center gap-2">
              <span className="label-text pl-4">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label flex items-center gap-2">
              <span className="label-text pl-4">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label flex items-center gap-2">
              <span className="label-text pl-4">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-lg font-semibold rounded-lg shadow-lg"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500 font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
 