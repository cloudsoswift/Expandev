import { useState } from "react";

const InputThumbnail = ({onChange, value}) => {
  // Thumbnail 관련 State
  const [thumbnailSrc, setThumbailSrc] = useState("");
  // thumbnail 이미지 관련 Handler
  const handleThumbnailChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {
      onChange(file);
      // setThumbnail(file);
      setThumbailSrc(file);
      return;
    }
    reader.onloadend = () => {
      onChange(file);
      // setThumbnail(file);
      setThumbailSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-60 py-2">
      <span className="text-sm text-gray-500">
        (선택)썸네일 파일 첨부
        <br />
      </span>
      <div className="grid grid-cols-2 h-full border rounded-lg p-1">
        <input
          className="file:border-0 file:py-2 file:px-4 file:rounded-lg"
          type="file"
          onChange={handleThumbnailChange}
          accept="image/png, image/jpeg"
        />
        <div className="h-full border overflow-hidden">
          {value && (
            <img
              className="w-full h-full object-contain"
              src={thumbnailSrc}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputThumbnail;
