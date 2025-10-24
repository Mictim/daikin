import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export const GET = async (req: Request) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ id: session.user.id, role: session.user.role });
}