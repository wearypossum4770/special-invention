import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

const activeNavigation = ({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "active" : "";

const Navigation = () => {
  const user = useOptionalUser();

  return (
    <header className="main-navigation-header">
      <nav className="main-navigation-container">
        <Link to="/posts" className="text-xl text-blue-600 underline">
          Blog
        </Link>
        {user ? (
          <Link
            to="/notes"
            className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
          >
            View Notes for {user.email}
          </Link>
        ) : (
          <>
            <Link
              to="/join"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
            >
              Log In
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
export default Navigation;
