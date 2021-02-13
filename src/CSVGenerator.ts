export class CSVGenerator{


    static createCSVFromObject(object : any) {
        let header = Object.keys(object[0])
        let data = header.join(",") + "\n";
        object.forEach(row => {
            data += Object.values(row).join(",") + "\n";
        });
        return data
    }


}