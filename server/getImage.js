const jsmediatags = require("jsmediatags");
const fs = require("fs");
const path = require("path");

const songsFolder = "./songs";

function getImage(filePath, outputName) {
  jsmediatags.read(filePath, {
    onSuccess: function (tag) {
      const tags = tag.tags;

      if (tags.picture) {
        const picture = tags.picture;
        const base64String = picture.data
          .map((charCode) => String.fromCharCode(charCode))
          .join("");
        const imageBuffer = Buffer.from(base64String, "binary");

        fs.writeFileSync(outputName, imageBuffer);
        console.log(`Image extracted and saved as ${outputName}`);
      } else {
        console.log(`No image found in file: ${filePath}`);
      }
    },
    onError: function (error) {
      console.error(`Error reading tags from ${filePath}: ${error.info}`);
    },
  });
}

// Read all files from the folder
fs.readdir(songsFolder, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file, index) => {
    const fullPath = path.join(songsFolder, file);
    const ext = path.extname(file).toLowerCase();
    const validExtensions = [".mp3", ".m4a", ".flac", ".ogg"]; // Add more as needed

    if (validExtensions.includes(ext)) {
      const outputName = `cover_${index + 1}.jpg`; // Name the output uniquely
      getImage(fullPath, outputName);
    }
  });
});
