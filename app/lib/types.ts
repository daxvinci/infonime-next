import React from "react";


export type Ogdata = {
    data:Data[];
    meta:Count;
  }

export type Details = {
  data:Data;
}

export type Data = {
    id:string;
    attributes:Attribs;
    animeImageUrl?:string;
}

// type Image = {
//   posterImage?: {
//     large?: string;
//     small?: string;
//     medium?:string;
//   };
// }

export type Attribs = {
  slug: string;
  synopsis?: string;
  averageRating?: string;
  episodeCount?: number;
  showType?: string;
  titles?:{
      en:string;
      en_jp:string;
      ja_jp:string;

  };
  posterImage?: {
    tiny?: string;
    large?: string;
    small?: string;
    medium?:string;
    original?: string;
  };
  coverImage?: {
    tiny?: string,
    large?: string,
    small?: string,
    original?: string,
  };
  status:string;
  url:string;
  [key: string]: unknown; // Allow additional unknown properties
};


export type Attr = {
  animes : Data[];
  error : object | string | undefined;
  loading:boolean;
  darkmode:boolean;
} 


export type AnimeDetails = {
    imageUrl: string;
    slug: string;
    synopsis: string;
    titles?: {
        en?:string;
        en_jp?:string;
        ja_jp?:string;
    }
    averageRating?: string;
    episodeCount?: number;
    status?: string;
    // genre: string[];
    startDate?: string;
    endDate?: string;
    posterImage?: {
        tiny?: string;
        large?: string;
        small?: string;
        medium?:string;
        original?: string;
      };
      coverImage?: {
        tiny?: string,
        large?: string,
        small?: string,
        original?: string,
      };
  }

export type DetailsData = {
    data:InsideData
  }

export type InsideData = {
        id:string;
        type?:string;
        attributes:AnimeDetails
}

export type Bool = {
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
  darkmode?:boolean;
  searchValue?:string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  limit?:number;
}

export type Paginate = {
  setOffset:React.Dispatch<React.SetStateAction<number>>;
  limit:number;
  offset:number;
  animes:Data[];
  handleLastPage: () => Promise<void>
  // maxCount:Meta;
  currentPage:number;
  pageType:string;
}

export type Count = {
  count:number;
}

export type Variants = {
  hidden: Hidden;
  visible: Visible; 
}
type Hidden = {
  x?:number;
  y?:number;
  opacity?:number
}
type Visible = {
  x?: number;
  y?: number;
  opacity?: number;
  transition?: Transition;
}
type Transition = {
  delay?: number;
  duration?:number;
  staggerChildren?: number;
}
// export type TotalAnimes = {
//   meta:Count;
//   // links:Pages;
// }

export type DetailsProps = {
  params: {
    slug: string;
  };
};

// export type SlugId = {
//   id:string;
// }