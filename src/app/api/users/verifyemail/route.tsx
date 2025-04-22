import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        const currentTime = new Date(); 

        // Ensure the token is valid and has not expired
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: currentTime } // Token is valid if expiry is greater than current time
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Update the user's verification status
        user.isverified = true;
        user.verifyToken = undefined; // Clear the token
        user.verifyTokenExpiry = undefined; // Clear the token expiry date
        await user.save();

        return NextResponse.json({ message: "Email verified successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
