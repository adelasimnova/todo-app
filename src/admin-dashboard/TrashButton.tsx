import { useRef } from "react";

interface IProps {
  onClick: (id: string) => void;
  id: string;
  disabled: boolean;
}

export function TrashButton(props: IProps) {
  const iconRef = useRef(null);

  function handleClick() {
    props.onClick(props.id);
  }

  function onHover() {
    if (iconRef.current) {
      // @ts-expect-error bla bla
      iconRef.current.setAttribute("color", "red");
    }
  }

  function onUnhover() {
    if (iconRef.current) {
      // @ts-expect-error bla bla
      iconRef.current.setAttribute("color", "black");
    }
  }

  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
      onClick={handleClick}
      disabled={props.disabled}
    >
      <box-icon name="trash" size="sm" ref={iconRef} />
    </button>
  );
}
