// src/components/GrammarEditModal.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function GrammarEditModal({ grammar, onClose, onUpdated }) {
  const [structure, setStructure] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [level, setLevel] = useState("N5");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (grammar) {
      setStructure(grammar.structure || "");
      setMeaning(grammar.meaning || "");
      setExample(grammar.example || "");
      setLevel(grammar.level || "N5");
    }
  }, [grammar]);

  if (!grammar) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/grammar/${grammar._id}`, {
        structure,
        meaning,
        example,
        level,
      });

      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      console.error("Error updating grammar:", err);
      alert("Có lỗi khi cập nhật ngữ pháp. Kiểm tra console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        <h3 className="text-xl font-bold text-indigo-600 mb-4">Edit Grammar</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Structure + Level */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cấu trúc (Structure)
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
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
              Ý nghĩa
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
            />
          </div>

          {/* Example */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ví dụ
            </label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 min-h-[80px]"
              value={example}
              onChange={(e) => setExample(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
