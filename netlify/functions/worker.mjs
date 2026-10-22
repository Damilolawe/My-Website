import { runJobs } from "../../platform/production.mjs";
import { ready } from "../../platform/backend.mjs";
export default async () => {
  if (ready()) await runJobs(3);
};
export const config = { schedule: "*/10 * * * *" };
