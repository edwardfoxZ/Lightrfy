import jsmediatags from "jsmediatags";
import fs from "fs";
import path from "path";

const SONG_DIR = "./songs";
const OUTPUT_CVS = "../metadata.csv";

function getTags(filePath) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(filePath, {
      onSuccess: function (tag) {
        resolve({
          title: tag.tags.title || "",
          artist: tag.tags.artist || "",
          filename: path.basename(filePath),
        });
      },

      onError: function (err) {
        console.error("Error: ", err.message);
        resolve({
          title: "",
          artist: "",
          filename: path.basename(filePath),
        });
      },
    });
  });
}

async function generateCSV() {
  try {
    const files = fs.readdirSync(SONG_DIR).filter((f) => f.endsWith(".mp3"));

    const metadata = await Promise.all(
      files.map((file) => getTags(path.join(SONG_DIR, file)))
    );

    let cvs = "filename,title,artist\n";
    metadata.forEach(({ filename, title, artist }) => {
      cvs += `"${filename}","${title}","${artist}"\n`;
    });

    fs.writeFileSync(OUTPUT_CVS, cvs);
    console.log(`metadata.csv generated with ${metadata.length} rows.`);
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

generateCSV();
