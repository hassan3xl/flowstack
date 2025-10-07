// Reset Password Page
const ResetPasswordPage = ({ onPageChange }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = passwordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPageChange("password-success");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      <HeroSection
        title="Create New Password"
        subtitle="Choose a strong password to keep your account secure"
        image={<Lock size={80} className="text-white/80" />}
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600">Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputField
                icon={Lock}
                type="password"
                placeholder="New password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-2 w-full rounded ${
                          i < strength ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Password strength:{" "}
                    {["Weak", "Fair", "Good", "Strong"][strength - 1] ||
                      "Too weak"}
                  </p>
                </div>
              )}
            </div>

            <InputField
              icon={Lock}
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              error={
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword
                  ? "Passwords don't match"
                  : ""
              }
              required
            />

            <Button
              type="submit"
              loading={loading}
              icon={CheckCircle}
              className="w-full"
              disabled={
                !formData.password ||
                formData.password !== formData.confirmPassword
              }
            >
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
