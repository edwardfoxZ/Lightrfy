import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [ipfsLink, setIpfsLink] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const result = await res.json();

      if (result.IpfsHash) {
        const gatewayURL = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
        setIpfsLink(gatewayURL);
        setStatus("✅ Upload successful!");
      } else {
        setStatus("❌ Upload failed");
      }
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-[1270px] mx-auto text-white py-32">
      <h1 className="text-center">Upload the songs here!</h1>
      <div className="flex flex-col items-center space-y-5 mt-32">
        <input type="file" onChange={handleFileChange} />
        <button
          className={`bg-[#8f364e] p-3 px-5 rounded-xl`}
          onClick={handleUpload}
          disabled={!file}
        >
          Upload
        </button>
      </div>
      <div className="flex flex-col items-center mt-10 text-xl">
        <p>{status}</p>
        {ipfsLink && (
          <a href={ipfsLink} target="_blank">
            View on IPFS
          </a>
        )}
      </div>
    </div>
  );
};

export default Upload;
