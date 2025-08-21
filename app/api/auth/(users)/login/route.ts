import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import bcrypt from "bcrypt";
import { UserDetails } from "@/app/lib/types";
import jwt from "jsonwebtoken";
import User from "@/app/lib/model/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { email, password } = body;

  try {
    const user = await User.findOne<UserDetails>({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found, If you dont have an account you can register" }, { status: 400 });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", success: true, token, user: user },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "uncaught error check logs" },{status:500});
  }
}
