import "./Widget.css";

export default function Widget(props) {
  const { title, children, action, className } = props;
  return (
    <div className={`widget-base ${className}`}>
      <div className="widget-title-row">
        <h2 className="widget-title">{title}</h2>
        {action && (
          <button className="widget-action" onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>

      {children}
    </div>
  );
}
