export default function FormButton({ type, onClick, Icon }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="flex items-center justify-center bg-yellow-400 cursor-pointer hover:bg-yellow-300 text-black font-bold w-10 h-10 sm:w-16 sm:h-16 rounded-xl shadow-md transition duration-200"
      >
        <Icon className="text-2xl sm:text-4xl" />
      </button>
    );
  }
  