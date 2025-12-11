export interface ProjectImage {
  url: string;
  alt: string;
}

export interface ProjectMetadata {
  title: string;
  description: string;
  image?: ProjectImage;
  tags: string[];
}

export interface ProjectSection {
  journey?: string;
  technical?: string[];
  features?: string[];
  reality?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  sections: ProjectSection;
  tags: string[];
  date: string;
  image: string | null;
  github: string | null;
  demo: string | null;
  featured?: boolean;
}

export interface FeaturedProject {
  slug: string;
  metadata: ProjectMetadata;
}
