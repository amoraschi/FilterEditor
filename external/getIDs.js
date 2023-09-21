const {writeFileSync} = require("fs");
const {join} = require("path");
const data = require('./reference.json')

async function getIDs() {
    const actualIDs = {}
    Object.keys(data).forEach((id) => {
        actualIDs[id.replaceAll('_', ' ').toLowerCase()] = id
    })
    writeFileSync(join(__dirname, '/ids.json'), JSON.stringify(actualIDs))
}

getIDs()
