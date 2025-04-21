import pinataSDK from "@pinata/sdk";
import jsmediatags from "jsmediatags";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import os from "os";
import { promisify } from "util";

dotenv.config();

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);
const SONG_DIR = "./songs";
const OUTPUT_JSON = "./metadata.json";

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

function getImage(filePath) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(filePath, {
      onSuccess: function (tag) {
        const tags = tag.tags;

        if (tags.picture) {
          const picture = tags.picture;
          const base64String = picture.data
            .map((charCode) => String.fromCharCode(charCode))
            .join("");
          const imageBuffer = Buffer.from(base64String, "binary");

          resolve(imageBuffer);
        } else {
          console.log(`No image found in file: ${filePath}`);
          resolve(null);
        }
      },
      onError: function (error) {
        console.error(`Error reading tags from ${filePath}: ${error.info}`);
        resolve(null);
      },
    });
  });
}

async function uploadSongToPinata(fileStream, fileName) {
  try {
    const result = await pinata.pinFileToIPFS(fileStream, {
      pinataMetadata: {
        name: fileName,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    });
    return result.IpfsHash;
  } catch (error) {
    console.error("Error while uploading song to Pinata: ", error.message);
    return null;
  }
}

async function generateJsonAndUpload() {
  const files = fs
    .readdirSync(SONG_DIR)
    .filter((file) => file.endsWith(".mp3"));

  const metadata = [];

  for (const file of files) {
    const fullPath = path.join(SONG_DIR, file);
    const tags = await getTags(fullPath);
    const songStream = fs.createReadStream(fullPath);
    const songCid = await uploadSongToPinata(songStream, file);
    if (!songCid) {
      console.log(`Failed to upload song: ${file}`);
      return;
    }

    const imageBuffer = await getImage(fullPath);
    let imageUrl = null;
    if (imageBuffer) {
      // Create a temporary file for the image
      const tempFilePath = path.join(os.tmpdir(), `cover_${file}.jpg`);
      fs.writeFileSync(tempFilePath, imageBuffer);

      // Create a readable stream from the temporary file
      const imageStream = fs.createReadStream(tempFilePath);

      const imageCid = await uploadSongToPinata(imageStream, `cover_${file}`);
      if (imageCid) {
        imageUrl = `https://gateway.pinata.cloud/ipfs/${imageCid}`;
      }

      // Clean up the temporary file
      fs.unlinkSync(tempFilePath);
    }

    metadata.push({
      ...tags,
      image_url: imageUrl,
      ipfs_url: `https://gateway.pinata.cloud/ipfs/${songCid}`,
    });

    console.log(`🎵 Uploaded: ${file} → CID: ${songCid}`);
    if (imageUrl) {
      console.log(`🖼️ Image URL: ${imageUrl}`);
    }
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(metadata, null, 2));
  console.log(`✅ metadata.json written with ${metadata.length} items`);
}

generateJsonAndUpload();
