import { getUserDetailsById, isSuperAdmin } from "@/app/actions";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const superAdmin = await isSuperAdmin();
    if (!superAdmin) {
      return NextResponse.json(
        { message: "You are not Super Admin to perform this action" },
        { status: 401 }
      );
    }

    const userDetails = await getUserDetailsById(userId);

    if (!userDetails) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (userDetails.isSuperAdmin) {
      return NextResponse.json(
        { message: "Cannot change Super Admin status" },
        { status: 400 }
      );
    }

    await db.user.update({
      where: { id: userId },
      data: { isAdmin: !userDetails.isAdmin },
    });

    return NextResponse.json(
      {
        message: `User ${
          userDetails.isAdmin ? "removed from" : "added to"
        } admin`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
