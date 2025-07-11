import DocumentList from './components/DocumentList';
import DocumentUpload from './components/DocumentUpload';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Court Document Dashboard</h1>
      <DocumentUpload />
      <DocumentList />
    </div>
  );
}

export default App;