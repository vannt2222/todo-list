import React from "react";

interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  radius: string;
  width: string;
  textColor?: string;
}

const TheButton: React.FC<Props> = ({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  textColor,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
        color: textColor,
        cursor: "pointer",
        marginRight: 6,
        fontSize:16,
        
      }}
    >
      {children}
    </button>
  );
};

export default TheButton;
