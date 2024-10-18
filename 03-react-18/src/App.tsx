import React, { Suspense, useState } from "react";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">React 18</h1>
      <SearchForm onSearch={setQuery} />
      <Suspense fallback={<p>Loading search results...</p>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
};

export default App;
