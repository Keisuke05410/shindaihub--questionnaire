"use client";

import AttendanceSelector from "@/components/attendanceSelector";
import ClassSelector from "@/components/classSelector";
import CommentInput from "@/components/commentInput";
import FacultySelector from "@/components/facultySelector";
import Jujitsu from "@/components/manzokudoSelector";
import RakutenSelector from "@/components/rakutanSelector";
import ShowResult from "@/components/showResult";
import TaskAmountSelector from "@/components/taskAmountSelector";
import TaskDifficultySelector from "@/components/taskDifficultySelector";
import TestDifficultySelector from "@/components/testDifficultySelector";
import YearSelector from "@/components/yearSelector";
import { time } from "console";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

export default function Question() {
    const [facultyId, setFacultyId] = useState<string>("");
    const [classData, setClassData] = useState<any[]>([]);
    const [apiStatus, setApiStatus] = useState<number | null>(null);
    const methods = useForm();
    const onSubmit = async (data: any) => {
        console.log(data);

        // async request which may result error
        try {
            const response = await fetch("/api/postData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            setApiStatus(result.status);
            window.scrollTo({ top: 0, behavior: "smooth" });
            methods.reset();

            setTimeout(() => {
                setApiStatus(null);
            }, 3000);
        } catch (e) {
            console.log(e);
            setApiStatus(500);
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="container mx-auto px-5 py-5">
                <div className="flex flex-col items-center">
                    <ShowResult apiStatus={apiStatus} />
                    <div className="py-5">
                        <h1 className="text-2xl font-bold">
                            神大生 授業アンケート
                        </h1>
                        <p>presented by A4</p>
                    </div>
                    <form
                        className="flex flex-col items-center"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <FacultySelector setFacultyId={setFacultyId} />
                        <div className="divider"></div>
                        {!facultyId ? null : (
                            <>
                                <ClassSelector facultyId={facultyId} />
                                <div className="divider"></div>
                                <YearSelector />
                                <div className="divider"></div>
                                <RakutenSelector />
                                <div className="divider"></div>
                                <Jujitsu />
                                <div className="divider"></div>
                                <TaskAmountSelector />
                                <div className="divider"></div>
                                <TaskDifficultySelector />
                                <div className="divider"></div>
                                <TestDifficultySelector />
                                <div className="divider"></div>
                                <AttendanceSelector />
                                <div className="divider"></div>
                                <CommentInput />
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    送信
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </FormProvider>
    );
}
