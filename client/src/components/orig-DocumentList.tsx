import { useEffect, useState } from 'react';
import axios from 'axios';

interface Document {
  id: number;
  case_number: string;
  title: string;
  file_path: string;
  created_at: string;
}

function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/documents')
      .then(response => setDocuments(response.data))
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

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
              <td><a href={`http://localhost:3000/${doc.file_path}`} target="_blank">Download</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentList;