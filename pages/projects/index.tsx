import { useState, useMemo, useEffect } from 'react';
import { Folder, Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '@/src/data/projects';
import ProjectCard from '@/src/components/features/ProjectCard';
import { useLanguage } from '@/src/contexts/LanguageContext';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'default'>('default');
  const [showQuickFilters, setShowQuickFilters] = useState(() => {
    // Charger l'état depuis localStorage au chargement initial
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('projects-show-quick-filters');
      return saved !== null ? saved === 'true' : true; // true par défaut
    }
    return true;
  });

  // Sauvegarder l'état dans localStorage quand il change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('projects-show-quick-filters', String(showQuickFilters));
    }
  }, [showQuickFilters]);

  // Liste des tags qui sont des types de projet (à exclure des filtres rapides)
  const projectTypesTags = ['portfolio', 'ecommerce', 'blog'];

  // Extraire tous les tags technologiques (en excluant les types de projet)
  const techTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => {
        if (!projectTypesTags.includes(tag.toLowerCase())) {
          tagsSet.add(tag);
        }
      });
    });
    return Array.from(tagsSet).sort();
  }, []);

  // Filtrer et trier les projets
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filtrer par recherche textuelle
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filtrer par tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(project => project.tags.includes(selectedTag));
    }

    // Trier
    if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'date') {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.date || '2024-01-01').getTime();
        const dateB = new Date(b.date || '2024-01-01').getTime();
        return dateB - dateA; // Plus récent en premier
      });
    }

    return filtered;
  }, [searchQuery, selectedTag, sortBy]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6">
      <div className="space-y-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold fade-in">
          <Folder size={30} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
          <span>{t('projects.title')}</span>
        </h1>
        
        <p 
          className="text-lg"
          style={{ color: 'var(--color-subtext0)' }}
        >
          {t('projects.description')}
        </p>
      </div>

      {/* Filter Bar */}
      <div 
        className="rounded-lg border p-4 space-y-4"
        style={{
          backgroundColor: 'var(--color-surface0)',
          borderColor: 'var(--color-surface1)'
        }}
      >
        {/* Search Bar + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-subtext1)' }}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder={t('projects.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t('projects.search_placeholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-base)',
                borderColor: 'var(--color-surface2)',
                color: 'var(--color-text)',
                '--tw-ring-color': 'var(--color-accent)'
              } as any}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative sm:w-48">
            <SlidersHorizontal 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--color-subtext1)' }}
              aria-hidden="true"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label={t('projects.sort_label')}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer"
              style={{
                backgroundColor: 'var(--color-base)',
                borderColor: 'var(--color-surface2)',
                color: 'var(--color-text)',
                '--tw-ring-color': 'var(--color-accent)'
              } as any}
            >
              <option value="default">{t('projects.sort_default')}</option>
              <option value="name">{t('projects.sort_name')}</option>
              <option value="date">{t('projects.sort_date')}</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tags - Collapsible */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowQuickFilters(!showQuickFilters)}
            aria-label={showQuickFilters ? t('projects.hide_filters') : t('projects.show_filters')}
            aria-expanded={showQuickFilters}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide transition-colors w-fit"
            style={{ color: 'var(--color-subtext1)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
          >
            {t('projects.quick_filters')}
            {showQuickFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          {showQuickFilters && (
            <div className="flex flex-wrap gap-2 animate-in fade-in duration-200">
              <button
                onClick={() => setSelectedTag('all')}
                aria-label={`${t('projects.all_projects')} (${projects.length})`}
                aria-pressed={selectedTag === 'all'}
                className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: selectedTag === 'all' ? 'var(--color-accent)' : 'var(--color-surface1)',
                  color: selectedTag === 'all' ? 'var(--color-base)' : 'var(--color-text)',
                  border: selectedTag === 'all' ? '2px solid var(--color-accent)' : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (selectedTag !== 'all') {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTag !== 'all') {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface1)';
                  }
                }}
              >
                {t('projects.all_projects')} ({projects.length})
              </button>
              {techTags.map(tag => {
                const count = projects.filter(p => p.tags.includes(tag)).length;
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    aria-label={`${t('projects.filter_by')} ${tag} (${count} ${t('projects.results_found')})`}
                    aria-pressed={isSelected}
                    className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
                    style={{
                      backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-surface1)',
                      color: isSelected ? 'var(--color-base)' : 'var(--color-text)',
                      border: isSelected ? '2px solid var(--color-accent)' : '2px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'var(--color-surface2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'var(--color-surface1)';
                      }
                    }}
                  >
                    {tag} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Results Counter */}
        {(searchQuery || selectedTag !== 'all') && (
          <div className="pt-2 border-t" style={{ borderColor: 'var(--color-surface2)' }}>
            <p className="text-sm" style={{ color: 'var(--color-subtext0)' }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                {filteredProjects.length}
              </span>
              {' '}{t('projects.results_found')}
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('all');
                  }}
                  className="ml-2 text-xs underline transition-colors"
                  style={{ color: 'var(--color-subtext1)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-subtext1)'}
                >
                  {t('projects.reset_filters')}
                </button>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        ) : (
          <p 
            className="col-span-full text-center py-12"
            style={{ color: 'var(--color-subtext1)' }}
          >
            {t('projects.no_results') || 'Aucun projet trouvé pour ce tag'}
          </p>
        )}
      </div>
    </div>
  );
}
