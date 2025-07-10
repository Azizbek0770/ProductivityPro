import React, { useRef, useState } from 'react';
import { FaUpload, FaFileAlt, FaTrash } from 'react-icons/fa';

interface UploadedFile {
  name: string;
  url: string;
}

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>(() => {
    const saved = localStorage.getItem('uploadedFiles');
    return saved ? JSON.parse(saved) : [];
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = Array.from(fileList).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    const updated = [...files, ...newFiles];
    setFiles(updated);
    localStorage.setItem('uploadedFiles', JSON.stringify(updated));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (name: string) => {
    const updated = files.filter(f => f.name !== name);
    setFiles(updated);
    localStorage.setItem('uploadedFiles', JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-white/50 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaUpload /> File Uploader
      </h3>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 transition-all duration-300"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <input
          type="file"
          multiple
          ref={inputRef}
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        <p className="text-gray-500">Drag & drop files here, or click to select</p>
      </div>
      <div className="mt-4 space-y-2">
        {files.length === 0 && <p className="text-gray-400">No files uploaded yet.</p>}
        {files.map(file => (
          <div key={file.name} className="flex items-center gap-2 bg-gray-100 rounded p-2">
            <FaFileAlt className="text-gray-500" />
            <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex-1 truncate text-blue-600 hover:underline">{file.name}</a>
            <button onClick={() => handleDelete(file.name)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
