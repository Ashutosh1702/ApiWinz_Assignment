import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch, onClear, searchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  const searchInputRef = useRef(null);
  const examplesRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  const handleExampleClick = (example) => {
    setSearchTerm(example);
    // Wait a short delay to let input update before triggering search
    setTimeout(() => onSearch(example), 100);
    setShowExamples(false);
  };

  // Close examples when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        examplesRef.current &&
        !examplesRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowExamples(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchExamples = [
    { label: 'User name', path: 'user.name' },
    { label: 'First item name', path: 'items[0].name' },
    { label: 'Address city', path: 'user.address.city' },
    { label: 'Second item price', path: 'items[1].price' },
  ];

  return (
    <div className="relative mb-4 w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowExamples(true)}
              placeholder="Search by path (e.g., user.name, items[0].id)"
              className="w-full p-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!searchTerm.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Search
          </button>
        </div>

        <div className="text-sm min-h-6">
          {searchResults?.hasResults === false && searchTerm && (
            <div className="text-red-600 flex items-center gap-2 flex-wrap">
              <span>No matches found. Try:</span>
              {['user', 'items[0]', 'address'].map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => handleExampleClick(ex)}
                  className="text-blue-600 hover:underline"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}
          {searchResults?.hasResults && searchTerm && (
            <div className="text-green-600">
              Found {searchResults.matches.length} match
              {searchResults.matches.length !== 1 ? 'es' : ''}
            </div>
          )}
        </div>
      </form>

      <div className="relative mt-1" ref={examplesRef}>
        <button
          type="button"
          onClick={() => setShowExamples((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline flex items-center"
        >
          {showExamples ? 'Hide examples' : 'Show search examples'}
          <svg
            className={`ml-1 h-4 w-4 transform transition-transform ${showExamples ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showExamples && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Search Examples:</h4>
            <ul className="space-y-2">
              {searchExamples.map((example, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleExampleClick(example.path)}
                    className="text-left w-full px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md"
                  >
                    <div className="font-medium text-gray-900">{example.label}</div>
                    <div className="text-blue-600 font-mono text-xs">{example.path}</div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1">
              <div>• Use dot notation: <code className="bg-gray-100 px-1 rounded">user.name</code></div>
              <div>• Use brackets for arrays: <code className="bg-gray-100 px-1 rounded">items[0]</code></div>
              <div>• Try property names: <code className="bg-gray-100 px-1 rounded">name</code>, <code className="bg-gray-100 px-1 rounded">price</code></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
