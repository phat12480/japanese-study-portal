import axios from "axios";
import { useState } from "react";

export default function VocabList({ data, onDeleted }) {
  const [editing, setEditing] = useState(null);

  // SORT STATE
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // SEARCH STATE
  const [search, setSearch] = useState("");

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/vocab/${id}`);
    onDeleted();
  };

  // EDIT CHANGE
  const handleChange = (field, value) => {
    setEditing({ ...editing, [field]: value });
  };

  // SAVE EDIT
  const saveEdit = async () => {
    await axios.put(`http://localhost:5000/api/vocab/${editing._id}`, editing);
    setEditing(null);
    onDeleted();
  };

  // SORT HANDLING
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // ARROW ICON
  const arrow = (field) =>
    sortField === field ? (sortOrder === "asc" ? " ▲" : " ▼") : "";

  // FILTER DATA BY SEARCH
  const filteredData = data.filter((v) => {
    const keyword = search.toLowerCase();

    return (
      v.kanji?.toLowerCase().includes(keyword) ||
      v.hiragana?.toLowerCase().includes(keyword) ||
      v.romaji?.toLowerCase().includes(keyword) ||
      v.meaning?.toLowerCase().includes(keyword) ||
      v.level?.toLowerCase().includes(keyword)
    );
  });

  // SORT AFTER FILTER
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    let x = a[sortField] || "";
    let y = b[sortField] || "";

    if (sortOrder === "asc") {
      return x.localeCompare(y);
    } else {
      return y.localeCompare(x);
    }
  });

  return (
    <div className="mt-6">
      {/* SEARCH BAR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search kanji / hiragana / romaji / meaning / level..."
          className="border p-2 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="text-xl font-bold mb-3">Vocabulary List</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("kanji")}
            >
              Kanji{arrow("kanji")}
            </th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("hiragana")}
            >
              Hiragana{arrow("hiragana")}
            </th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("romaji")}
            >
              Romaji{arrow("romaji")}
            </th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("meaning")}
            >
              Meaning{arrow("meaning")}
            </th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("level")}
            >
              Level{arrow("level")}
            </th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((v) => (
            <tr key={v._id}>
              {/* EDIT MODE */}
              {editing?._id === v._id ? (
                <>
                  <td className="border p-2">
                    <input
                      className="border p-1 w-full"
                      value={editing.kanji}
                      onChange={(e) => handleChange("kanji", e.target.value)}
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      className="border p-1 w-full"
                      value={editing.hiragana}
                      onChange={(e) => handleChange("hiragana", e.target.value)}
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      className="border p-1 w-full"
                      value={editing.romaji}
                      onChange={(e) => handleChange("romaji", e.target.value)}
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      className="border p-1 w-full"
                      value={editing.meaning}
                      onChange={(e) => handleChange("meaning", e.target.value)}
                    />
                  </td>

                  <td className="border p-2">
                    <select
                      className="border p-1 w-full"
                      value={editing.level}
                      onChange={(e) => handleChange("level", e.target.value)}
                    >
                      <option>N5</option>
                      <option>N4</option>
                      <option>N3</option>
                      <option>N2</option>
                      <option>N1</option>
                    </select>
                  </td>

                  <td className="border p-2 flex gap-2">
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                /* NORMAL MODE */
                <>
                  <td className="border p-2">{v.kanji}</td>
                  <td className="border p-2">{v.hiragana}</td>
                  <td className="border p-2">{v.romaji}</td>
                  <td className="border p-2">{v.meaning}</td>
                  <td className="border p-2">{v.level}</td>

                  <td className="border p-2 flex gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => setEditing(v)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(v._id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
