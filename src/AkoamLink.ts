export class AkoamLink{
    link :string;
    isPlayList : boolean;
    neededQuality : string = "480p";
    mostRecent? : boolean = true;
    episodeToscrap? : number = 1;
    


    // constructor(link : string , isPlayList : boolean){
    //     this.link = link;
    //     this.isPlayList = isPlayList;
    // }

    constructor(){
        // this.link = 'https://akwam.cx/series/1267';  //AOT
        // this.isPlayList = true;

        this.link = 'https://akwam.cx/movie/3156/legend-of-fall-creek'
        this.isPlayList = false

    }

    setLink(link : string){
        if(link) this.link = link
    
        return this;
    }
    setIsPlayList(isPlayList : boolean){
        if(isPlayList) 
        this.isPlayList = isPlayList
        return this;
    }
    setNeededQuality(neededQuality : string){
        if(neededQuality) this.neededQuality = neededQuality
        return this;
    }
    setMostRecent(mostRecent : boolean){
        if(mostRecent) 
        this.mostRecent = mostRecent
        return this;
    }
    setEpisodeToscrap(episodeToscrap : number){
        if(episodeToscrap) this.episodeToscrap = episodeToscrap
        return this;
    }
}