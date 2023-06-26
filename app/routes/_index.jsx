export const meta = ({ location, matches, data, paramsk }) => [
  { title: "Remix Notes" },
];
const menuItems = [
  { id: 1, icon: "fa-solid fa-house", label: "dashboard", to: "" },
  { id: 2, icon: "fa-solid fa-pen-to-square", label: "add blog post", to: "" },
  {
    id: 3,
    icon: "fa-sharp fa-solid fa-calendar-days",
    label: "calendar",
    to: "",
  },
  { id: 4, icon: "fa-solid fa-user", label: "members", to: "" },
  { id: 5, icon: "fa-solid fa-comment-dots", label: "comments", to: "" },
  { id: 6, icon: "fa-solid fa-image", label: "gallery", to: "" },
];

const Index = () => (
  <aside className="blog-sidebar">
    <form className="blog-sidebar-search-form">
      <div className="form-group">
        <label htmlFor="blog-sidebar-search-input">Site Search:</label>
        <span>
          <input id="blog-sidebar-search-input" type="search" name="sidebar" />
          <button id="blog-sidebar-search-button" type="submit">
            Search
          </button>
        </span>
      </div>
    </form>
    <ul className="blog-sidebar-nav-list">
      {menuItems.map((item) => (
        <li key={item.id} className="blog-sidebar-nav-link">
          <a href={item.to}>
            <i className={item.icon}></i>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);

export default Index;
