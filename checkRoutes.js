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
