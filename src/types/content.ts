export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  year: string;
  image: string;
  imageAlt: string;
  /** Leave empty until an approved public link exists. */
  url?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  /** Slug of the project whose image illustrates this service. */
  project: string;
}
