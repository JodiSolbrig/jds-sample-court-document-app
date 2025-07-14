import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface DocumentUploadProps {
  onUploadSuccess: () => void;
}

function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const [caseNumber, setCaseNumber] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('case_number', caseNumber);
    formData.append('title', title);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload response:', response.status, response.data);
      alert('Document uploaded successfully');
      onUploadSuccess();
      setCaseNumber('');
      setTitle('');
      setFile(null);
    } catch (error) {
      const axiosError = error as AxiosError<{ error?: string }>;
      console.error('Upload error:', axiosError.message, axiosError.response?.status, axiosError.response?.data);
      alert('Upload failed: ' + (axiosError.response?.data?.error || axiosError.message));
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Case Number:</label>
          <input
            type="text"
            value={caseNumber}
            onChange={e => setCaseNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File (PDF):</label>
          <input
            type="file"
            accept=".pdf"
            onChange={e => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default DocumentUpload;