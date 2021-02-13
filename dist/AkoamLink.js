"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkoamLink = void 0;
class AkoamLink {
    // constructor(link : string , isPlayList : boolean){
    //     this.link = link;
    //     this.isPlayList = isPlayList;
    // }
    constructor() {
        // this.link = 'https://akwam.cx/series/1267';  //AOT
        // this.isPlayList = true;
        this.neededQuality = "480p";
        this.mostRecent = true;
        this.episodeToscrap = 1;
        this.link = 'https://akwam.cx/movie/3156/legend-of-fall-creek';
        this.isPlayList = false;
    }
    setLink(link) {
        if (link)
            this.link = link;
        return this;
    }
    setIsPlayList(isPlayList) {
        if (isPlayList)
            this.isPlayList = isPlayList;
        return this;
    }
    setNeededQuality(neededQuality) {
        if (neededQuality)
            this.neededQuality = neededQuality;
        return this;
    }
    setMostRecent(mostRecent) {
        if (mostRecent)
            this.mostRecent = mostRecent;
        return this;
    }
    setEpisodeToscrap(episodeToscrap) {
        if (episodeToscrap)
            this.episodeToscrap = episodeToscrap;
        return this;
    }
}
exports.AkoamLink = AkoamLink;
//# sourceMappingURL=AkoamLink.js.map