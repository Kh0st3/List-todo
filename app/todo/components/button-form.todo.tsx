"use client";

import { useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa";

const ButtonForm = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="border border-gray-400 rounded w-28 grid place-items-center"
      disabled={pending}
    >
      {pending ? (
        <span className="block animate-spin">
          <FaSpinner className="transform rotate-90" />
        </span>
      ) : (
        "Submit"
      )}
    </button>
  );
};
export default ButtonForm;
