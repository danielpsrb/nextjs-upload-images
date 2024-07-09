"use server"

import { z } from "zod"
import { put, del } from "@vercel/blob"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

const UploadSchema = z.object({
    title: z.string().min(3),
    image_url: z.instanceof(File)
    .refine((file) => file.size > 0, {message: 'Images is required and not empty'})
    .refine((file) => file.size === 0 || file.type.startsWith('image/'), { message: 'Only File images are allowed'})
    .refine((file) => file.size < 5000000, { message: 'Image size should be less than 5MB'}),
    description: z.string().min(7),
})

export const uploadedImage = async (prevState: unknown, formData: FormData) => {
    const validatedFields = UploadSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
            status: 400
        };
    }

    const { title, image_url, description } = validatedFields.data;
    const { url } = await put(image_url.name, image_url, {
        access: "public",
        multipart: true,
    });
    const size = image_url.size;

    try {
        await prisma.images.create({
            data: {
                title,
                image_url: url,
                description,
                size,
            }
        });
    } catch (error) {
        return { message: "Failed to create data" };
    }
    revalidatePath("/");
    redirect("/");
}