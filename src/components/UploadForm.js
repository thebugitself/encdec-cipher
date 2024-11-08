import React from "react";

function UploadForm({ onUpload, onTextChange }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      onUpload(reader.result);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <textarea
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Ketik pesan di sini..."
      ></textarea>
    </div>
  );
}

export default UploadForm;
