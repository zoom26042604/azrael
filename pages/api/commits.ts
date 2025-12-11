import type { NextApiRequest, NextApiResponse } from 'next';

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
  } | null;
  repository?: {
    name: string;
    full_name: string;
  };
}

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
      url: string;
    }>;
  };
  created_at: string;
}

interface CommitResponse {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
  avatar: string | null;
  login: string | null;
  repo: string;
  additions: number;
  deletions: number;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'zoom26042604';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommitResponse[] | ErrorResponse>
) {
  // Autoriser uniquement GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { limit = '5' } = req.query;
    const commitLimit = Math.min(Math.max(parseInt(limit as string, 10), 1), 10);

    // Headers pour GitHub API
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Nathan-FERRE-Portfolio'
    };

    // Ajouter le token GitHub si disponible (pour éviter rate limiting)
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Récupérer les repos publics de l'utilisateur
    const reposResponse = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10&type=owner`,
      { headers } as RequestInit
    );

    if (!reposResponse.ok) {
      if (reposResponse.status === 404) {
        return res.status(404).json({ 
          error: 'User not found',
          details: GITHUB_USERNAME
        });
      }
      
      if (reposResponse.status === 403) {
        return res.status(429).json({ 
          error: 'GitHub API rate limit exceeded',
          details: 'Please try again later'
        });
      }

      throw new Error(`GitHub API returned ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();
    
    // Pour chaque repo, récupérer les derniers commits
    const allCommits: CommitResponse[] = [];
    
    for (const repo of repos) {
      if (allCommits.length >= commitLimit) break;
      
      try {
        const commitsResponse = await fetch(
          `${GITHUB_API}/repos/${repo.full_name}/commits?per_page=3&author=${GITHUB_USERNAME}`,
          { headers }
        );
        
        if (commitsResponse.ok) {
          const repoCommits = await commitsResponse.json();
          
          for (const commit of repoCommits) {
            if (allCommits.length >= commitLimit) break;
            
            try {
              // Récupérer les détails avec stats
              const detailResponse = await fetch(
                `${GITHUB_API}/repos/${repo.full_name}/commits/${commit.sha}`,
                { headers }
              );
              
              if (detailResponse.ok) {
                const detail = await detailResponse.json();
                
                allCommits.push({
                  sha: commit.sha.substring(0, 7),
                  message: commit.commit.message.split('\n')[0],
                  author: commit.commit.author.name,
                  date: commit.commit.author.date,
                  url: commit.html_url,
                  avatar: commit.author?.avatar_url || null,
                  login: commit.author?.login || null,
                  repo: repo.name,
                  additions: detail.stats?.additions || 0,
                  deletions: detail.stats?.deletions || 0
                });
              }
            } catch (error) {
              console.error(`Failed to fetch commit details:`, error);
            }
          }
        }
      } catch (error) {
        console.error(`Failed to fetch commits for ${repo.name}:`, error);
      }
    }
    
    // Trier par date (plus récent d'abord)
    allCommits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Cache côté client pour 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    
    return res.status(200).json(allCommits);
  } catch (error) {
    console.error('Error fetching commits:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch commits',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
