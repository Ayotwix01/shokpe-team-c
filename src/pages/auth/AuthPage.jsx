import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);

  const isSignUp = location.pathname !== "/signin";

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Focus the email input when the route changes.
  useEffect(() => {
    emailRef.current?.focus();
  }, [location.pathname]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  }

  function handleAuthSwitch() {
    setErrors({});
    setShowPassword(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

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

    if (isSignUp) {
      // Mock sign-up: continue to onboarding.
      navigate("/onboarding", { replace: true });
    } else {
      // Mock sign-in: no backend authentication is configured.
      console.log("Mock sign-in submitted:", {
        email: formData.email,
      });
    }
  }

  function handleGoogleContinue() {
    // Simulated action; this is not real Google authentication.
    navigate("/onboarding", { replace: true });
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Card className="auth-card">
          <header className="auth-header">
            <p className="brand-name">Shopke</p>

            <h1>{isSignUp ? "Create your account" : "Welcome back"}</h1>

            <p>
              {isSignUp
                ? "Set up your business and start selling online."
                : "Sign in to manage your online store."}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {isSignUp && (
              <Input
                id="name"
                name="name"
                label="Full name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
                required
              />
            )}

            <Input
              ref={emailRef}
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
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete={isSignUp ? "new-password" : "current-password"}
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
              {isSignUp ? "Create account" : "Sign in"}
            </Button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <Button
            variant="secondary"
            className="auth-submit google-button"
            onClick={handleGoogleContinue}
          >
            Continue with Google
          </Button>

          <p className="auth-footer">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}

            <Link
              to={isSignUp ? "/signin" : "/signup"}
              onClick={handleAuthSwitch}
            >
              {isSignUp ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </Card>
      </section>
    </main>
  );
}

export default AuthPage;
