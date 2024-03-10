"use client";

import { Controller } from "react-hook-form";
import { useEffect, useState, Suspense } from "react";
import Select from "react-select";

export default function FacultySelector({
    control,
    setFacultyId,
}: {
    control: any;
    setFacultyId: any;
}) {
    const [facultyData, setFacultyData] = useState<any[]>([]);
    useEffect(() => {
        const fetchSheet = async () => {
            const response = await fetch("/api/getFaculty");
            if (!response.ok) {
                console.error("Failed to fetch class data");
                return;
            }
            const json_data = await response.json();

            if (!Array.isArray(json_data.data)) {
                console.error("Class data is not an array");
                return;
            }
            setFacultyData(json_data.data);
        };
        fetchSheet();
    }, []);

    return (
        <div className="flex flex-col items-center text-sm">
            <p>
                授業に対応する<b>学部・学科</b>を選んでください
            </p>
            {facultyData.length === 0 ? (
                <span className="loading loading-dots loading-md"></span>
            ) : (
                <Controller
                    name="id"
                    control={control}
                    render={({ field }) => (
                        <Select
                            className="w-2/3 py-5 text-sm"
                            options={
                                facultyData as {
                                    value: string;
                                    label: string;
                                }[]
                            } // Provide the correct type for classData
                            value={facultyData.find(
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
                                    setFacultyId(newValue.value);
                                }
                            }}
                        />
                    )}
                />
            )}
        </div>
    );
}
