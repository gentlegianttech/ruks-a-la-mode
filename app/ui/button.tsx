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
      className="flex items-center justify-center space-x-4 border-[3px] border-coffee rounded-lg w-fit px-2.5 py-1.5 cursor-pointer hover:bg-[#fea203] hover:bg-opacity-20"
    >
      {loading ? (
        <Audio />
      ) : (
        <p className={`${inter.className} text-base font-bold text-coffee`}>
          {label}
        </p>
      )}

      {icon}
    </div>
  );
}
