// src/components/GrammarForm.jsx
import { useState } from "react";
import axios from "axios";

export default function GrammarForm({ onCreated }) {
  const [structure, setStructure] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [level, setLevel] = useState("N5");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!structure.trim() || !meaning.trim()) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/grammar", {
        structure,
        meaning,
        example,
        level,
      });

      setStructure("");
      setMeaning("");
      setExample("");
      setLevel("N5");

      if (onCreated) onCreated();
    } catch (err) {
      console.error("Error creating grammar:", err);
      alert("Có lỗi khi thêm ngữ pháp. Kiểm tra console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Structure + Level */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cấu trúc (Structure)
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Vる ようになる / ～にくい / ～やすい ..."
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="N5">N5</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
              <option value="N2">N2</option>
              <option value="N1">N1</option>
            </select>
          </div>
        </div>

        {/* Meaning */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ý nghĩa (Meaning – tiếng Việt)
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            placeholder="Diễn tả sự thay đổi trạng thái, dần dần trở nên..."
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          />
        </div>

        {/* Example */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ví dụ (Example – có thể ghi cả Kanji + Hiragana + Romaji)
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 min-h-[80px]"
            placeholder={`日本語が話せるようになりました。\nNihongo ga hanaseru you ni narimashita. – Tôi đã có thể nói tiếng Nhật.`}
            value={example}
            onChange={(e) => setExample(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Saving..." : "Add Grammar"}
          </button>
        </div>
      </form>
    </div>
  );
}
