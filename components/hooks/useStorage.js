import { useState } from 'react';
import { Web3Storage } from 'web3.storage';

const API_TOKEN =
  process.env.WEB3_STORAGE_TOKEN ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ5RDY2MUNkRjQwZWRiNTdCYzJEZTlGRTg3YTVCZjk3NmZhQzQ4YzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDgyNzQ2MDg4NzEsIm5hbWUiOiJEb2N0b3IifQ.lLx1al8hirsVcjTg9D-_LrWr2Fxjw_h-L5HvtihXdJs';

const useStorage = () => {
  const [CID, setCID] = useState('');

  const uploadFile = async (fileInput) => {
    // Construct with token and endpoint
    const client = new Web3Storage({ token: WEB3_STORAGE_TOKEN });

    // const fileInput = document.querySelector('input[type="file"]');
    // const fileInput = fileRef.current;

    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(fileInput.files); // Promise<CIDString>

    // Get info on the Filecoin deals that the CID is stored in
    const info = await client.status(rootCid); // Promise<Status | undefined>

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid); // Promise<Web3Response | null>
    const files = await res.files(); // Promise<Web3File[]>
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
      await setCID(file.cid);
      alert(`${file.cid} ${file.name} ${file.size}`);
    }
    return CID;
  };

  return {
    uploadFile,
  };
};

export default useStorage;
