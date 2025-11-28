import { useEffect, useState } from "react";
import axios from "axios";
import VocabForm from "../components/VocabForm";
import VocabList from "../components/VocabList";

export default function VocabularyPage() {
  const [vocabList, setVocabList] = useState([]);

  // Load vocabulary when page loads
  const loadVocab = async () => {
    const res = await axios.get("http://localhost:5000/api/vocab");
    setVocabList(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadVocab();
    };
    fetchData();
  }, []);

  return (
    <div>
      <VocabForm onAdded={loadVocab} />
      <VocabList data={vocabList} onDeleted={loadVocab} />
    </div>
  );
}
