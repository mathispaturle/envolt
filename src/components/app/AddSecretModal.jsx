// components/AddSecretModal.jsx
import { useState } from 'react';

export default function AddSecretModal({ onClose, onAdd }) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-xl font-bold mb-4">Add Secret</h3>
        <input
          type="text"
          placeholder="Key (e.g. API_KEY)"
          className="w-full p-2 border mb-4 font-mono"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          className="w-full p-2 border mb-4 font-mono"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2">
            Cancel
          </button>
          <button
            disabled={!key || !value}
            onClick={() => onAdd(key, value)}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
