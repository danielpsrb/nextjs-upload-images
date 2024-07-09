import { prisma } from "./prisma";


export const getImagesData = async () => {
    try {
        const resultImages = await prisma.images.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return resultImages;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

export const getImagesDataById = async (id: string) => {
    try {
        const resultImages = await prisma.images.findUnique({
            where: {
                id: id,
            },
        });
        return resultImages;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}