import { useFormContext } from "react-hook-form";

export default function CommentInput() {
    const { register } = useFormContext();
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-sm">
                その他、伝えたいことがあれば教えてください。
            </p>
            <div className="py-5 flex items-center justify-center">
                <textarea {...register("comment")} />
            </div>
        </div>
    );
}
