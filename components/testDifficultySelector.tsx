import test from "node:test";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export default function TestDifficultySelector() {
    const { control } = useFormContext();
    const testDifficultyOptions = [
        { value: "難しい", label: "難しい" },
        { value: "普通", label: "普通" },
        { value: "簡単", label: "簡単" },
        { value: "なし", label: "なし" },
    ];

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                <b>テストの難易度</b>を教えてください。
            </p>
            <Controller
                name="testDifficulty"
                control={control}
                rules={{ required: "テストの難易度を選択してください" }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            className="w-2/3 py-5 text-sm"
                            options={testDifficultyOptions}
                            value={
                                testDifficultyOptions.find(
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
