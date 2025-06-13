import { useRef } from "react";

interface IProps {
  onClick: (email: string) => void;
  email: string;
}

export function TrashButton(props: IProps) {
  const iconRef = useRef(null);

  function handleClick() {
    props.onClick(props.email);
  }

  return (
    <button
      onMouseEnter={() => {
        {
          if (iconRef.current) {
            // @ts-expect-error bla bla
            iconRef.current.setAttribute("color", "red");
          }
        }
      }}
      onMouseLeave={() => {
        if (iconRef.current) {
          // @ts-expect-error bla bla
          iconRef.current.setAttribute("color", "black");
        }
      }}
      onClick={handleClick}
    >
      <box-icon name="trash" size="sm" ref={iconRef} />
    </button>
  );
}
