const Input = ({ htmlFor, label, type, autoFocus, value, onChange, err }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <br />
      <input
        type={type}
        autoFocus={autoFocus}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {err !== "" && <p>{err}</p>}
    </div>
  );
};

export default Input;
