import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

const activeNavigation = ({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "active" : "";

const Navigation = () => {
  const user = useOptionalUser();

  return (
    <header className="main-navigation-header">
      <nav className="main-navigation-container">
        <Link to="/posts">Blog</Link>
        <Link to="/projects">Projects</Link>
        {user ? (
          <Link to="/notes">View Notes for {user.email}</Link>
        ) : (
          <>
            <Link to="/join">Sign up</Link>
            <Link to="/login">Log In</Link>
          </>
        )}
      </nav>
    </header>
  );
};
export default Navigation;
