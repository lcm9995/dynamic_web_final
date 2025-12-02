import "./Widget.css";
import Draggable from "react-draggable";
import {useRef} from "react";
export default function Widget(props) {
  const { title, children, action, className } = props;
  const ref = useRef(null);
  return (
    <Draggable nodeRef={ref} handle=".drag-handle">
        <div ref={ref} className={`widget-base ${className}`}>
          <div className="widget-title-row drag-handle">
            <h2 className="widget-title">{title}</h2>
            {action && (
              <button className="widget-action" onClick={action.onClick}>
                {action.label}
              </button>
            )}
          </div>
        {children}
      </div>
     </Draggable>
  );
}
