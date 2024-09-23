interface Button {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  text: string;
  className?: string;
}
export const Button = ({ type, onClick, text, className }: Button) => {
  return (
    <div>
      <button
        className={`bg-gray-950 text-center rounded-lg py-4 w-full text-white font-semibold text-lg  ${className}`}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
