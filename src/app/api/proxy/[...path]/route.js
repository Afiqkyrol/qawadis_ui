// src/app/api/proxy/[...path]/route.js

export async function GET(req) {
  try {
    // Get the Authorization header
    const authHeader = req.headers.get("authorization");

    // Extract the path after /api/proxy/
    const path = req.url.split("/api/proxy/")[1].split("?")[0];

    // Build backend URL with query params
    const url = new URL(`${process.env.BASE_API_URL}/${path}`);
    const reqUrl = new URL(req.url, "http://localhost"); // dummy base for parsing
    reqUrl.searchParams.forEach((value, key) => {
      if (key !== "path") url.searchParams.append(key, value);
    });

    // Forward the GET request to backend
    const backendRes = await fetch(url.toString(), {
      method: "GET",
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const data = await backendRes.json();
    return new Response(JSON.stringify(data), { status: backendRes.status });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message || "Proxy error" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const body = await req.json();

    const path = req.url.split("/api/proxy/")[1].split("?")[0];
    const url = new URL(`${process.env.BASE_API_URL}/${path}`);

    const backendRes = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return new Response(JSON.stringify(data), { status: backendRes.status });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message || "Proxy error" }),
      {
        status: 500,
      }
    );
  }
}
