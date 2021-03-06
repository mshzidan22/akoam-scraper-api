import express from 'express';
import { AkoamLink } from './AkoamLink';
import {run} from './script'
var path = require('path');

const app = express();
const port = process.env.PORT || 3000
app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/akoamapi', (req, res) => {
    const link = req.query.link;
    const isPlayList = req.query.isPlayList
    const mostRecent = req.query.mostRecent
    const episodeToscrap = req.query.episodeToscrap
    const neededQuality = req.query.neededQuality
    let akoamLink = new AkoamLink()
    akoamLink.setLink(link).setIsPlayList(isPlayList).setMostRecent(mostRecent)
    .setEpisodeToscrap(episodeToscrap).setNeededQuality(neededQuality)

    console.log(akoamLink.mostRecent + "is the most recent")

    run(akoamLink).then(out => res.send(out)).catch(console.log)
});


app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});