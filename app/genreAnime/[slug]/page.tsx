"use client"

import { Count, Data, Ogdata,DetailsProps } from "../../lib/types";

import { useEffect, useState,use } from 'react';
import axios from 'axios';
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { useThemeContext } from "../../ThemeContext";
// import { useParams } from "next/navigation";

const GenreAnimes =  ({params}:{params: Promise<{ slug: string }>}) => {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  // const genreSlug = useParams();
  const {slug} =  use(params);
  const limit: number = 9;
  const pageType = 'genrerPersist';

  const [currentPage, setCurrentPage] = useState(1);
  const { darkmode, loading, setLoading = () => {} } = useThemeContext();
  const [offset, setOffset] = useState<number>(0);
  const [totalAnimes, setTotalAnimes] = useState<Count>();
  const [filteredGenre, setFilteredGenre] = useState<Data[]>([]);

  useEffect(() => {
    const savedOffset = localStorage.getItem(pageType);
    if (savedOffset) {
      const intSavedOffset = parseInt(savedOffset, 10);
      setOffset(intSavedOffset);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const animeFetch = async (limit: number, offset: number) => {
      try {
        const response = await axios.get<Ogdata>(base_url + '/anime', {
          headers: {
            'Content-Type': 'application/vnd.api+json',
          },
          params: {
            'filter[genres]': slug,
            'page[limit]': limit,
            'page[offset]': offset,
          },
        });
        const data = response.data.data;
        const meta = response.data.meta;
        const currentPageNumber = Math.floor(offset / limit) + 1;
        setCurrentPage(currentPageNumber);
        setTotalAnimes(meta);
        setFilteredGenre(data);
        setLoading(false);
      } catch (err) {
        console.log('err: ' + err);
        setLoading(false);
      }
    };

    animeFetch(limit, offset);
  }, [base_url, slug, limit, offset, setLoading]);

  const handleLastPage = async () => {
    if (!totalAnimes) {
      console.error('Error maxcount is undefined');
      return;
    }
    const lastPageOffset = Math.floor((totalAnimes.count - 1) / limit) * limit;
    setOffset(lastPageOffset);
    localStorage.setItem(pageType, lastPageOffset.toString());
  };

  if (loading) {
    return (
      <div className={`${darkmode ? 'bg-gray-800 text-amber-50' : 'bg-[#f9f9f9] text-gray-700'}`}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className={`contain p-6 ${darkmode ? 'bg-gray-800 text-amber-50' : 'bg-[#f9f9f9] text-gray-700'}`}>
        <h2 className="font-semibold text-2xl mb-6">{slug}</h2>
        <div>
          {filteredGenre && filteredGenre.length > 0 ? (
            <div className="content grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
              {filteredGenre.map((genre) => (
                <Card key={genre.id} data={genre} />
              ))}
            </div>
          ) : (
            <div>No anime found for this genre.</div>
          )}
        </div>

        {filteredGenre && filteredGenre.length > 0 && (
          <Pagination
            pageType={pageType}
            currentPage={currentPage}
            handleLastPage={handleLastPage}
            limit={limit}
            offset={offset}
            animes={filteredGenre}
            setOffset={setOffset}
          />
        )}
      </div>
    </>
  );
};

export default GenreAnimes;