export interface News {
  id: number;
  guid: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  published_on: number;
  imageurl: string;
  title: string;
  url: string;
  body: string;
  tags: string;
  lang: string;
  upvotes: string;
  downvotes: string;
  categories: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  source_info: object;
  source: string;
}
