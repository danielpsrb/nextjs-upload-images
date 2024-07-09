import Link from "next/link";
import { getImagesData } from "@/libs/data";
import Cards from "@/components/Cards";
import { FaPlus } from "react-icons/fa";


export default async function Home() {


  const images = await getImagesData();

  return (
    <div className="max-w-screen-lg mx-auto py-14">
      <div className="flex items-end justify-between">
        <h1 className="text-4xl font-bold">Latest Images</h1>
        <Link
          href="/upload"
          className="bg-blue-700 text-white py-2 px-6 rounded-md hover:bg-blue-600"
        >
          <FaPlus className="inline-block mr-2" />
          Add Image
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-8">
        {images.map((item) => (
          <Cards key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
