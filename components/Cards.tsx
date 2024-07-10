import Image from "next/image";
import { EditButton, DeleteButton } from "./Buttons";
import type { Images } from "@prisma/client";

const Cards = ({ data }: { data: Images }) => {
    return (
        <div className="max-w-sm border border-[#7FFF00] rounded-md shadow">
            <figure className="relative aspect-video">
                <Image
                    src={data.image_url}
                    alt={data.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-t-md object-cover"
                />
            </figure>
            <div className="p-5">
                <h2 className="card-title">{data.title}</h2>
                <p>{data.description}</p>
            </div>

            <div className="flex items-center justify-between">
                <EditButton id={data.id} />
                <DeleteButton id={data.id} />
            </div>
        </div>
    );
}

export default Cards;