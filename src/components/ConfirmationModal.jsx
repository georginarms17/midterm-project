import React from "react";

const ConfirmationModal = ({
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded shadow p-6 w-96">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2">{message}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Yes, Cancel
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;
