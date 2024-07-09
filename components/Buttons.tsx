"use client"

import { useFormStatus } from "react-dom";
import clsx from "clsx";
import Link from "next/link";


export const SubmitButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();

    return (
        <button
            className={clsx("bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-md hover:bg-blue-600",
                {
                    "opacity-50 cursor-progress": pending,
                }
            )}
            type="submit"
            disabled={pending}
        >
            {label === "upload" ? (
            <>{pending ? "Uploading..." : "UPLOAD"}</>
            ) : (
            <>{pending ? "Updating..." : "UPDATE"}</>
            )}
        </button>
    )
};