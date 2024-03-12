import { useFormContext } from "react-hook-form";

export default function ManzokudoSelector() {
    const { register } = useFormContext();

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                <b>満足度</b> (内容が充実していたか)は何点ですか？
            </p>
            <div className="rating py-5">
                <input
                    type="radio"
                    value={1}
                    {...register("manzokudo", { required: true })}
                    className="mask mask-star"
                />
                <input
                    type="radio"
                    value={2}
                    {...register("manzokudo", { required: true })}
                    className="mask mask-star"
                />
                <input
                    type="radio"
                    value={3}
                    {...register("manzokudo", { required: true })}
                    className="mask mask-star"
                    defaultChecked // デフォルトで3が選択された状態になります
                />
                <input
                    type="radio"
                    value={4}
                    {...register("manzokudo", { required: true })}
                    className="mask mask-star"
                />
                <input
                    type="radio"
                    value={5}
                    {...register("manzokudo", { required: true })}
                    className="mask mask-star"
                />
            </div>
        </div>
    );
}
