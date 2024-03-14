import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export default function RakutandoSelector() {
    const { control } = useFormContext();
    const rakutandoSelector = [
        { value: "5", label: "★5" },
        { value: "4", label: "★4" },
        { value: "3", label: "★3" },
        { value: "2", label: "★2" },
        { value: "1", label: "★1" },
    ];

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                <b>楽単度</b>(単位取得の容易さ)を教えてください。
            </p>
            <Controller
                name="rakutando"
                control={control}
                rules={{ required: "楽単度を選択してください" }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            className="w-2/3 py-5 text-sm"
                            options={rakutandoSelector}
                            value={
                                rakutandoSelector.find(
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
