import Image from "next/image";
import type { Images } from "@prisma/client";

const Cards = ({ data }: { data: Images }) => {
    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure className="px-2 pt-2">
                <Image
                    src={data.image_url}
                    alt={data.title}
                    width={900}
                    height={900}
                    className="rounded-lg"
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{data.title}</h2>
                <p>{data.description}</p>
            </div>
        </div>
    );
}

export default Cards;