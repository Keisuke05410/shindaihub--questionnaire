"use client";

import ClassSelector from "@/components/classSelector";
import FacultySelector from "@/components/facultySelector";
import { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export default function Question() {
    const [facultyId, setFacultyId] = useState<string>("");
    const [classData, setClassData] = useState<any[]>([]);
    const { register, control, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        // フォーム送信時のロジックをここに書く
        console.log(data);
    };

    return (
        <div className="container mx-auto px-5 py-5">
            <div className="flex flex-col items-center">
                <div className="py-5">
                    <h1 className="text-2xl font-bold">
                        神大生 授業アンケート
                    </h1>
                    <p>presented by A4</p>
                </div>
                <form
                    className="flex flex-col items-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FacultySelector
                        control={control}
                        setFacultyId={setFacultyId}
                    />
                    {!facultyId ? null : (
                        <>
                            <ClassSelector
                                control={control}
                                facultyId={facultyId}
                            />

                            <button type="submit" className="mt-4">
                                送信
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
