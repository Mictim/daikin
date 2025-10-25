import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/db";
import { Role } from "@prisma/client";

// GET all services (Admin and Employee only)
export const GET = async (req: Request) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== Role.ADMIN && session.user.role !== Role.EMPLOYEE) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";

        const orders = await prisma.order.findMany({
            where: {
                AND: [
                    {
                        nextDateOfService: {
                            not: null,
                        },
                    },
                    search ? {
                        OR: [
                            { orderId: { contains: search, mode: "insensitive" } },
                            { customerEmail: { contains: search, mode: "insensitive" } },
                        ],
                    } : {},
                ],
            },
            include: {
                products: true,
            },
            orderBy: {
                nextDateOfService: 'asc',
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
};
