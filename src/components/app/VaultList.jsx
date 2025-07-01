// components/VaultList.jsx
export default function VaultList({ vaults, onSelect, selected }) {
  return (
    <ul>
      {vaults.map((vault) => (
        <li
          key={vault.id}
          onClick={() => onSelect(vault)}
          className={`p-2 cursor-pointer rounded ${selected?.id === vault.id ? "bg-blue-200" : "hover:bg-blue-50"
            }`}
        >
          {vault.name}
        </li>
      ))}
    </ul>
  );
}
