import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export default function YearSelector() {
    const { control } = useFormContext(); // register追加

    const yearOptions = [
        {
            value: "2023",
            label: "2023年度",
        },
        {
            value: "2022",
            label: "2022年度",
        },
        {
            value: "2021",
            label: "2021年度",
        },
        {
            value: "2020",
            label: "2020年度",
        },
        {
            value: "2019",
            label: "2019年度",
        },
        {
            value: "2018",
            label: "2018年度",
        },
    ];
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                <b>何年度</b>に受講しましたか?
            </p>
            <Controller
                name="year"
                control={control}
                rules={{ required: "受講年度を選択してください" }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            className="w-2/3 py-5 text-sm"
                            options={yearOptions}
                            value={
                                yearOptions.find(
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
