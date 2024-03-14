"use client";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function ClassSelector({ facultyId }: { facultyId: string }) {
    const [classData, setClassData] = useState<any[]>([]);
    const [dataIsEmpty, setDataIsEmpty] = useState<boolean>(false);
    const { control } = useFormContext();

    useEffect(() => {
        async function fetchSheet() {
            setDataIsEmpty(false);
            setClassData([]);
            const response = await fetch(
                `/api/getClass?facultyId=${facultyId}`
            );
            if (!response.ok) {
                console.error("Failed to fetch class data");
                setDataIsEmpty(true);
                return;
            }
            const jsonData = await response.json();
            if (!Array.isArray(jsonData.data) || jsonData.data.length === 0) {
                setDataIsEmpty(true);
                return;
            }
            setClassData(jsonData.data); // 例として id と name を使用
        }

        fetchSheet();
    }, [facultyId]);

    return (
        <div className="flex flex-col items-center w-full text-sm">
            <p>
                <b>授業</b>を選んでください
            </p>
            <p>目的の授業が出ない場合は</p>
            <p>学部・学科を変えてみてください。</p>
            {/* UIメッセージ */}
            {dataIsEmpty ? (
                <div className="py-2">
                    <div className="alert alert-warning flex items-center justify-center py-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span>対応する授業がありません</span>
                    </div>
                </div>
            ) : classData.length === 0 ? (
                <div className="py-2">
                    <span className="loading loading-dots loading-md"></span>
                </div>
            ) : (
                <Controller
                    name="courseId"
                    control={control}
                    rules={{ required: "授業を選択してください" }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Select
                                className="w-2/3 py-5 text-sm"
                                placeholder="入力してください。"
                                options={classData}
                                value={
                                    classData.find(
                                        (option) => option.value === field.value
                                    ) || ""
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : "")
                                }
                            />
                            {error && (
                                <p className="text-error p-2">
                                    {error.message}
                                </p>
                            )}
                        </>
                    )}
                />
            )}
        </div>
    );
}
