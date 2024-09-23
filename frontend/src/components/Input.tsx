interface Input {
  type: string;
  name: string;
  placeholder: string;
  label: string;
}
export const Input = ({ type, name, placeholder, label }: Input) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={name} className='text-gray-950 text-lg font-semibold'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className='p-3 border border-gray-300 rounded-lg'
      />
    </div>
  );
};
