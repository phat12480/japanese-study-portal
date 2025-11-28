import VocabularyPage from "./pages/VocabularyPage";

export default function App() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        Japanese Vocabulary Manager
      </h1>
      <VocabularyPage />
    </div>
  );
}
