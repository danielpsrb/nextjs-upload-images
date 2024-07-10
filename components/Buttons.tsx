"use client"

import { useFormStatus } from "react-dom";
import clsx from "clsx";
import Link from "next/link";
import Swal from "sweetalert2";
import { deleteImage } from "@/libs/api-service";

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

export const EditButton = ({ id }: { id: string }) => {
    return (
        <Link href={`/edit/${id}`} className="py-3 text-sm bg-blue-500 rounded-bl-md w-full hover:bg-blue-700 text-center">
            Edit
        </Link>
    );
};

export const DeleteButton = ({ id }: { id: string }) => {
    const handleDelete = async () => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Delete Images cannot be recovered!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (isConfirmed) {
            try {
                await deleteImage(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                
                })
            } catch (error) {
                Swal.fire({
                    title: "Failed!",
                    text: "Failed to delete file.",
                    icon: "error",
                    showConfirmButton: true,
                });
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="py-3 text-sm bg-red-500 rounded-br-md w-full hover:bg-red-700 text-center"
        >
            Delete
        </button>
    );
};