import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "5yty8k8t",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-03-25",
});
