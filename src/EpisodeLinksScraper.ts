import { Page } from "puppeteer";
import { AkoamLink } from "./AkoamLink";
import { Output } from "./Output";

export class EpisodeLinksScraper{


public static async getEpisode(akoamLink : AkoamLink , page : Page ,eiposidesContainer? : string) : Promise<string[]>{
    // single episode
    if(!akoamLink.isPlayList) return [akoamLink.link]
    // multiple episode
    await page.goto(akoamLink.link)
    await page.waitForSelector(eiposidesContainer)
   
    let links = await page.$$eval(eiposidesContainer, elements => {
       return elements.map(episode => episode.getAttribute('href'))
    })
     //if most recent == true  you should not reverse
     //if most recent == false you should reverse

     if(akoamLink.mostRecent == false) links.reverse();
     console.log(links)
     let totalEpisodeToScrape = (akoamLink.episodeToscrap == undefined)? links.length + 1 : akoamLink.episodeToscrap;
    return links.slice(0 ,totalEpisodeToScrape)


}

public static async getIntermediatePageLink (episodeLink : string, page : Page , qualityLinksSelector : string ,avilabelQualitesSelector : string , {neededQuality}): Promise<string>{
  await page.goto(episodeLink)
  await page.waitForSelector(avilabelQualitesSelector)
  let avilabelQualites = await page.$$eval(avilabelQualitesSelector , elements => elements.map(item => item.innerHTML))
  let neededQulaityIndex = avilabelQualites.findIndex(item => item == neededQuality)
  if(neededQulaityIndex == -1) throw "Needed Quality is not found"
  await page.waitForSelector(qualityLinksSelector)
  let links = await page.$$eval(qualityLinksSelector , elements => {
     return elements.map(link => link.getAttribute("href")).filter(link => link.includes("link"))
  })
 return links[neededQulaityIndex]



}


public static async getDownloadPage (page:Page  ,IntermediatePageLink : string , goToDownlaodPageSelector :string ) : Promise<string>{
    await page.goto(IntermediatePageLink);
    await page.waitForSelector(goToDownlaodPageSelector)
    let downloadPage = await page.$eval(goToDownlaodPageSelector , element => element.getAttribute("href"))
    return downloadPage
}

public static async getDownloadLink(page :Page ,downloadPageLink : string, downloadLinkSelector : string , titleSelector : string) : Promise<Output>{
    await page.goto(downloadPageLink)
    await page.waitForSelector(downloadLinkSelector)
    const downloadLink = await page.$eval(downloadLinkSelector, a => a.getAttribute('href'))
    const title = await page.$eval(titleSelector, t => t.textContent)
    return new Output(title,downloadLink)

}




}