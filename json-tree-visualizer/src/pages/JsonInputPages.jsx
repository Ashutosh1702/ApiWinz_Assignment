import { useRef, useState } from "react";
import JsonInput from "../components/JsonInput/JsonInput";
import JsonTreeVisualizer from "../components/JsonTreeVisualizer/JsonTreeVisualizer";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import SearchBar from "../components/JsonTreeVisualizer/SearchBar";

function JsonInputPage() {
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState({ matches: [], currentMatch: -1, hasResults: null });
  const visualizerRef = useRef(null);
  const [dark, setDark] = useState(false);

  const handleJsonParsed = (data) => {
    try {
      setParsedJson(data);
      setError(null);
    } catch (err) {
      setError('Failed to parse JSON. Please check the format and try again.');
      console.error('JSON parsing error:', err);
    }
  };

  const toggleTheme = () => setDark((v) => !v);

  return (
    <div className={`${dark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen p-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">JSON Tree Visualizer</h1>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="px-3 py-1 rounded border">
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
            {parsedJson && (
              <button
                onClick={() => visualizerRef.current?.exportAsPng?.('json-tree.png')}
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Download PNG
              </button>
            )}
          </div>
        </div>
        <JsonInput onJsonParsed={handleJsonParsed} />

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {parsedJson && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 ">JSON Tree Visualization</h2>
            {/* External Search Bar */}
            <div className="mb-4">
              <SearchBar
                onSearch={(term) => visualizerRef.current?.search(term)}
                onClear={() => visualizerRef.current?.clearSearch()}
                searchResults={searchResults}
              />
            </div>

            <div className={`${dark ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
              <ErrorBoundary>
                <JsonTreeVisualizer
                  ref={visualizerRef}
                  jsonData={parsedJson}
                  onSearchResultsChange={setSearchResults}
                />
              </ErrorBoundary>
            </div>
            
            <div className={`mt-8 ${dark ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
              <h2 className="text-xl font-semibold mb-2">Raw JSON Preview:</h2>
              <pre className={`${dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50'} p-3 rounded text-sm overflow-x-auto`}>
                {JSON.stringify(parsedJson, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JsonInputPage;
