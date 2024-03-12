import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export default function TaskDifficultySelector() {
    const { control } = useFormContext();
    const taskDifficultyOptions = [
        { value: "難しい", label: "難しい" },
        { value: "普通", label: "普通" },
        { value: "簡単", label: "簡単" },
        { value: "なし", label: "なし" },
    ];

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                <b>課題の難易度</b>を教えてください。
            </p>
            <Controller
                name="taskDifficulty"
                control={control}
                rules={{ required: "課題の難易度を選択してください" }}
                render={({ field, fieldState: { error } }) => (
                    <div className="flex flex-col w-full items-center justify-center">
                        <Select
                            className="w-2/3 py-5 text-sm"
                            options={taskDifficultyOptions}
                            value={
                                taskDifficultyOptions.find(
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
                    </div>
                )}
            />
        </div>
    );
}
