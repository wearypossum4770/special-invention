import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData, Link } from "@remix-run/react";
import { getProjects } from "~/models/project.server";
export const loader = async () => json(await getProjects());
const ProjectList = () => {
  const projects = useLoaderData();
  return (
    <>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li id={project.id} key={project.id}>
            <Link to={project.id}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ProjectList;
