import { useState } from 'react';
import axios from 'axios';

function DocumentUpload() {
  const [caseNumber, setCaseNumber] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('case_number', caseNumber);
    formData.append('title', title);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/documents', formData);
      alert('Document uploaded successfully');
      setCaseNumber('');
      setTitle('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Upload failed');
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