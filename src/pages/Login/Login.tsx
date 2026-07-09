const handleLogin = async () => {
  setError("");

  try {
    setLoading(true);

    const user = await login(email, password);

    // Admin
    if (user.departmentCode === null) {
      navigate("/dashboard");
    }
    // Front Office
    else if (user.departmentCode === "FRONT") {
      navigate("/customers");
    }
    // Other Agents
    else {
      navigate("/my-tickets");
    }
  } catch {
    setError("Invalid email or password.");
  } finally {
    setLoading(false);
  }
};