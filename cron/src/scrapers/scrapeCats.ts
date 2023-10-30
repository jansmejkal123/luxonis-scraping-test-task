import {CatData, Scraper} from "../types";

const scrapeCats: Scraper<CatData> = async (domain, port)  => {
    console.log(`Scraping ${domain}:${port}`);

    return [{
        breed: 'test_breed',
        record_id: 'test_record_id',
        imgURL: 'https://cdn2.thecatapi.com/images/Hb2N6tYTJ.jpg'
    }] as CatData[];
}

export default scrapeCats
