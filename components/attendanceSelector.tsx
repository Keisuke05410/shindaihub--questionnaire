import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export default function AttendanceSelector() {
    const { control } = useFormContext();

    const attendanceOptions = [
        { value: "毎回", label: "毎回" },
        { value: "たまに", label: "たまに" },
        { value: "不定期", label: "不定期" },
        { value: "なし", label: "なし" },
    ];
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                <b>出席の有無</b>を教えてください。
            </p>
            <Controller
                name="attendance"
                control={control}
                rules={{ required: "出席の有無を選択してください" }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            className="w-2/3 py-5 text-sm"
                            options={attendanceOptions}
                            value={
                                attendanceOptions.find(
                                    (option) => option.value === field.value
                                ) || null
                            }
                            onChange={(option) =>
                                field.onChange(option?.value || "")
                            }
                        />
                        {error && (
                            <p className="text-error p-2">{error.message}</p>
                        )}{" "}
                    </>
                )}
            />
        </div>
    );
}
