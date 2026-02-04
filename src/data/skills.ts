export interface Skill {
  name: string;
  icon: string; // react-icons import path
  url: string; // Official website URL
}

export const skills: Skill[] = [
  { name: 'React', icon: 'SiReact', url: 'https://react.dev' },
  { name: 'Next.js', icon: 'SiNextdotjs', url: 'https://nextjs.org' },
  { name: 'TypeScript', icon: 'SiTypescript', url: 'https://www.typescriptlang.org' },
  { name: 'JavaScript', icon: 'SiJavascript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'Node.js', icon: 'SiNodedotjs', url: 'https://nodejs.org' },
  { name: 'Python', icon: 'SiPython', url: 'https://www.python.org' },
  { name: 'Git', icon: 'SiGit', url: 'https://git-scm.com' },
  { name: 'Docker', icon: 'SiDocker', url: 'https://www.docker.com' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', url: 'https://www.postgresql.org' },
  { name: 'MongoDB', icon: 'SiMongodb', url: 'https://www.mongodb.com' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', url: 'https://tailwindcss.com' },
  { name: 'VS Code', icon: 'SiVisualstudiocode', url: 'https://code.visualstudio.com' },
  { name: 'Figma', icon: 'SiFigma', url: 'https://www.figma.com' },
];
