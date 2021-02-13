export class AkoamSelectors {

    static eiposidesContainer : string = '#series-episodes > div > div > div:nth-child(n) > div > div > a'
    static qualityLinksSelector : string = 'div[id^="tab"] a'   //odd is link  , even is watch //array
    static avilabelQualitesSelector : string = 'ul a'

    static goToDownlaodPageSelector : string = 'body > div.site-container > div > div.content > a'
    static downloadLinkSelector : string = 'body > div.site-container > div.page-redirect > div > div > div > div.my-5 > div > a'
    static titleSelector : string = 'body > div.site-container > div.page-redirect > div > div > div > p > a'
}
