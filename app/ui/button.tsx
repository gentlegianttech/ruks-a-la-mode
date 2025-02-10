import { ReactNode } from "react";
import { inter } from "../../styles/fonts";
import { Audio } from "react-loader-spinner";

interface ButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  icon?: ReactNode;
}
export default function Button({ label, onClick, icon, loading }: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center space-x-4 border border-coffee w-fit px-2.5 py-1.5 cursor-pointer "
    >
      {loading ? (
        <Audio />
      ) : (
        <p
          className={`${inter.className} text-base font-medium text-coffee hover:opacity-60`}
        >
          {label}
        </p>
      )}

      {icon}
    </div>
  );
}
