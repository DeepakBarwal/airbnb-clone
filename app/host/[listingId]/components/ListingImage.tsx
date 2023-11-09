"use client";
import ImageUploader from "../../components/ImageUploader";

export default function ListingImage({
  imgUrl,
  imgAlt,
  saveFileUrl,
}: {
  imgUrl: string;
  imgAlt: string;
  saveFileUrl: (fileKey: string) => Promise<void>;
}) {
  return (
    <div className="listing-image relative">
      <img
        src={imgUrl}
        alt={imgAlt}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 cursor-pointer">
        <label
          htmlFor="upload-btn"
          className="text-white text-center underline"
        >
          Edit Image
        </label>
        <input type="checkbox" id="upload-btn" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3>Pick your image</h3>
            <ImageUploader saveFileUrl={saveFileUrl} />
            <div className="modal-action">
              <label htmlFor="upload-btn">Done</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
