import { useState } from "react";
import { validateAndParseJSON } from "../../utils/JsonUtils";

const sampleJson = `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
      "country": "USA"
    },
    "items": [
      { "name": "item1" },
      { "name": "item2" }
    ]
  }
}`;

function JsonInput({ onJsonParsed }) {
  const [input, setInput] = useState(sampleJson);
  const [error, setError] = useState("");

  const handleVisualize = () => {
    const result = validateAndParseJSON(input);
    if (result.valid) {
      setError("");
      onJsonParsed(result.data);
    } else {
      setError(result.error);
    }
  };

  const handleClear = () => {
    setInput("");
    setError("");
    onJsonParsed(null);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4  ">JSON Input</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-64 p-3 border rounded-md font-mono text-sm bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Paste or type your JSON here..."
      />

      {error && <p className="text-red-500 mt-2 font-medium">{error}</p>}

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleVisualize}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Generate Tree
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-all"
        >
          Clear / Reset
        </button>
      </div>
    </div>
  );
}

export default JsonInput;
