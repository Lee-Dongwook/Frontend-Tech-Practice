import React, { useDeferredValue } from "react";

interface SearchResultsProps {
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const deferredQuery = useDeferredValue(query);
  const results = Array(1000)
    .fill(0)
    .map((_, index) => `${deferredQuery} - Result ${index + 1}`);

  return (
    <ul className="h-64 overflow-auto border mt-4 p-2">
      {results.map((result, index) => (
        <li key={index} className="py-1">
          {result}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
