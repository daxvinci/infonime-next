"use client"

import { Data, Ogdata } from "../lib/types";
import { useEffect, useState } from 'react';
import * as motion from "motion/react-client"
import axios from 'axios';
import Loading from "../components/Loading";
import { useThemeContext } from "../ThemeContext";
import Link from "next/link";

const Genre = () => {
  // const limit:number = 62
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  const [genres, setGenres] = useState<Data[]>([]);
  // const [offset,setOffset] = useState<number>(0)
  const [error,setError] = useState<object | string | undefined >()
  const {loading,darkmode,setLoading=()=>{}} = useThemeContext()
  
    
  // const [currentPage,setCurrentPage] = useState(1)

  
  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true)
      try {
        const countResponse = await axios.get<Ogdata>(base_url + '/genres', {
          params: {
            'page[limit]': 1,
          },
        });
    
        const totalCount = countResponse.data.meta.count; 
  
        const response = await axios.get<Ogdata>(base_url + '/genres',{
          params:{
            'page[limit]':totalCount,
            'sort':'slug'
          }
        });

        const genresData = response.data.data

          // Fetch anime image URL for each genre
        const genresWithAnimeImage = await Promise.all(
          genresData.map(async (genre) => {
            try {
              const animeResponse = await axios.get<Ogdata>( base_url + '/anime', {
                params: {
                  'filter[genres]': genre.attributes.slug, // Filter anime by genre
                  'page[limit]': 1, // Fetch only 1 anime per genre
                  // 'page[offset]':2
                },
              });

              // Directly extract the posterImage.small URL
              const animeImageUrl = animeResponse.data.data[0]?.attributes?.posterImage?.small || '';
              console.log(animeImageUrl)

              return {
                ...genre,
                animeImageUrl:animeImageUrl, // Add the anime image URL as a string
              };
            } catch (err) {
              console.error(`Error fetching anime for genre ${genre.attributes.slug}:`, err);
              return {
                ...genre,
                animeImageUrl: '', // Fallback if no image is found
              };
            }
          })
        );
  
        
        setGenres(genresWithAnimeImage);
        setLoading(false);
      } catch (err) {
        setError('Error...check console')
        console.log(err)
        setLoading(false);
      }
    };

    fetchGenres();
  }, [setLoading]);

  if (loading) return <Loading/>

  return (
    <div className={`min-h-screen ${darkmode ? 'bg-gray-900 text-white':'bg-[#f9f9f9] text-gray-700'} p-8`}>
      <h1 className="text-4xl font-bold text-center mb-8">Genres</h1>

          {error ? (
                        <div className="contain">{typeof error === 'object' ? 'object error' : error}</div>
                    ):genres?.length < 1 ? (
                        <div className="contain">No data Found</div>
                    ):(
                        <div className="content grid sm:grid-cols-2 lg:grid-cols-5 grid-cols-1 gap-4">
                             {genres.map((genre) => (
                              <Link key={genre.id} href={`/genreAnimes/${genre.attributes.slug}`}>
                                <motion.div
                                  key={genre.id}
                                  className="bg-gray-800 text-amber-50 relative rounded-3xl overflow-hidden shadow-lg flex items-center space-x-4"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {/* Image Container */}
                                  <div className=" w-full h-40 opacity-40 hover:opacity-75 flex-shrink-0">
                                    <motion.img
                                      src={genre?.animeImageUrl || 'https://via.placeholder.com/150'} // Fallback image if no image is provided
                                      alt={genre?.attributes?.slug || 'Image not available'}
                                      className="w-full h-full object-cover"
                                      whileHover={{ scale: 1.2 }} 
                                      transition={{ duration: 0.5 }} 
                                    />
                                  </div>

                                  {/* Genre Name */}
                                  <h2 className="text-2xl absolute bottom-2 left-4 right-4 font-semibold">{genre.attributes.slug}</h2>
                                </motion.div>
                              </Link>
                              ))}
                        </div>
                       
                    )}

    </div>
  );
};

export default Genre;