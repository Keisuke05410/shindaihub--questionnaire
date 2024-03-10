"use client";

import { Controller } from "react-hook-form";
import { useEffect, useState, Suspense } from "react";
import Select from "react-select";

export default function ClassSelector({
    control,
    facultyId,
}: {
    control: any;
    facultyId: string;
}) {
    const [classData, setClassData] = useState<any[]>([]);

    useEffect(() => {
        const fetchSheet = async () => {
            const response = await fetch(
                "/api/getClass?facultyId=" + facultyId
            );
            if (!response.ok) {
                console.error("Failed to fetch class data");
                return;
            }
            const json_data = await response.json();

            if (!Array.isArray(json_data.data)) {
                console.error("Class data is not an array");
                return;
            }
            setClassData(json_data.data);
        };
        fetchSheet();
    }, [facultyId]);

    return (
        <div className="flex flex-col items-center w-full text-sm">
            <p>
                <b>授業</b>を選んでください
            </p>
            <p>目的の授業が出ない場合は</p>
            <p>学部・学科を変えてみてください。</p>
            {classData.length === 0 ? (
                <span className="loading loading-dots loading-md"></span>
            ) : (
                <Controller
                    name="id"
                    control={control}
                    render={({ field }) => (
                        <Select
                            className="w-2/3 py-5 text-sm"
                            options={
                                classData as {
                                    value: string;
                                    label: string;
                                }[]
                            } // Provide the correct type for classData
                            value={classData.find(
                                (x: { value: string; label: string }) =>
                                    x.value === field.value
                            )}
                            onChange={(
                                newValue: {
                                    value: string;
                                    label: string;
                                } | null
                            ) => {
                                if (newValue) {
                                    // setFacultyId(newValue.value);
                                }
                            }}
                        />
                    )}
                />
            )}
        </div>
    );
}
