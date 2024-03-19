import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json();
    // console.log(data);

    try {
        // Google Sheets APIの認証
        const auth = new google.auth.JWT(
            process.env.GCP_SERVICEACCOUNT_EMAIL,
            undefined,
            (process.env.GCP_SERVICEACCOUNT_PRIVATE_KEY || "").replace(
                /\\n/g,
                "\n"
            ),
            ["https://www.googleapis.com/auth/spreadsheets"]
        );

        const sheets = google.sheets({ version: "v4", auth });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_LOG,
            range: "シート1",
            valueInputOption: "USER_ENTERED",
            requestBody: data,
        });

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log("Error appending data to Google Sheets:", error);

        return NextResponse.json({ status: 500 });
    }
}
