"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeLinksScraper = void 0;
const Output_1 = require("./Output");
class EpisodeLinksScraper {
    static async getEpisode(akoamLink, page, eiposidesContainer) {
        // single episode
        if (!akoamLink.isPlayList)
            return [akoamLink.link];
        // multiple episode
        await page.goto(akoamLink.link);
        await page.waitForSelector(eiposidesContainer);
        let links = await page.$$eval(eiposidesContainer, elements => {
            return elements.map(episode => episode.getAttribute('href'));
        });
        if (!akoamLink.mostRecent)
            links.reverse();
        let totalEpisodeToScrape = (akoamLink.episodeToscrap == undefined) ? links.length + 1 : akoamLink.episodeToscrap;
        return links.slice(0, totalEpisodeToScrape);
    }
    static async getIntermediatePageLink(episodeLink, page, qualityLinksSelector, avilabelQualitesSelector, { neededQuality }) {
        await page.goto(episodeLink);
        await page.waitForSelector(avilabelQualitesSelector);
        let avilabelQualites = await page.$$eval(avilabelQualitesSelector, elements => elements.map(item => item.innerHTML));
        let neededQulaityIndex = avilabelQualites.findIndex(item => item == neededQuality);
        if (neededQulaityIndex == -1)
            throw "Needed Quality is not found";
        await page.waitForSelector(qualityLinksSelector);
        let links = await page.$$eval(qualityLinksSelector, elements => {
            return elements.map(link => link.getAttribute("href")).filter(link => link.includes("link"));
        });
        return links[neededQulaityIndex];
    }
    static async getDownloadPage(page, IntermediatePageLink, goToDownlaodPageSelector) {
        await page.goto(IntermediatePageLink);
        await page.waitForSelector(goToDownlaodPageSelector);
        let downloadPage = await page.$eval(goToDownlaodPageSelector, element => element.getAttribute("href"));
        return downloadPage;
    }
    static async getDownloadLink(page, downloadPageLink, downloadLinkSelector, titleSelector) {
        await page.goto(downloadPageLink);
        await page.waitForSelector(downloadLinkSelector);
        const downloadLink = await page.$eval(downloadLinkSelector, a => a.getAttribute('href'));
        const title = await page.$eval(titleSelector, t => t.textContent);
        return new Output_1.Output(title, downloadLink);
    }
}
exports.EpisodeLinksScraper = EpisodeLinksScraper;
//# sourceMappingURL=EpisodeLinksScraper.js.map