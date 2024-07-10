import EditFormImages from "@/components/EditFormImages";
import { getImagesDataById } from "@/libs/data";

const EditImagePage = async ({ params }: { params: { id: string } }) => {

    const imageData = await getImagesDataById(params.id);
    if (!imageData) {
      return { notFound: true };
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white rounded-sm shadow p-8">
                <h1 className="text-2xl font-bold mb-5 text-center">UPDATE YOUR IMAGES</h1>
                <EditFormImages data={imageData} />
            </div>
        </div>
    );
}

export default EditImagePage;