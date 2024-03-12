import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
    try {
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

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_SYLLABUS_ID,
            range: "アンケート用_学部id",
        });

        const rows = response.data.values;
        if (!rows) {
            return (
                NextResponse.json({ data: [] }),
                {
                    status: 200,
                }
            );
        }

        const data = rows.slice(1).map((row) => ({
            value: row[0],
            label: row[1],
        }));

        return NextResponse.json(
            { data: data },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Unable to access the spreadsheet" },
            {
                status: 500,
            }
        );
    }
}
