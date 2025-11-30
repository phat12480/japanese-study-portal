// src/components/GrammarList.jsx
import { useMemo, useState } from "react";
import axios from "axios";
import GrammarEditModal from "./GrammarEditModal";

export default function GrammarList({ data, onChanged }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("level");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingGrammar, setEditingGrammar] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa mẫu ngữ pháp này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/grammar/${id}`);
      if (onChanged) onChanged();
    } catch (err) {
      console.error("Error deleting grammar:", err);
      alert("Có lỗi khi xóa. Kiểm tra console.");
    }
  };

  const filteredAndSorted = useMemo(() => {
    const s = search.toLowerCase();

    let result = data.filter((g) => {
      const combined =
        `${g.structure} ${g.meaning} ${g.example} ${g.level}`.toLowerCase();
      return combined.includes(s);
    });

    result.sort((a, b) => {
      if (sortBy === "structure") {
        const A = a.structure || "";
        const B = b.structure || "";
        return sortOrder === "asc" ? A.localeCompare(B) : B.localeCompare(A);
      }

      if (sortBy === "level") {
        const order = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
        const A = order[a.level] || 99;
        const B = order[b.level] || 99;
        return sortOrder === "asc" ? A - B : B - A;
      }

      return 0;
    });

    return result;
  }, [data, search, sortBy, sortOrder]);

  return (
    <div>
      {/* Search + Sort Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by structure / meaning / level..."
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <select
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="level">Sort by Level</option>
            <option value="structure">Sort by Structure</option>
          </select>

          <button
            type="button"
            className="border rounded-lg px-3 py-2 text-sm bg-white hover:bg-gray-50 flex items-center gap-1"
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
          </button>
        </div>
      </div>

      {/* List */}
      {filteredAndSorted.length === 0 ? (
        <p className="text-gray-500 italic">
          Chưa có ngữ pháp hoặc không tìm thấy kết quả phù hợp.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredAndSorted.map((g) => (
            <div
              key={g._id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {g.structure}
                </h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-600">
                  {g.level || "N?"}
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Ý nghĩa: </span>
                {g.meaning}
              </p>

              {g.example && (
                <p className="text-sm text-gray-600 italic whitespace-pre-line mb-3">
                  {g.example}
                </p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded-lg border border-indigo-500 text-indigo-600 text-sm hover:bg-indigo-50"
                  onClick={() => setEditingGrammar(g)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                  onClick={() => handleDelete(g._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <GrammarEditModal
        grammar={editingGrammar}
        onClose={() => setEditingGrammar(null)}
        onUpdated={onChanged}
      />
    </div>
  );
}
