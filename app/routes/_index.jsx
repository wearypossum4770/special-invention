export const meta = ({ location, matches, data, paramsk }) => [
  { title: "Remix Notes" },
];
const menuItems = [
  { id: 1, icon: "solid|house", label: "dashboard", to: "" },
  { id: 2, icon: "solid|pen-to-square", label: "add blog post", to: "" },
  { id: 3, icon: "sharp|solid|calendar-days", label: "calendar", to: "" },
  { id: 4, icon: "solid|user", label: "members", to: "" },
  { id: 5, icon: "solid|comment-dots", label: "comments", to: "" },
  { id: 6, icon: "solid|image", label: "gallery", to: "" },
  { id: 7, icon: "solid|folder", label: "projects", to: "/projects" },
  { id: 8, icon: "solid|handshake", label: "sign up", to: "/join" },
  { id: 9, icon: "solid|user", label: "login in", to: "/login" },
  { id: 10, icon: "solid|rectangle-list", label: "tasks", to: "/tasks" },
  { id: 11, icon: "solid|gear", label: "settings", to: "/user/settings" },
];

const Index = () => {
  return (
    <aside className="blog-sidebar">
      <form className="blog-sidebar-search-form">
        <div className="form-group">
          <label htmlFor="blog-sidebar-search-input">Site Search:</label>
          <span>
            <input
              id="blog-sidebar-search-input"
              type="search"
              name="sidebar"
            />
            <button type="button" id="blog-sidebar-search-button">
              Search
            </button>
          </span>
        </div>
      </form>
      <ul className="blog-sidebar-nav-list">
        {menuItems.map((item) => (
          <li key={item.id} className="blog-sidebar-nav-link">
            <a href={item.to}>
              <i
                className={item.icon
                  .split("|")
                  .reduce((a, c) => a + `fa-${c} `, "")}
              ></i>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Index;
