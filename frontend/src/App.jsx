import Form from './components/Form';
import ResumeDetail from './components/ResumeDetail';
import {useState} from "react";

export default function App() {

  const [page, setPage] = useState('Form');
  const [resumeId, setResumeId] = useState(null);

  return page === 'detail' ? <ResumeDetail resumeId={resumeId} /> : <Form onSuccess={(id) => { setResumeId(id); setPage('detail')}} />;
}
