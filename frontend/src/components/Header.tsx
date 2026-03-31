import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border/50 px-6 flex items-center">
      <nav className="flex items-center divide-x divide-border/40 text-accent">
        <NavLink
          to="/products"
          className={({ isActive }) => `px-6 transition-all duration-200 ${
      isActive ? "underline decoration-accent decoration-2 underline-offset-8 font-bold"
        : "font-light hover:font-semibold" }`}
        >
          Shop
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `px-6 transition-all duration-200 ${
              isActive
                ? "underline decoration-accent decoration-2 underline-offset-8 font-bold"
                : "font-light hover:font-semibold"
            }`
          }
        >
          Shopping Cart
        </NavLink>
      </nav>
    </header>
  );
};
