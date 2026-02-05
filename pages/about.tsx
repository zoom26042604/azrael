import { useCallback } from 'react';
import Link from 'next/link';
import { 
  LuGithub, 
  LuLinkedin, 
  LuMail, 
  LuGraduationCap,
  LuBriefcase,
  LuUsers,
  LuLightbulb,
  LuRocket,
  LuHeart
} from 'react-icons/lu';
import { 
  SiDocker, 
  SiNodedotjs, 
  SiPython, 
  SiPostgresql, 
  SiGit, 
  SiFigma, 
  SiLinux, 
  SiGo, 
  SiHtml5,
  SiCss3,
  SiJavascript
} from 'react-icons/si';
import {
  FaCode
}  from "react-icons/fa6"
import { useLanguage } from '@/src/contexts/LanguageContext';
import HeadMeta from '@/src/components/HeadMeta';

// Données du CV
const education = [
  {
    id: 'edu-1',
    institution: 'Ynov Campus Toulouse',
    degree: 'Bachelor Informatique',
    period: 'sept. 2024 - juill. 2027',
    icon: LuGraduationCap,
    logo: '/logos/ynov.jpeg',
    current: true,
  },
  {
    id: 'edu-2',
    institution: 'Lycée Saint-Exupéry',
    degree: 'Bac STI2D',
    period: 'sept. 2021 - juill. 2024',
    icon: LuGraduationCap,
    logo: null,
    current: false,
  },
];

const hardSkills = [
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'SQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624' },
  { name: 'Golang', icon: SiGo, color: '#00ADD8' },
  { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss3, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
];

const softSkills = [
  { name: 'Travail en équipe', icon: LuUsers },
  { name: 'Autonomie', icon: LuRocket },
  { name: 'Curiosité', icon: LuLightbulb },
  { name: 'Adaptabilité', icon: LuBriefcase },
  { name: 'Gestion Agile', icon: LuHeart },
];

export default function AboutPage() {
  const { t, language } = useLanguage();

  const handleEmailClick = useCallback(() => {
    window.location.href = 'mailto:nathanferre06@gmail.com';
  }, []);

  return (
    <>
      <HeadMeta
        title={t('about.title')}
        description="Étudiant en développement informatique à Ynov Toulouse, passionné par le développement web et les nouvelles technologies."
        path="/about"
        keywords={['étudiant', 'student', 'Ynov', 'développement web', 'formation']}
        type="profile"
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-8 md:px-6">
        {/* About Me Section */}
        <section className="space-y-6">
          <h1 className="text-3xl font-bold md:text-4xl">
            {t('about.title')}
          </h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile/profile.webp"
                alt="Photo de profil de Nathan Ferre"
                width={800}
                height={993}
                className="h-full w-full rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            <div className="space-y-4 md:col-span-2">
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
                <b>{t('about.greeting')}</b> {t('about.intro_1')}{' '}
                <Link href="/socials" className="link">
                  (@zoom26042604)
                </Link>
                {' '}{t('about.intro_2')}
                {' '}{t('about.intro_3')}{' '}
                <Link href="/projects" className="link">
                  {t('about.interesting_projects')}
                </Link>
                {' '}{t('about.intro_4')}
              </p>

              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {t('about.currently')} Ynov Campus Toulouse{t('about.studying')}
              </p>

              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {t('about.outside')}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://github.com/zoom26042604"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-(--color-accent) rounded focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 underline underline-offset-2 decoration-1"
                >
                  <LuGithub size={16} aria-hidden="true" />
                  GitHub
                </a>
                <span style={{ color: 'var(--color-text)' }} aria-hidden="true">*</span>
                <a
                  href="https://www.linkedin.com/in/nathan-ferre-0ba3a438a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-(--color-accent) rounded focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 underline underline-offset-2 decoration-1"
                >
                  <LuLinkedin size={16} aria-hidden="true" />
                  LinkedIn
                </a>
                <span style={{ color: 'var(--color-text)' }} aria-hidden="true">*</span>
                <span
                  role="button"
                  aria-label="Send an email to nathanferre06@gmail.com"
                  className="inline-flex cursor-pointer items-center gap-1.5 text-sm transition-colors hover:text-(--color-accent) rounded focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 underline underline-offset-2 decoration-1"
                  tabIndex={0}
                  onClick={handleEmailClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleEmailClick();
                    }
                  }}
                >
                  <LuMail size={16} aria-hidden="true" />
                  nathanferre06@gmail.com
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Formation Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <LuGraduationCap size={28} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
            {language === 'fr' ? 'Formation' : 'Education'}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((edu) => {
              const Icon = edu.icon;
              return (
                <div
                  key={edu.id}
                  className="group relative rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'var(--color-mantle)',
                    border: edu.current ? '2px solid var(--color-accent)' : '1px solid var(--color-surface0)',
                  }}
                >
                  {edu.current && (
                    <span 
                      className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-base)' }}
                    >
                      En cours
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <div 
                      className="flex h-12 w-12 items-center justify-center rounded-lg overflow-hidden"
                      style={{ backgroundColor: 'var(--color-surface0)' }}
                    >
                      {edu.logo ? (
                        <img 
                          src={edu.logo} 
                          alt={`Logo ${edu.institution}`}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Icon size={24} style={{ color: 'var(--color-accent)' }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                        {edu.institution}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--color-accent)' }}>
                        {edu.degree}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--color-text)' }}>
                        {edu.period}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Hard Skills Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaCode size={28} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
            {language === 'fr' ? 'Hard Skills' : 'Hard Skills'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {hardSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="group flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-mantle)',
                    border: '1px solid var(--color-surface0)',
                  }}
                >
                  <Icon size={20} style={{ color: skill.color }} aria-hidden="true" />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Soft Skills Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <LuHeart size={28} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
            Soft Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-base)',
                  }}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
