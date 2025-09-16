export async function sendForgotPassword(email) {
  if (!email) {
    return { success: false, message: "Email is required" };
  }
  try {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return { success: false, message: err.message || "Network error" };
  }
}
