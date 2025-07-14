import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = true,
  showToggle = false,
  toggleHandler,
  showValue,
  note,
  error,
}) => {
  return (
    <div className="relative mb-6 w-full">
      <label className="absolute -top-2 left-4 bg-white px-1 text-xs z-10">{label}</label>
      <input
        name={name}
        type={showToggle ? (showValue ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 border rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={toggleHandler}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {showValue ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}
      {note && <p className="text-xs mt-1 ml-4 text-gray-700">{note}</p>}
      {error && <p className="text-xs mt-1 ml-4 text-red-600">{error}</p>}
    </div>
  );
};

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { firstName, lastName, email, password } = formData;
      await api.post("/auth/signup", { firstName, lastName, email, password });

      alert("Registered successfully");
      resetForm();
      setTimeout(() => navigate("/signin"), 1000);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-[#e3f5d4] text-black p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl text-center mb-10 font-bold">Sign Up</h1>

        <form className="flex flex-col" onSubmit={onSubmit}>
          <div className="flex gap-5 mb-6">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            showToggle
            showValue={showPassword}
            toggleHandler={() => setShowPassword(!showPassword)}
            note="Password must be at least 6 characters"
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            showToggle
            showValue={showConfirmPassword}
            toggleHandler={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="bg-[#a4d57c] text-black py-3 px-5 rounded-full text-lg font-medium mx-auto mt-4 hover:bg-[#95cb6a] transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-green-700 font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
    <line x1="1" y1="5" x2="23" y2="19" />
  </svg>
);

export default SignUpForm;
