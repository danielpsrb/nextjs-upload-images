"use server"

import { z } from "zod"
import { put, del } from "@vercel/blob"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { getImagesDataById } from "./data";

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
        return { message: "Failed to create data images" };
    }
    revalidatePath("/");
    redirect("/");
}

const EditSchema = z.object({
    title: z.string().min(3),
    image_url: z
        .instanceof(File)
        .refine((file) => file.size === 0 || file.type.startsWith('image/'), { message: 'Only File images are allowed'})
        .refine((file) => file.size < 5000000, { message: 'Image size should be less than 5MB'})
        .optional(),
    description: z.string().min(7),
})

export const updateImage = async (id: string, prevState: unknown, formData: FormData) => {
    const validateFields = EditSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors,
            status: 400
        };
    }

    const data = await getImagesDataById(id);
    if (!data) {
        return { message: "Data Images Not Found" };
    }

    const { title, image_url, description } = validateFields.data;
    let imagePath;
    let size;
    if (!image_url || image_url.size === 0) {
        imagePath = data.image_url;
        size = data.size;
    } else {
        await del(data.image_url);
        const { url } = await put(image_url.name, image_url, {
            access: "public",
            multipart: true,
        });
        imagePath = url;
        size = image_url.size;
    }

    try {
        await prisma.images.update({
            data: {
                title,
                image_url: imagePath,
                description,
                size,
            },
            where: { id },
        })
    } catch (error) {
        return { message: "Failed to update images data" };
    }

    revalidatePath("/");
    redirect("/");
};

export const deleteImage = async (id: string) => {
    const data = await getImagesDataById(id);
    if (!data) {
        return { message: "Data Images Not Found" };
    }
    await del(data.image_url);

    try {
        await prisma.images.delete({
            where: { id },
        });
    } catch (error) {
        return { message: "Failed to delete images data" };
    }

    revalidatePath("/");
}