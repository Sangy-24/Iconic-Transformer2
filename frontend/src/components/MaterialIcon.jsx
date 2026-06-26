const MaterialIcon = ({ name, filled = false, className = "", weight = 300, ...props }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{
      fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
    }}
    {...props}
  >
    {name}
  </span>
);

export default MaterialIcon;
