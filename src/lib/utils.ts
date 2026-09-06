export type ClassValue = string | number | boolean | undefined | null | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      classes.push(cn(...input));
    }
  }
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getProjectStartDate(date: string): number {
  const firstDate = date.match(/(?:\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2})/)?.[0] ?? date;
  const dayMonthYear = firstDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (dayMonthYear) {
    const [, day, month, year] = dayMonthYear;
    return Date.UTC(Number(year), Number(month) - 1, Number(day));
  }

  const monthYear = firstDate.match(/^(\d{2})\/(\d{4})$/);
  if (monthYear) {
    const [, month, year] = monthYear;
    return Date.UTC(Number(year), Number(month) - 1, 1);
  }

  const yearMonth = firstDate.match(/^(\d{4})-(\d{2})$/);
  if (yearMonth) {
    const [, year, month] = yearMonth;
    return Date.UTC(Number(year), Number(month) - 1, 1);
  }

  return 0;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
