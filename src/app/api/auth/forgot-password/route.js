export async function POST(req) {
  try {
    const body = await req.json();
    const email = body?.email;
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // TODO: integrate with backend service / send email
    // For now return generic success message (do not reveal account existence)
    return new Response(
      JSON.stringify({
        success: true,
        message:
          "If an account exists, we sent reset instructions to your email.",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || "Failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
