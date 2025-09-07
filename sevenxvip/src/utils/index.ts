export type LinkItem = {
    id: number;
    name: string;
    mega: string;
    mega2?: string;
    pixeldrain?: string;
    AdmavenMega?: string;
    AdmavenMega2?: string;
    AdmavenPixeldrain?: string;
    category: string;
    postDate: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    thumbnail?: string;
  };

 export type ContentItem = {
  id: number;
  name: string;
  link: string;
  link2: string;
  linkP: string;
  linkG: string;
  linkMV1: string;
  linkMV2: string;
  linkMV3: string;
  linkMV4: string
  category: string;
  postDate: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
};