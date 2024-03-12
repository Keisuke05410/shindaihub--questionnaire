import { useFormContext } from "react-hook-form";

export default function RakutenSelector() {
    const { register } = useFormContext();
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                <b>楽単度</b>
                (楽に単位取得できるか)は何点ですか？
            </p>
            <div className="rating py-5">
                <input
                    type="radio"
                    value={1}
                    {...register("rakutando", {
                        required: true,
                    })}
                    className="mask mask-star"
                />
                <input
                    type="radio"
                    value={2}
                    {...register("rakutando", {
                        required: true,
                    })}
                    className="mask mask-star"
                />
                <input
                    type="radio"
                    value={3}
                    {...register("rakutando", {
                        required: true,
                    })}
                    className="mask mask-star"
                    defaultChecked
                />
                <input
                    type="radio"
                    value={4}
                    {...register("rakutando", {
                        required: true,
                    })}
                    className="mask mask-star"
                />
                <input
                    type="radio"
                    value={5}
                    {...register("rakutando", {
                        required: true,
                    })}
                    className="mask mask-star"
                />
            </div>
        </div>
    );
}
