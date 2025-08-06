"use client"

import { useEffect,useRef,useState} from "react"
import axios from "axios"
import Card from "../../components/Card"
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination"
import {Ogdata, Data, Count } from "../../lib/types"
import { useThemeContext } from "../../ThemeContext";



const Popular = () => {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const limit:number = 9

    
    const isInitialized = useRef(false);
    
    const [totalAnimes,setTotalAnimes] = useState<Count>()
    const [offset,setOffset] = useState<number>(0)
    const [popular,setPopular] = useState<Data[]>([])
    const [error,setError] = useState<object | string | undefined >()
    
    const [currentPage,setCurrentPage] = useState(1)
    const {darkmode,loading,setLoading=()=>{},searchValue} = useThemeContext()

    const pageType = "popularPersist"
    


    
    // last page 
    const handleLastPage = async () => {
      if (!totalAnimes) {
        console.error('Error maxcount is undefined');
        return;
      }
      const lastPageOffset = Math.floor((totalAnimes.count - 1) / limit) * limit;
      setOffset(lastPageOffset);
      localStorage.setItem(pageType,lastPageOffset.toString())
   };

   useEffect(() => {
    const savedOffset = localStorage.getItem(pageType);
    if(savedOffset){
      const intSavedOffset = parseInt(savedOffset,10)
      setOffset(intSavedOffset)
      isInitialized.current = true;
    }
  
  }, [])

    useEffect(()=>{
      setLoading(true)
      const animeFetch = async(limit:number,offset:number)=>{
        try{
          const response = await axios.get<Ogdata>( base_url + '/anime',
            {
              headers:{
                'Content-Type':'application/vnd.api+json'
              },
              params:{
                'sort':'popularityRank',
                'page[limit]':limit,
                'page[offset]':offset,
                "filter[text]":searchValue?.trim() || ''
              }
            })
          const data = response.data.data
          const meta = response.data.meta
          const currentPageNumber = Math.floor(offset/limit)+1;
          setCurrentPage(currentPageNumber)
          setTotalAnimes(meta)
          setPopular(data)
          // console.log(data)
          setLoading(false)
        }
        catch(err:unknown){
          // if (err instanceof Error) {
          //   setError(err); // Set error to the error message
          // } else {
          //   setError('An unknown error occurred'); // Fallback message
          // }
          setError('error check console')
          console.log(err)
        }
        
      }
      
        animeFetch(limit,offset)
      },[limit,offset,base_url,setLoading,searchValue])


    if (loading) return <div className={`${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
      <Loading/>
    </div>;

    return ( 
        <>
        <section className={`p-6 ${darkmode ? 'bg-gray-800 text-amber-50': 'bg-[#f9f9f9] text-gray-700'}`}>
            <div className="contain home">
                <h2 className="text-2xl font-semibold mb-6">Popular</h2>
                <div className="main-container">
                    {error ? (
                        <div className="contain">{typeof error === 'object' ? 'object error' : error}</div>
                    ):!loading && popular?.length < 1 ? (
                        <div className="contain">No data Found</div>
                    ):(
                        <div className="content grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                            {popular?.map((data:Data)=> < Card key={data.id} data={data} /> )}
                        </div>
                       
                    )}
                    
                </div>

                { !loading && popular?.length > 0 && <Pagination pageType={pageType} currentPage={currentPage} handleLastPage={handleLastPage} limit={limit} offset={offset} animes={popular} setOffset={setOffset} />}

            </div>
            


        </section>
        </>
     );
}
 
export default Popular;