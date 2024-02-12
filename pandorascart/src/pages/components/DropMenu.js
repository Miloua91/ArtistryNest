export default function DropDown({
  label,
  options,
  selectedOption,
  onOptionChange,
}) {
  const optionItems = Array.isArray(options) ? options : [];

  function handleSelectChange(event) {
    onOptionChange(event.target.value);
  }

  return (
    <div className="drop-down">
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">{label}</option>
        {optionItems.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
