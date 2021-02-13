"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const AkoamSelectors_1 = require("./AkoamSelectors");
const episodeLinksScraper_1 = require("./episodeLinksScraper");
// let akoamLink = new AkoamLink();
// run(akoamLink)
async function run(akoamLink) {
    const browser = await puppeteer_extra_1.default.use(puppeteer_extra_plugin_stealth_1.default()).launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (request.resourceType() !== 'document') {
            request.abort();
        }
        else {
            request.continue();
        }
    });
    let episodes;
    let output = new Array();
    await episodeLinksScraper_1.EpisodeLinksScraper.getEpisode(akoamLink, page, AkoamSelectors_1.AkoamSelectors.eiposidesContainer)
        .then(e => { episodes = e; }).catch(console.log);
    for (const episode of episodes) {
        let intermediatePageLink;
        let downloadPageLink;
        await episodeLinksScraper_1.EpisodeLinksScraper.getIntermediatePageLink(episode, page, AkoamSelectors_1.AkoamSelectors.qualityLinksSelector, AkoamSelectors_1.AkoamSelectors.avilabelQualitesSelector, akoamLink)
            .then(link => intermediatePageLink = link).catch(console.log);
        await episodeLinksScraper_1.EpisodeLinksScraper.getDownloadPage(page, intermediatePageLink, AkoamSelectors_1.AkoamSelectors.goToDownlaodPageSelector)
            .then(link => downloadPageLink = link).catch(console.log);
        await episodeLinksScraper_1.EpisodeLinksScraper.getDownloadLink(page, downloadPageLink, AkoamSelectors_1.AkoamSelectors.downloadLinkSelector, AkoamSelectors_1.AkoamSelectors.titleSelector)
            .then(out => output.push(out));
    }
    //   let csvFile = CSVGenerator.createCSVFromObject(output);
    //     fs.writeFile('output.csv', csvFile, 'utf-8', (err) => console.log(err))
    await browser.close();
    return output;
}
exports.run = run;
//# sourceMappingURL=script.js.map