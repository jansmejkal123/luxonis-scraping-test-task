export type CatData =  {breed: string, record_id: string, imgURL: string}

export type ScrapeResult<T extends Object = {}> = T[]

export type Scraper<T extends Object> = (domain: string, path: string, port?: number) => Promise<ScrapeResult<T>>
