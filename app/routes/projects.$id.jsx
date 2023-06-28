import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { findProject } from "~/models/project.server"

export const loader = async ({ params }) =>json({ project: await findProject(params.id) });


const ProjectDetails = () => {
  const {project} = useLoaderData();

  return (
    <div>
      
      <h2>{project.title}</h2>
    </div>
  );
};
export default ProjectDetails;
