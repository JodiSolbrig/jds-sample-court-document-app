import { useState } from 'react';
import DocumentList from './components/DocumentList';
import DocumentUpload from './components/DocumentUpload';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleUploadSuccess = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="container">
      <h1>Court Document Dashboard</h1>
      <DocumentUpload onUploadSuccess={handleUploadSuccess} />
      <DocumentList refresh={refresh} />
    </div>
  );
}

export default App;