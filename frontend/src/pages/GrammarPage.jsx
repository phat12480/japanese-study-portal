// src/pages/GrammarPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

import GrammarForm from "../components/GrammarForm";
import GrammarList from "../components/GrammarList";

export default function GrammarPage() {
  const [grammarData, setGrammarData] = useState([]);

  const loadGrammar = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/grammar");
      setGrammarData(res.data);
    } catch (err) {
      console.error("Error loading grammar:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadGrammar();
    };
    fetchData();
  }, []);
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Japanese Grammar Manager
      </h2>

      <GrammarForm onCreated={loadGrammar} />
      <GrammarList data={grammarData} onChanged={loadGrammar} />
    </div>
  );
}
