import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(`Account details submitted for ${name}.`);
  }

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <div className="auth-header">
          <p className="brand-name">Shopke</p>
          <h1>Create your account</h1>
          <p>Join Shopke and get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            id="name"
            label="Full name"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <Input
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
          />

          <Button type="submit" className="auth-submit">
            Create account
          </Button>
          {message && (
            <p className="success-message" role="status">
              {message}
            </p>
          )}
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </Card>
    </main>
  );
}

export default SignUp;
