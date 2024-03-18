/* eslint-disable react/prop-types */

function FormRow({ children, label, error, className }) {
  return (
    <div className={`flex flex-col gap-[0.2rem] ${className}`}>
      <div className="flex items-center justify-between">
        {label && <label htmlFor={children.props.id}>{label}</label>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
      {children}
    </div>
  );
}

export default FormRow;
