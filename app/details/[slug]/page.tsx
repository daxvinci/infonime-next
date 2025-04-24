"use client"

import { useEffect,useState,use } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { DetailsData, InsideData, Ogdata, Data, DetailsProps} from "../../lib/types";
import { useThemeContext } from "../../ThemeContext"
import * as motion from "motion/react-client"
import type { Variants } from "motion/react"
// import { useParams } from 'next/navigation';
import Loading from "../../components/Loading";


const containerVariants : Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger children by 0.2 seconds
    },
  },
};

const imageVariants : Variants = {
  hidden: { y: 100, opacity: 0 }, // Start from the bottom
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1, // Image appears after 1 second
      duration: 0.5,
    },
  },
};

const detailsVariants: Variants = {
  hidden: { x: 100, opacity: 0 }, // Start from the right
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 1.3, // Details appear 0.3 seconds after the image
      staggerChildren: 0.2, // Stagger children by 0.2 seconds
    },
  },
};

// const childVariants: Variants = {
//   hidden: { x: 50, opacity: 0 }, // Start from the right
//   visible: { x: 0, opacity: 1 },
// };

const Details =  ({params}:{params: Promise<{ slug: string }>}) => {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL
    // const {id} = useParams()
    const {slug} =  use(params)

    const [details,setDetails] = useState<InsideData>()
    const [genres,setGenres] = useState<Data[]>([])
    const [linkData,setLinkData] = useState<Data[]>([])
    const [error,setError] = useState<object | string | undefined >()
    const {darkmode,loading,setLoading=()=>{}} = useThemeContext()
    
    //Fetching Details
    useEffect(()=>{
      setLoading(true)
      const animeFetch = async()=>{
        try{
          //fetching anime
          const response = await axios.get<DetailsData>( base_url + '/anime/' + slug,
            {
              headers:{
                'Content-Type':'application/vnd.api+json'
              }
            })
            const data = response.data.data
            //Fetching links
          const linkResponse = await axios.get<Ogdata>( base_url + '/anime/' + slug + '/streaming-links',
            {
              headers:{
                'Content-Type':'application/vnd.api+json'
              }
            })
          const linkData = linkResponse.data.data
          //Fetching genre
          const genreResponse = await axios.get<Ogdata>( base_url + '/anime/' + slug + '/genres',
            {
              headers:{
                'Content-Type':'application/vnd.api+json'
              }
            })
          const genreData = genreResponse.data.data
          setLinkData(linkData)
          setGenres(genreData)
          setDetails(data)
          // console.log(linkData)
        }
        catch(err){
          setError('something went wrong ')
          console.log(err)
        }
        finally{
          setLoading(false)
        }
      }
  
      animeFetch()
    },[base_url,slug,setLoading])


    if (loading) return <Loading/>;

    return (
        <>
        <div 
        className={`p-8 min-h-full flex-1 ${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}
        style={{
          backgroundImage: `url(${details?.attributes?.coverImage?.original || "https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        >
          {error ? (
              <div className="contain">{typeof error === 'object' ? 'object error' : error}</div>
                    ): details? (
                        
                        <motion.div 
                        className={`flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto backdrop-blur-xs bg-opacity-20 rounded-3xl ${darkmode ? 'bg-black/50 text-amber-50': 'bg-white/50 text-gray-700'}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        >
                            <motion.div className="flex-1" variants={imageVariants}>
                                <img
                                src={details?.attributes?.posterImage?.original}
                                alt={details?.attributes?.titles?.en || 'image not available'}
                                className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </motion.div>
                    
                      
                            <motion.div 
                            className={`flex-2 ${darkmode ? 'text-amber-50':'text-black'} space-y-4`} 
                            variants={detailsVariants}
                            initial="hidden"
                            animate="visible"
                            >
                                <h1 
                                className={`text-3xl ${darkmode ? 'text-amber-50':'text-black'} font-bold`}

                                >
                                  {details?.attributes?.slug}
                                </h1>
                                {/* <p className="text-gray-600 text-lg">{details?.id}</p> */}
                                <p 
                                className={`${darkmode ? 'text-gray-300 ':'text-black'} leading-relaxed`}

                                >
                                  {details?.attributes?.synopsis}
                                </p>
                                <div className="space-y-2"
                                >
                                <p

                                >
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Alt Names: </strong> 
                                    {
                                    Object.values(details?.attributes?.titles || {})
                                    .filter(title => title)
                                    .join(', ')}
                                </p>
                                <p

                                >
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Rating:</strong> {details?.attributes?.averageRating}
                                </p>
                                <p

                                >
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Episodes:</strong> {details?.attributes?.episodeCount}
                                </p>
                                <p

                                >
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Status:</strong> {details?.attributes?.status}
                                </p>
                                <div className='flex gap-3' >
                                    
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Genre: </strong>
                                    <div className='flex gap-2 flex-wrap'>
                                     {genres ? (
                                      genres.length === 0 ? (
                                        <span>N/A</span>
                                      ) : (
                                        genres.map((genre:Data) => 
                                        <Link key={genre.id} href={`/genreAnimes/${genre.attributes.slug}`}>
                                          <span 
                                          className={`${darkmode ? 'bg-gray-600':'bg-gray-400'} hover:bg-amber-500 px-2 rounded-2xl`} 
                                          >
                                            {genre.attributes.slug}
                                          </span>
                                        </Link> )
                                      )
                                    ) : (
                                      <span>Something wrong</span>
                                    )}
                                    </div>
                                </div>
                                <p

                                >
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Release Date:</strong> {details?.attributes?.startDate}
                                </p>
                                <p

                                >
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>End Date:</strong> {details?.attributes?.endDate || 'N/A'}
                                </p>
                                <p

                                >
                                    <strong className ={`${darkmode ? 'text-amber-50':'text-black/80'} font-bold`}>Links to stream:</strong>
                                </p>
                                <div className='flex flex-col gap-2'>
                                {linkData ? (
                                      linkData.length === 0 ? (
                                        <span>N/A</span>
                                      ) : (
                                        linkData.map((link) => 
                                        <Link className='text-blue-500' key={link.id} href={`${link?.attributes?.url}`}>
                                          {link?.attributes?.url}
                                        </Link> 
                                        )
                                      )
                                    ) : (
                                      <span>Something wrong</span>
                                    )}

                                </div>
                              
                                </div>
                            </motion.div>
                        </motion.div>
                    ):(
                        <div>nothing here</div>
                    )}
        </div>
          
        </>
      );
}
 
export default Details;