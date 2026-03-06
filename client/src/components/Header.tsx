import { Link } from "react-router-dom";
import HeaderIconButton from "./ui/HeaderIconButton";

export default function Header() {
  return (
    <header className="w-full h-18 bg-white flex items-center shadow-header">
      <div className="mx-auto w-full max-w-360 h-11 flex items-center justify-between max-[420px]:justify-center px-4 sm:px-6">
        <Link to="/" className="inline-flex items-center">
          <img
            src="/logo.svg"
            alt="Kwol"
            className="h-10 w-auto select-none"
            draggable={false}
          />
        </Link>

        <div className="flex items-center gap-2 max-[420px]:hidden">
          <HeaderIconButton ariaLabel="Notifications">
            <img src="/icons/bell.svg" alt="" className="h-5 w-5" />
          </HeaderIconButton>

          <HeaderIconButton to="/users" ariaLabel="Users">
            <img src="/icons/grid.svg" alt="" className="h-5 w-5" />
          </HeaderIconButton>
        </div>
      </div>
    </header>
  );
}