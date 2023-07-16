const { readFile, writeFile, mkdir } = require("fs");
const { dirname } = require("path");
const routes = [
  "app/routes/posts.$slug.jsx",
  "app/routes/posts.admin.jsx",
  "app/routes/posts.admin._index.jsx",
  "app/routes/posts.admin.new.jsx",
  "app/routes/posts.admin.$slug.jsx",
  "app/routes/projects._index.jsx",
  "app/routes/projects.$id.jsx",

// "app/routes/_auth.login.jsx",
// "app/routes/_auth.logout.jsx",
// "app/routes/_auth.signup.jsx",
// "app/routes/_auth.jsx",
// "app/routes/_public._index.jsx",
// "app/routes/_public.about-us.jsx",
// "app/routes/_public.contact.jsx",
// "app/routes/_public.jsx",
// "app/routes/dashboard._index.jsx",
// "app/routes/dashboard.calendar._index.jsx",
// "app/routes/dashboard.calendar.$day.jsx",
// "app/routes/dashboard.calendar.jsx",
// "app/routes/dashboard.projects.$projectId._index.jsx",
// "app/routes/dashboard.projects.$projectId.collaborators.jsx",
// "app/routes/dashboard.projects.$projectId.edit.jsx",
// "app/routes/dashboard.projects.$projectId.settings.jsx",
// "app/routes/dashboard.projects.$projectId.tasks.$taskId.jsx",
// "app/routes/dashboard.projects.$projectId.jsx",
// "app/routes/dashboard.projects.new.jsx",
// "app/routes/dashboard.projects.jsx",
// "app/routes/dashboard_.projects.$projectId.print.jsx",
];

for (let i = 0; i < routes.length; i++) {
  readFile(routes[i], (err, data) => {
    if (err?.code === "ENOENT") {
      return writeFile(routes[i], "", (err) => {
        if (err)
          return mkdir(dirname(routes[i]), { recursive: true }, (err) => {
            if (err) {
              console.log("could not make parent directories.");
            } else {
              console.log(`Creating the parent directories.
            Ensure it was created correctly.
            Check all parent locations exists for this file ${routes[i]}
            `);
            }
          });
      });
    }
    return data;
  });
}
