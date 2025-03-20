interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, className = "", ...props }) => {
  return (
    <button
      className={`px-2.5 py-1.5 text-sm bg-green-800 rounded-2xl cursor-pointer disabled:cursor-default disabled:opacity-40 ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
