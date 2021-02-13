"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AkoamLink_1 = require("./AkoamLink");
const script_1 = require("./script");
const app = express_1.default();
const port = 3001;
// app.get('/', (req, res) => {
//     let akoamLink = new AkoamLink();
//     run(akoamLink).then(out => res.send(out))
// });
app.get('/akoamapi', (req, res) => {
    const link = req.query.link;
    const isPlayList = req.query.isPlayList;
    const mostRecent = req.query.mostRecent;
    const episodeToscrap = req.query.episodeToscrap;
    const neededQuality = req.query.neededQuality;
    let akoamLink = new AkoamLink_1.AkoamLink();
    akoamLink.setLink(link).setIsPlayList(isPlayList).setMostRecent(mostRecent)
        .setEpisodeToscrap(episodeToscrap).setNeededQuality(neededQuality);
    script_1.run(akoamLink).then(out => res.send(out)).catch(console.log);
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map