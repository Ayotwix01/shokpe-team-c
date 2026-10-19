import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Mock sign-in because this project has no backend.
    console.log("Mock sign-in submitted:", {
      email: formData.email,
    });
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Card className="auth-card">
          <header className="auth-header">
            <p className="brand-name">Shopke</p>
            <h1>Welcome back</h1>
            <p>Sign in to manage your online store.</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <Input
              id="email"
              name="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
              required
            />

            <div className="password-field">
              <Input
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <Button type="submit" className="auth-submit">
              Sign in
            </Button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Create an account</Link>
          </p>
        </Card>
      </section>
    </main>
  );
}

export default SignIn;
