"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVGenerator = void 0;
class CSVGenerator {
    static createCSVFromObject(object) {
        let header = Object.keys(object[0]);
        let data = header.join(",") + "\n";
        object.forEach(row => {
            data += Object.values(row).join(",") + "\n";
        });
        return data;
    }
}
exports.CSVGenerator = CSVGenerator;
//# sourceMappingURL=CSVGenerator.js.map