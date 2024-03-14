import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export default function ManzokudoSelector() {
    const { control } = useFormContext();
    const manzokudoOptions = [
        { value: "5", label: "★5" },
        {
            value: "4",
            label: "★4",
        },
        { value: "3", label: "★3" },
        { value: "2", label: "★2" },
        { value: "1", label: "★1" },
    ];

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                <b>満足度</b>(授業の充実度)を教えてください。
            </p>
            <Controller
                name="manzokudo"
                control={control}
                rules={{ required: "満足度を選択してください" }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            className="w-2/3 py-5 text-sm"
                            options={manzokudoOptions}
                            value={
                                manzokudoOptions.find(
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
