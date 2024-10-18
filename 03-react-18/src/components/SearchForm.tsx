import React, { useId, useTransition } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [isPending, startTransition] = useTransition();
  const id = useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    startTransition(() => onSearch(value));
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-2">
        Search:
      </label>
      <input
        id={id}
        type="text"
        onChange={handleChange}
        className="border rounded p-2 w-full"
        placeholder="Type to search..."
      />
      {isPending && <p className="text-gray-500">Updating search results...</p>}
    </div>
  );
};

export default SearchForm;
