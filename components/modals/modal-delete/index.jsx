"use client";
import ButtonText from "@/components/buttons/button-text";

const ModalDelete = (props) => {
  const { onClose, isOpen, onDelete } = props;

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
          Are you sure want to delete ?
        </h2>

        <div className="flex flex-row items-center gap-x-4">
          <ButtonText title="Cancel" onPress={onClose} />
          <ButtonText title="Yes" onPress={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
