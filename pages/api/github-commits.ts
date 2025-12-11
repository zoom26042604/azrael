import type { NextApiRequest, NextApiResponse } from 'next';

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
  stats?: {
    additions: number;
    deletions: number;
  };
}

interface FormattedCommit {
  sha: string;
  message: string;
  repo: string;
  date: string;
  url: string;
  additions: number;
  deletions: number;
}

interface GitHubRepo {
  name: string;
  updated_at: string;
}

interface CommitWithStats extends GitHubCommit {
  repoName: string;
  stats: {
    additions: number;
    deletions: number;
  };
}

const GITHUB_USERNAME = 'zoom26042604';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const limit = parseInt(req.query.limit as string) || 5;

  try {
    // Récupérer les repos publics de l'utilisateur
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'azrael-portfolio',
          ...(process.env.GITHUB_TOKEN && { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` })
        }
      }
    );

    if (!reposResponse.ok) {
      console.error('GitHub API error:', reposResponse.status, await reposResponse.text());
      return res.status(reposResponse.status).json({ 
        error: 'Failed to fetch repos',
        message: `GitHub API returned ${reposResponse.status}`
      });
    }

    const repos: GitHubRepo[] = await reposResponse.json();
    
    // Récupérer les commits de chaque repo
    const commitPromises = repos.map(async (repo: GitHubRepo) => {
      try {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=3&author=${GITHUB_USERNAME}`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'azrael-portfolio',
              ...(process.env.GITHUB_TOKEN && { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` })
            }
          }
        );

        if (!commitsResponse.ok) {
          return [];
        }

        const commits: GitHubCommit[] = await commitsResponse.json();
        
        // Récupérer les stats pour chaque commit
        const commitsWithStats = await Promise.all(
          commits.map(async (commit) => {
            try {
              const commitDetailResponse = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits/${commit.sha}`,
                {
                  headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'azrael-portfolio',
                    ...(process.env.GITHUB_TOKEN && { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` })
                  }
                }
              );

              if (!commitDetailResponse.ok) {
                return {
                  ...commit,
                  repoName: repo.name,
                  stats: { additions: 0, deletions: 0 }
                };
              }

              const commitDetail = await commitDetailResponse.json();
              return {
                ...commit,
                repoName: repo.name,
                stats: commitDetail.stats || { additions: 0, deletions: 0 }
              };
            } catch {
              return {
                ...commit,
                repoName: repo.name,
                stats: { additions: 0, deletions: 0 }
              };
            }
          })
        );

        return commitsWithStats;
      } catch {
        return [];
      }
    });

    const allCommits = (await Promise.all(commitPromises)).flat();

    // Trier par date et limiter
    const sortedCommits = allCommits
      .sort((a, b) => 
        new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
      )
      .slice(0, limit);

    // Formater les commits
    const formattedCommits: FormattedCommit[] = sortedCommits.map((commit: CommitWithStats) => ({
      sha: commit.sha,
      message: commit.commit.message.split('\n')[0], // Première ligne seulement
      repo: commit.repoName,
      date: commit.commit.author.date,
      url: commit.html_url,
      additions: commit.stats?.additions || 0,
      deletions: commit.stats?.deletions || 0
    }));

    res.status(200).json(formattedCommits);
  } catch (error) {
    console.error('Error fetching commits:', error);
    res.status(500).json({ 
      error: 'Failed to fetch commits',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
