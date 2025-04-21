import pinataSDK from "@pinata/sdk";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import csvParser from "csv-parser";

dotenv.config();

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);
const SONG_DIR = "./songs";
const CVS_PATH = "../metadata.csv";

async function uploadFile(filePath) {
  const stream = fs.createReadStream(filePath);
  const result = await pinata.pinFileToIPFS(stream);
  return result.IpfsHash;
}

// Read the CSV
function readCSV() {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(CVS_PATH)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

async function uploadAllSongs() {
  const files = fs.readdirSync(SONG_DIR);
  const mp3 = files.filter((file) => file.endsWith(".mp3"));
  const metadataFromCSV = await readCSV();

  for (const mp3File of mp3) {
    const baseName = path.basename(mp3File, ".mp3");
    const imageFile = `${baseName}.jpg`;

    const songPath = path.join(SONG_DIR, mp3File);
    const imagePath = path.join(SONG_DIR, imageFile);

    if (!fs.existsSync(imagePath)) {
      console.warn(`❌ Missing image for ${baseName}, skipping.`);
      continue;
    }

    const songMetaData = metadataFromCSV.find(
      (meta) => meta.filename == mp3File
    );
    if (!songMetaData) {
      console.warn(`❌ No metadata found for ${mp3File}, skipping.`);
      continue;
    }

    console.log(`🎵 Uploading: ${baseName}`);

    const songHash = await uploadFile(songPath);
    const imageHash = await uploadFile(imagePath);

    const metadata = {
      name: songMetaData.title || baseName,
      artist: songMetaData.artist || "Unknown artist",
      description: `A song by ${songMetaData.artist || "an artist"}`,
      audio: `ipfs://${songHash}`,
      image: `ipfs://${imageHash}`,
    };

    const metaResult = await pinata.pinJSONToIPFS(metadata);
    console.log(`Metadata uploaded for ${baseName}: ${metaResult.IpfsHash}`);
  }
}

uploadAllSongs().catch(console.error);
