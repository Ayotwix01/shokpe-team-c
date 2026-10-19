import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Onboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    whatsapp: "",
    city: "",
    state: "",
    storeSlug: "",
    logo: null,
    acceptedTerms: false,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => {
      const updatedData = {
        ...previousData,
        [name]: value,
      };

      if (name === "businessName") {
        updatedData.storeSlug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      }

      return updatedData;
    });
  }

  function handleLogoChange(event) {
    const file = event.target.files?.[0] ?? null;

    setFormData((previousData) => ({
      ...previousData,
      logo: file,
    }));
  }

  function goNext() {
    setStep((currentStep) => Math.min(currentStep + 1, 3));
  }

  function goBack() {
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  }

  function goToStep(targetStep) {
    setStep(targetStep);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (step === 1) {
      goNext();
      return;
    }

    if (step === 2) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.storeSlug)) {
        return;
      }

      goNext();
      return;
    }

    if (!formData.acceptedTerms) {
      return;
    }

    console.log("Completed store onboarding:", {
      ...formData,
      logo: formData.logo?.name ?? null,
    });

    navigate("/s/ei344j3o3", { replace: true });
  }

  const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.storeSlug);

  return (
    <main className="onboarding-page">
      <Card className="onboarding-card">
        <header className="auth-header">
          <p className="brand-name">Shopke</p>

          <h1>
            {step === 1 && "Set up your business"}
            {step === 2 && "Make your store yours"}
            {step === 3 && "Review your details"}
          </h1>

          <p>
            {step === 1 && "Tell us a little about your business."}
            {step === 2 &&
              "Choose your store link and add a logo if you have one."}
            {step === 3 && "Check your information before opening your store."}
          </p>
        </header>

        <div className="onboarding-progress">
          <div className="progress-label">
            <span>Getting started</span>
            <span>Step {step} of 3</span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Onboarding progress"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={step}
          >
            <div
              className="progress-fill"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <Input
                id="businessName"
                name="businessName"
                label="Business name"
                placeholder="e.g. TeamC Fashion"
                value={formData.businessName}
                onChange={handleChange}
                autoComplete="organization"
                required
              />

              <div className="input-group">
                <label htmlFor="category">What do you sell?</label>

                <select
                  id="category"
                  name="category"
                  className="onboarding-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Fashion">Fashion and clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Beauty">Beauty and skincare</option>
                  <option value="Food">Food and groceries</option>
                  <option value="Home">Home and lifestyle</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <Input
                id="whatsapp"
                name="whatsapp"
                label="WhatsApp number"
                type="tel"
                placeholder="e.g. 08012345678"
                value={formData.whatsapp}
                onChange={handleChange}
                autoComplete="tel"
                required
              />

              <div className="onboarding-location">
                <Input
                  id="city"
                  name="city"
                  label="City"
                  placeholder="e.g. Ikeja"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                />

                <Input
                  id="state"
                  name="state"
                  label="State"
                  placeholder="e.g. Lagos"
                  value={formData.state}
                  onChange={handleChange}
                  autoComplete="address-level1"
                  required
                />
              </div>

              <Button type="submit" className="auth-submit">
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="onboarding-step-heading">
                <h2>Your store link</h2>
                <p>Your customers can use this link to find your products.</p>
              </div>

              <div className="input-group">
                <label htmlFor="storeSlug">Store URL</label>

                <div className="store-link-field">
                  <span>shopke.com/</span>

                  <input
                    id="storeSlug"
                    name="storeSlug"
                    type="text"
                    value={formData.storeSlug}
                    onChange={handleChange}
                    placeholder="your-store"
                    pattern="[a-z0-9]+(-[a-z0-9]+)*"
                    title="Use lowercase letters and numbers, with single hyphens between words."
                    autoComplete="off"
                    aria-describedby="slug-help"
                    required
                  />
                </div>

                <p id="slug-help" className="field-hint">
                  Use lowercase letters, numbers, and hyphens.
                </p>

                {formData.storeSlug && validSlug && (
                  <p className="slug-success" role="status">
                    Your store link looks good.
                  </p>
                )}

                {formData.storeSlug && !validSlug && (
                  <p className="input__error" role="alert">
                    Use lowercase letters and numbers, separated by single
                    hyphens.
                  </p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="logo">Store logo (optional)</label>

                <input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  className="logo-input"
                  onChange={handleLogoChange}
                />

                <p className="field-hint">
                  {formData.logo
                    ? `Selected: ${formData.logo.name}`
                    : "Choose an image from your device, or skip this step."}
                </p>
              </div>

              <div className="onboarding-actions">
                <Button variant="secondary" onClick={goBack}>
                  Back
                </Button>

                <Button type="submit" className="auth-submit">
                  Review details
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="onboarding-step-heading">
                <h2>Your business summary</h2>
                <p>Everything look right? You can edit any section.</p>
              </div>

              <div className="review-list">
                <div className="review-item">
                  <div className="review-item-content">
                    <span className="review-label">Business name</span>
                    <p>{formData.businessName}</p>
                  </div>

                  <button
                    type="button"
                    className="review-edit"
                    onClick={() => goToStep(1)}
                  >
                    Edit
                  </button>
                </div>

                <div className="review-item">
                  <div className="review-item-content">
                    <span className="review-label">Product category</span>
                    <p>{formData.category}</p>
                  </div>

                  <button
                    type="button"
                    className="review-edit"
                    onClick={() => goToStep(1)}
                  >
                    Edit
                  </button>
                </div>

                <div className="review-item">
                  <div className="review-item-content">
                    <span className="review-label">WhatsApp number</span>
                    <p>{formData.whatsapp}</p>
                  </div>

                  <button
                    type="button"
                    className="review-edit"
                    onClick={() => goToStep(1)}
                  >
                    Edit
                  </button>
                </div>

                <div className="review-item">
                  <div className="review-item-content">
                    <span className="review-label">Business location</span>
                    <p>
                      {formData.city}, {formData.state}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="review-edit"
                    onClick={() => goToStep(1)}
                  >
                    Edit
                  </button>
                </div>

                <div className="review-item">
                  <div className="review-item-content">
                    <span className="review-label">Store link</span>
                    <p>shopke.com/{formData.storeSlug}</p>
                  </div>

                  <button
                    type="button"
                    className="review-edit"
                    onClick={() => goToStep(2)}
                  >
                    Edit
                  </button>
                </div>

                <div className="review-item">
                  <div className="review-item-content">
                    <span className="review-label">Store logo</span>
                    <p>{formData.logo?.name || "No logo selected"}</p>
                  </div>

                  <button
                    type="button"
                    className="review-edit"
                    onClick={() => goToStep(2)}
                  >
                    Edit
                  </button>
                </div>
              </div>

              <label className="terms-label">
                <input
                  type="checkbox"
                  checked={formData.acceptedTerms}
                  onChange={(event) =>
                    setFormData((previousData) => ({
                      ...previousData,
                      acceptedTerms: event.target.checked,
                    }))
                  }
                  required
                />

                <span>I agree to the terms and conditions.</span>
              </label>

              <div className="onboarding-actions">
                <Button variant="secondary" onClick={goBack}>
                  Back
                </Button>

                <Button
                  type="submit"
                  className="auth-submit"
                  disabled={!formData.acceptedTerms}
                >
                  Open my dashboard
                </Button>
              </div>
            </>
          )}
        </form>
      </Card>
    </main>
  );
}

export default Onboarding;
