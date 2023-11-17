export default function DropDown({ label, options, selectedOption, onOptionChange}){
    function handleSelectChange(event) {
        onOptionChange(event.target.value);
    }
    
    return(
        <div className='drop-down'>
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value=''>{label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}