import { useState } from "react";
import axios from "axios";

export default function VocabForm({ onAdded }) {
  const [form, setForm] = useState({
    kanji: "",
    hiragana: "",
    romaji: "",
    meaning: "",
    level: "N5",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/vocab", form);
    setForm({ kanji: "", hiragana: "", romaji: "", meaning: "", level: "N5" });
    onAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mb-6 border rounded-md bg-white shadow"
    >
      <h2 className="text-xl font-bold mb-3">Add New Vocabulary</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2"
          name="kanji"
          placeholder="Kanji"
          value={form.kanji}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          name="hiragana"
          placeholder="Hiragana"
          value={form.hiragana}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          name="romaji"
          placeholder="Romaji"
          value={form.romaji}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          name="meaning"
          placeholder="Meaning"
          value={form.meaning}
          onChange={handleChange}
        />

        <select
          className="border p-2"
          name="level"
          value={form.level}
          onChange={handleChange}
        >
          <option>N5</option>
          <option>N4</option>
          <option>N3</option>
          <option>N2</option>
          <option>N1</option>
        </select>
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Vocab
      </button>
    </form>
  );
}
