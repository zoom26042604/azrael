import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ExternalLink, Github, Tag } from "lucide-react";
import { Project } from "@/src/types";
import { getTagColor } from "@/src/lib/tagColors";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { getProjectTranslation } from "@/src/data/projectTranslations";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();

  // Get translated content
  const translatedContent = useMemo(
    () => getProjectTranslation(project.slug, language),
    [project.slug, language]
  );

  const title = translatedContent?.title || project.title;
  const description = translatedContent?.description || project.description;

  return (
    <Link 
      href={`/projects/${project.slug}`} 
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 rounded-xl"
      aria-label={`${title} - ${description}`}
    >
      <article
        className="flex h-full flex-col overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl"
        style={{
          borderColor: "var(--color-surface0)",
          backgroundColor: "var(--color-mantle)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-surface0)";
        }}
      >
        {/* Image */}
        {project.image ? (
          <div
            className="relative aspect-[2/1] w-full overflow-hidden"
            style={{
              viewTransitionName: `project-img-${project.slug}`,
            } as React.CSSProperties}
          >
            <Image
              src={project.image}
              alt=""
              fill
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.backgroundColor = "var(--color-surface2)";
                }
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div
            className="aspect-[2/1] w-full overflow-hidden"
            style={{
              backgroundColor: "var(--color-surface2)",
              viewTransitionName: `project-img-${project.slug}`,
            } as React.CSSProperties}
          />
        )}

        {/* Contenu - padding réduit */}
        <div className="space-y-2 p-4">
          {/* Title - taille réduite */}
          <h3
            className="text-base sm:text-lg font-semibold transition-colors group-hover:text-accent line-clamp-1"
            style={{
              color: "var(--color-text)",
              viewTransitionName: `project-title-${project.slug}`,
            } as React.CSSProperties}
          >
            {title}
          </h3>

          {/* Description - plus visible comme nyx */}
          <p
            className="line-clamp-3 text-sm"
            style={{ color: "var(--color-subtext0)" }}
          >
            {description}
          </p>

          {/* Tags - style sobre cohérent */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ 
                    backgroundColor: 'var(--color-surface0)', 
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-surface2)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
