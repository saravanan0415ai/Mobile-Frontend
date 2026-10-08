import { NextResponse } from "next/server";

const SPRING_BOOT_URL = "http://localhost:8080/api/users";

// GET → fetch users from Spring Boot backend
export async function GET() {
  try {
    const res = await fetch(SPRING_BOOT_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching users from backend:", error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}

// POST → add user to Spring Boot backend
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await fetch(SPRING_BOOT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 409) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    if (!res.ok) {
      throw new Error(`Failed to create user: ${res.status}`);
    }

    return NextResponse.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Error creating user in backend:", err);
    return NextResponse.json(
      { message: "Error saving user" },
      { status: 500 }
    );
  }
}