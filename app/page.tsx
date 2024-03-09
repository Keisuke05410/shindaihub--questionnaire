import Link from "next/link";

export default function Home() {
    return (
        <div className="container mx-auto px-5 py-5">
            <div className="flex flex-col items-center">
                <div className="py-5">
                    <h1 className="text-2xl font-bold">
                        神大生 授業アンケート
                    </h1>
                    <p>presented by A4</p>
                </div>
                <div className="py-5">
                    <p>
                        アンケートに答えていただく前に以下の
                        <br />
                        利用規約・プライバシーポリシーに同意してください
                    </p>
                    <div className="flex py-5 justify-center">
                        <Link
                            href={
                                "https://drive.google.com/file/d/1fEUcI-NQil1k-4LZ1sRw1A1X78Nivyh0/view?usp=drive_link"
                            }
                            className="text-bluenormal underline"
                            target="_blank"
                        >
                            利用規約
                        </Link>
                        <p>・</p>
                        <Link
                            href={
                                "https://drive.google.com/file/d/16yOmLKI4T11nIc5Hy_0IXmyj1BvHeceZ/view?usp=drive_link"
                            }
                            className="text-bluenormal underline"
                            target="_blank"
                        >
                            プライバシーポリシー
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={"/question"}
                            className="btn btn-primary text-blackcustum"
                        >
                            同意してアンケートを開始
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
