import UploadForm from "@/components/UploadForm";

const UploadPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white rounded-sm shadow p-8">
                <h1 className="text-2xl font-bold mb-5 text-center">UPLOAD YOUR IMAGES</h1>
                <UploadForm />
            </div>
        </div>
    )
}

export default UploadPage;