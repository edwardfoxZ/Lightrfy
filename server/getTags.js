const jsmediatags = require("jsmediatags");
const fs = require("fs");
const path = require("path");

const songPath = "./songs";

function getTags(filePath) {
  jsmediatags.read(filePath, {
    onSuccess: function (tag) {
      //   console.log("Getting tags...");
      console.log()
      console.log(tag.tags.artist);
      console.log(tag.tags.title)
    },

    onError: function (err) {
      console.error(`Error: ${err.message}`);
    },
  });
}

fs.readdir(songPath, (err, files) => {
  if (err) {
    console.error("Error: ", err.message);
    return;
  }

  files.forEach((file, index) => {
    const fullPath = path.join(songPath, file);
    // const ext = path.extname(file).toLowerCase();
    // const validExtensions = [".mp3", ".m4a", ".flac", ".ogg"];

    if (fullPath) {
      // const outputName = `tag`
      getTags(fullPath);
    }
  });
});
