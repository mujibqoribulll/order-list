const ButtonText = (props) => {
  const {
    title,
    onPress,
    isLoading = false,
    cancel,
    stylesContainer,
    type,
  } = props;
  return (
    <button
      type={type}
      className={`bg-gray-700 hover:bg-gray-600 px-6 py-2 font-mono text-lg rounded-lg ${
        stylesContainer ? stylesContainer : "w-full"
      } `}
      onClick={onPress}
    >
      {isLoading ? (
        <div className="flex flex-row justify-evenly items-center gap-3">
          <p>Loading</p>
          <div className="border-2 border-slate-900/40 border-x-white h-5 w-5 rounded-full animate-spin" />
        </div>
      ) : (
        title
      )}
    </button>
  );
};

export default ButtonText;
