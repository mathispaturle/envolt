// components/VaultDetail.jsx
export default function VaultDetail({ secrets }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2 text-left">Key</th>
          <th className="border p-2 text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        {secrets.map(({ id, key, value }) => (
          <tr key={id} className="odd:bg-gray-50">
            <td className="border p-2 font-mono">{key}</td>
            <td className="border p-2 font-mono">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
