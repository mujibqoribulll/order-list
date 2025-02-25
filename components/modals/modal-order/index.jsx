"use client"
import ButtonText from "@/components/buttons/button-text";

const ModalOrder = (props) => {
  const {
    onClose,
    isOpen,
    disable,
    onChange,
    isLoading,
    form,
    onSubmit,
    options,
    isOpenDropDown,
    setIsOpenDropDown,
    handleSelect,
    selectOption,
  } = props;

  if (!isOpen) {
    document.body.classList.remove("overflow-hidden");
    return null;
  } else {
    document.body.classList.add("overflow-hidden");
  }
  return (
    <div
      className="bg-black bg-opacity-50 flex flex-row fixed inset-0 justify-center items-center z-10"
      onClick={onClose}
    >
      <div
        className="bg-gray-400/40 w-[500px] rounded-md p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold font-mono text-center my-5">
          Create Order
        </h2>
        <form className="flex flex-col gap-y-5 relative" onSubmit={onSubmit}>
          <div className="flex flex-col ">
            <label htmlFor="nameProduct" className="text-base font-mono">
              Product
            </label>
            <div
              type="text"
              className="bg-gray-400/70 outline-none p-3 rounded-md font-mono text-center"
              onClick={setIsOpenDropDown}
            >
              {selectOption ? selectOption : "Dropdown"}
            </div>
          </div>

          {isOpenDropDown && (
            <ul className="top-0 w-full bg-gray-400/70 border-0 rounded shadow-md">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-400"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col">
            <label htmlFor="description" className="text-base font-mono">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={form?.description}
              onChange={onChange}
              className="bg-gray-400/70 outline-none p-3 rounded-md font-mono"
              placeholder="Description"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="qty" className="text-base font-mono">
              QTY
            </label>
            <input
              type="text"
              id="qty"
              name="qty"
              value={form?.qty}
              onChange={onChange}
              className="bg-gray-400/70 outline-none p-3 rounded-md font-mono"
              placeholder="QTY"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-base font-mono">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={form?.price}
              onChange={onChange}
              className="bg-gray-400/70 outline-none p-3 rounded-md font-mono"
              placeholder="Price"
            />
          </div>

          <div className="flex flex-row items-center gap-x-4">
            <ButtonText title="Cancel" onPress={onClose} />
            <ButtonText title="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalOrder;
