# Luxonis scraping test task
a job interview task for a full-stack JS development position at https://luxonis.com/

It did not bring the job, because after 14 days of lively conversation and not getting any support with the issues I had (both technical and legal) the lady (who refused to tell her position at the company) ended the process up with 'We expected you to deliver within 10 days'. 

I decided to create it without any restrictions anyways since the whole stack gave me a good opportunity to get my fingers wet with instruments I do not usually deal with.

## Original Assignment
Scrape the first 500 items (title, image url) from sreality.cz (flats, sell - you can switch the web to English) and save it in the Postgresql database. Implement a simple HTTP server (or use Nginx) and show these 500 items on a nice page (with pagination) which will use your own design and put everything to single docker-compose command so that I can just run "docker-compose up" in the Github repository and see the scraped ads on http://127.0.0.1:8080 page. Use Typescript and React for implementation.
### Follow-up clarification
- scraping can be both periodic and one-shot
- database should be cleared up before each dataset inserted
- public github repository is mandatory
- single docker-compose file is mandatory
- the whole scraping might be done with a single request (did not answer my legal issues but pointed me to the trick of setting cookies before scraping)

## Usage
- rename .env files and fill accordingly
 - `docker compose up` will start the production builds

## Issues I had
1. I could not overcome the issue with quemu to succesfully build and run the scraper on Apple Silicon which is my dev machine
2. Scraping sreality is considered copyright violation (the Luxonis company did not care at all about robots.txt rules and copyrighted content being scraped, saved and displayed; I asked Sreality.cz for a permission, which was not given for obvious reasons)

## Solutions I made
1. Removing cron from the docker stack for the main part and testing/runnig it on amd64 architecture (my old laptop was not sufficient for the whole dev process since the builds took very very long to process)
2. Mocking my own pages that I could scrape - based on data from thecatapi.com. I went for the cookies approach to get as close as possible to the original assignment.

## Implications
- shared .env files per service
- more docker-compose* files
- mocking the scraped page cannot be done 1:1 because max amount of data for a single request on thecatapi.com is 100 (with a valid API key), therefore the final gallery (Browser) has maximum of 100 items in it at best


## Stack
### Database
- PostgreSQL

### Cron
- ExpressJS
- Puppeteer
- Prisma

### Browser
based on t3 stack

- NextJS
- Prisma
- tRPC
### Cat Catalogue
based on Vite

- ReactJS
- NGINX
