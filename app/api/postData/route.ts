import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // データに現在の日時とユーザーIDを追加
        data["timestamp"] = new Date().toLocaleString();
        data["userId"] = "0"; // ログインなどの実装するときには、ここで実際のユーザーIDを設定する
        data["evalutationId"] = crypto.randomUUID();

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

        // 追加するデータの値の配列を作成
        const values = [
            data.evalutationId,
            data.userId,
            data.timestamp,
            data.courseId,
            data.year,
            data.manzokudo,
            data.rakutando,
            data.taskAmount,
            data.taskDifficulty,
            data.testDifficulty,
            data.attendance,
            data.comment,
        ];

        const valueRange = { values: [values] };
        const range = "口コミ_テスト";

        // データをスプレッドシートに追加
        const response = await sheets.spreadsheets.values.append({
            range,
            spreadsheetId: (process.env.SPREADSHEET_SYLLABUS_ID =
                "1d8x4rcJUN-vJWZZeHI1qVdXB6jTfdSN2aVAgVahBq2E"),
            valueInputOption: "USER_ENTERED",
            requestBody: valueRange,
        });

        return NextResponse.json({ status: 200 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ status: 500, error: err.message });
    }
}
