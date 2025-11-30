import "./Widget.css";

export default function Widget(props) {
  const { title, children } = props;

  return (
    <div className="widget">
      <h2 className="widget-title">{title}</h2>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
}
