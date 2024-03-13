/* eslint-disable react/prop-types */
function Filter({ options }) {
  return (
    <div>
      {options.map((option, i) => (
        <button key={i}>{option.label}</button>
      ))}
    </div>
  );
}

export default Filter;
