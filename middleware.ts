import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function middleware(req: NextRequest) {
    const start = Date.now();
    const response = NextResponse.next();
    const end = Date.now();
    const requestTime = `${end - start}ms`;
    const headersList = headers();
    const ip = headersList.get("x-forwarded-for");

    const values = [
        new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
        req.method,
        req.url,
        ip,
        requestTime,
    ];

    try {
        const sheetsResponse = await fetch(
            process.env.ROOT_URL + "/api/postLog",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ values: [values] }),
            }
        );

        if (!sheetsResponse.ok) {
            throw new Error(
                `Failed to append data to Google Sheets: ${sheetsResponse.statusText}`
            );
        }
    } catch (error) {
        console.error("Error appending data to Google Sheets:", error);
    }

    return response;
}
