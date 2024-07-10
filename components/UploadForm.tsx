"use client"
import React from 'react'
import { useFormState } from 'react-dom';
import { SubmitButton } from './Buttons';
import { uploadedImage } from '@/libs/api-service';

const UploadForm = () => {

    const [state, formAction] = useFormState(uploadedImage, null);

    return (
        <form action={formAction}>
            {state?.message ? (
                <div
                className="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-50"
                role="alert"
                >
                <div className="font-medium">{state?.message}</div>
                </div>
            ) : null}
            <div className='mb-4 pt-2'>
                <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Title</label>
                <input 
                    type="text" 
                    id='title' 
                    name='title' 
                    className='input input-bordered w-full bg-gray-200 text-gray-800' 
                />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
                </div>
            </div>
            <div className='mb-4 pt-2'>
                <label htmlFor="file" className='block text-sm font-medium text-gray-700'>Image</label>
                <input 
                    type="file" 
                    name='image_url' 
                    className='file-input file-input-bordered file-input-primary w-full bg-gray-200 text-black'         
                />
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.image_url}</p>
                </div>
            </div>
            <div className='mb-4 pt-2'>
                <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                <textarea id='description' name='description' className='textarea textarea-bordered w-full bg-gray-200 text-gray-800'></textarea>
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.description}</p>
                </div>
            </div>
            <div className='mb-4 pt-4'>
                <SubmitButton label='upload' />
            </div>
        </form>
    )
}

export default UploadForm