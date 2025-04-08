"use client"

import Link from "next/link";
import { Details } from "../lib/types";
import { useThemeContext } from "../ThemeContext";
import * as motion from "motion/react-client"



const Card = ({data}:Details) => {

    const details = data.attributes
    const id = data.id
    const {darkmode} = useThemeContext()

    

    return ( 
        <>
        <div className="card flex justify-between gap-4 h-full">
            <Link href={`/details/${id}`}>
            <div className="img-container h-full overflow-hidden hover:opacity-60 flex-shrink-0 w-[150px]">
                <motion.img 
                className="object-cover w-full h-full" 
                src={details.posterImage?.small || "https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png"} 
                alt="poster image Unavailable"
                whileHover={{ scale: 1.2 }} 
                transition={{ duration: 0.5 }} 
                />
            </div>
            </Link>
            <div className="details text-xs flex flex-col gap-1 w-full">
                <Link href={`/details/${id}`}>
                    <div className={`anime-name text-base ${darkmode ? 'text-white/90':'text-black/60'}`}><strong>{details.titles?.en || details.slug}</strong></div>
                </Link>
                <div className="synopsis w-full mt-2 text-gray-500">
                        {details.synopsis
                            ? details.synopsis.length >= 100
                                ? details.synopsis.substring(0, 100) + '...'
                            : details.synopsis
                        : 'No synopsis available'
                        }
                </div>
                <div className="rating text-gray-500"><strong>Rating: {details.averageRating}%</strong></div>
                <div className="episode-count text-gray-500"><strong>episodes: </strong>{details.episodeCount}</div>
                <div className="showtype text-gray-500"><strong>{details.showType}</strong></div>
                <div className="stats text-gray-400">{details.status}</div>
            </div>
        </div>
        </>
     );
}
 
export default Card;