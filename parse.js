let cheerio = require('cheerio'),
    fs = require('fs'),
    fileContent = fs.readFileSync(process.argv[2], 'utf8'),
    $ = cheerio.load(fileContent);

let runsTable = $('body').find('table').eq(1),
    tableRows = runsTable.find('tbody tr');

let runs = [];
let contestants = new Set();

tableRows.each((index, element) => {
    if (index == 0) {
        return;
    }
    let el = $(element),
        cols = el.find('td');

    runs.push({
        contestant: cols.eq(2).text(),
        problemLetter: cols.eq(4).text(),
        timeMinutesFromStart: parseInt(cols.eq(3).text()),
        success: cols.last().text() == 'YES' 
    });

    contestants.add(cols.eq(2).text());
});

console.log(JSON.stringify({
    contestName: 'Your contest name here',
    freezeTimeMinutesFromStart: 240,
    problemLetters: ['Problem letters here'],
    contestants: [...contestants],
    runs
}, null, 2));

