import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export default function TaskAmountSelector() {
    const { control } = useFormContext();
    const taskAmountOptions = [
        { value: "多い", label: "多い" },
        { value: "普通", label: "普通" },
        { value: "少ない", label: "少ない" },
        { value: "なし", label: "なし" },
    ];

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                <b>課題の量</b>を教えてください。
            </p>
            <Controller
                name="taskAmount"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            className="w-2/3 py-5 text-sm"
                            options={taskAmountOptions}
                            value={
                                taskAmountOptions.find(
                                    (option) => option.value === field.value
                                ) || null
                            }
                            onChange={(option) =>
                                field.onChange(option?.value || "")
                            }
                        />
                        {error && (
                            <p className="text-error p-2">{error.message}</p>
                        )}
                    </>
                )}
            />
        </div>
    );
}
