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
