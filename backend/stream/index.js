const fs = require("fs")
const { pipeline } = require("stream")

function saveToFile() {
    const rs = fs.createReadStream("./myfile")
    const ws = fs.createWriteStream("./checksum.txt")
  
    pipeline(rs, ws, (err) => {
      err && console.error(err);
    })
  }

  saveToFile()