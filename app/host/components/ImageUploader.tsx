"use client";

import { UploadButton } from "../../utils/uploadthing";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageUploader({
  saveFileUrl,
}: {
  saveFileUrl: (fileKey: string) => Promise<void>;
}) {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          try {
            // Do something with the response
            console.log("Files: ", res);
            let fileUrl = res[0].url;
            if (fileUrl) {
              await saveFileUrl(fileUrl);
            }

            toast("Upload Completed");
          } catch (error) {
            console.error(error);
            alert("Upload failed");
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <ToastContainer />
    </main>
  );
}
