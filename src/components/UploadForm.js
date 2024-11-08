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
    <div className="p-4 bg-gray-100 rounded-md shadow-md space-y-4">
      <input
        type="file"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-gray-800 file:text-white
                   hover:file:bg-gray-500"
      />
      <textarea
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Ketik pesan di sini..."
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
  );
}

export default UploadForm;
