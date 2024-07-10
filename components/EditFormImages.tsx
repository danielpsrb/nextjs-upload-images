"use client"

import React from 'react';
import { updateImage } from '@/libs/api-service';
import { useFormState } from 'react-dom';
import { SubmitButton } from './Buttons';
import type { Images } from '@prisma/client';

const EditFormImages = ({ data }: { data: Images }) => {

    const [state, formAction] = useFormState(
        updateImage.bind(null, data.id),
        null
    )

    return (
        <form action={formAction}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={data.title}
                    className="input input-bordered w-full bg-gray-200 text-gray-800"
                    placeholder="Title"
                />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="image_url" className="block text-gray-700 text-sm font-medoum mb-2">Image</label>
                <input
                    type="file"
                    id="image_url"
                    name="image_url"
                    className="file-input file-input-bordered file-input-accent w-full bg-gray-200 text-black"
                />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.image_url}</p>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Description</label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={data.description || ""}
                    className="textarea textarea-bordered w-full bg-gray-200 text-gray-800"
                    placeholder="Description"
                />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.description}</p>
                </div>
            </div>
            <SubmitButton label="update" />
        </form>
    )
}

export default EditFormImages