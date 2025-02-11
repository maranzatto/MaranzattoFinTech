export function Input({ error, ...props }) {
  return (
    <input
      {...props}
      className={`input-theme ${error ? 'input-error' : ''} ${props.className || ''}`}
      style={{
        ...props.style,
        outline: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
      }}
    />
  );
} 