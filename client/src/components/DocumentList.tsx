import { useEffect, useState } from 'react';
import axios from 'axios';

interface Document {
  id: number;
  case_number: string;
  title: string;
  file_path: string;
  created_at: string;
}

function DocumentList({ refresh }: { refresh: number }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://4f4df5fc6883.ngrok-free.app/documents', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(response => {
        console.log('Fetch response:', response.status, response.data);
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Fetch error:', error.message, error.response?.status, error.response?.data);
        setError('Failed to load documents: ' + (error.response?.data?.error || error.message));
      });
  }, [refresh]);

  if (error) return <div>{error}</div>;
  if (documents.length === 0) return <div>No documents found.</div>;

  return (
    <div>
      <h2>Documents</h2>
      <table>
        <thead>
          <tr>
            <th>Case Number</th>
            <th>Title</th>
            <th>Created At</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.case_number}</td>
              <td>{doc.title}</td>
              <td>{new Date(doc.created_at).toLocaleDateString()}</td>
              <td><a href={`https://4f4df5fc6883.ngrok-free.app/${doc.file_path}`} target="_blank">Download</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentList;