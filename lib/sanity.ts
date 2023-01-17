import { createClient } from "next-sanity"

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV !== 'production',
  // apiVersion: '2021-03-25'
}

export const sanityClient = createClient(sanityConfig);