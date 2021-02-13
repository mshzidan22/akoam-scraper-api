import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { AkoamLink } from './AkoamLink';
import { AkoamSelectors } from './AkoamSelectors';
import { EpisodeLinksScraper } from './episodeLinksScraper';
import { Output } from './Output';





// let akoamLink = new AkoamLink();

// run(akoamLink)


export async function run(akoamLink : AkoamLink){
      
    const browser = await puppeteer.use(StealthPlugin()).launch({args: ['--no-sandbox','--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (request.resourceType() !== 'document') {
            request.abort();
        } else {
            request.continue();
        }
    });

  let episodes : string []; 
  let output : Output [] = new Array();
  


  await EpisodeLinksScraper.getEpisode(akoamLink ,page , AkoamSelectors.eiposidesContainer)
  .then(e => {episodes = e} ).catch(console.log)

  for(const episode of episodes) {
    let intermediatePageLink ;
    let downloadPageLink;

    await EpisodeLinksScraper.getIntermediatePageLink(episode ,page ,
        AkoamSelectors.qualityLinksSelector ,AkoamSelectors.avilabelQualitesSelector, akoamLink)
        .then(link => intermediatePageLink = link).catch(console.log)
    
    await EpisodeLinksScraper.getDownloadPage(page , intermediatePageLink ,AkoamSelectors.goToDownlaodPageSelector )
        .then(link => downloadPageLink = link).catch(console.log)

    await EpisodeLinksScraper.getDownloadLink(page , downloadPageLink , 
        AkoamSelectors.downloadLinkSelector , AkoamSelectors.titleSelector)
        .then(out => output.push(out))
  }

//   let csvFile = CSVGenerator.createCSVFromObject(output);
//     fs.writeFile('output.csv', csvFile, 'utf-8', (err) => console.log(err))

    
  
    await browser.close()

    return output
}




