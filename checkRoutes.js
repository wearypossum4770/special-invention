const { readFile, writeFile } = require("fs");

const routes = [
  "app/routes/posts.$slug.jsx",
  "app/routes/posts.admin.jsx",
  "app/routes/posts.admin._index.jsx",
  "app/routes/posts.admin.new.jsx",
  "app/routes/posts.admin.$slug.jsx",
];

for (let i = 0; i < routes.length; i++) {
  readFile(routes[i], (err, data) => {
    if (err?.code === "ENOENT") {
      return writeFile(routes[i], "", (err) => {
        if (err)
          console.log(
            `Check all parent locations exists for this file ${routes[i]}`
          );
      });
    }
    return data;
  });
}
