import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/lib/model/User";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest) {
  await dbConnect();

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    let userId: string | undefined;
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded
    ) {
      userId = (decoded as JwtPayload).userId as string;
    } else {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 200 });
    }
    // console.log(user);
    return NextResponse.json(
      { message: "Users retrieved", success: true, user },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error check logs" });
  }
}

export async function PATCH(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  try {
     const authHeader = req.headers.get("authorization");
     const token = authHeader?.split(" ")[1]; // "Bearer <token>"

     if (!token) {
       return NextResponse.json(
         { message: "No token provided" },
         { status: 401 }
       );
     }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    let userId: string | undefined;
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded
    ) {
      userId = (decoded as JwtPayload).userId as string;
    } else {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 401 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { username: body.newUsername, lastUsernameChange: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, updatedUser }, { status: 200 });
  } catch (err) {
    console.log("error: " + err);
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
