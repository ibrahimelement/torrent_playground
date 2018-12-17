const WebTorrent = require('webtorrent-hybrid');
const path = require('path');

function test(torrentId){
    var client = new WebTorrent();
    client.add(torrentId, {path: path.join(__dirname, "data")}, (torrent)=>{
    });

    client.on('torrent', (torrent)=>{
        console.log("Torrent is ready to be downloaded!");
        let intervalId = setInterval(()=>{
            console.log(`time remaining ${torrent.timeRemaining} total downloaded ${torrent.downloaded} total uploaded ${torrent.uploaded} download speed ${torrent.downloadSpeed}`);
        }, 1000);

        torrent.on('done', ()=>{
            console.log("Torrent has completed download!");
            clearInterval(intervalId);
        });

    });

    client.on('error', (err)=>{
        console.log("Error,", err);
    });

}


test('magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent');