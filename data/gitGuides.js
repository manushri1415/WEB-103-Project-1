const gitGuides = [
  {
    id: 1,
    title: 'Starting a Repository',
    slug: 'starting-a-repository',
    category: 'Basics',
    difficulty: 'Beginner',
    command: 'git init',
    syntax: 'git init',
    example: 'git init',
    whenToUse: 'Use this when you want Git to start tracking an existing project folder.',
    warning: 'Do not initialize a repository inside another repository unless you mean to create a nested project.',
    description: 'Create a new Git repository or copy an existing one so your project has version history.'
  },
  {
    id: 2,
    title: 'Saving Your Work',
    slug: 'commits',
    category: 'Basics',
    difficulty: 'Beginner',
    command: 'git commit',
    syntax: 'git commit -m "<message>"',
    example: 'git commit -m "Add navigation bar"',
    whenToUse: 'Commit after finishing a meaningful chunk of work that you may want to return to later.',
    warning: 'Avoid vague messages like "stuff" or "changes" because they make history harder to read.',
    description: 'Turn staged file changes into a clear snapshot of your project progress.'
  },
  {
    id: 3,
    title: 'Working With Branches',
    slug: 'branches',
    category: 'Workflow',
    difficulty: 'Beginner',
    command: 'git switch',
    syntax: 'git switch -c <branch-name>',
    example: 'git switch -c navbar-redesign',
    whenToUse: 'Use a branch when building a feature, fixing a bug, or testing an idea without changing main.',
    warning: 'Check your current branch before coding so you do not accidentally work on the wrong one.',
    description: 'Create a separate line of development so new work stays isolated from main.'
  },
  {
    id: 4,
    title: 'Merging Changes',
    slug: 'merging',
    category: 'Collaboration',
    difficulty: 'Intermediate',
    command: 'git merge',
    syntax: 'git merge <branch-name>',
    example: 'git merge navbar-redesign',
    whenToUse: 'Merge when a feature branch is ready to combine with the branch you are currently on.',
    warning: 'Open conflicted files and resolve the marked sections before finishing a merge conflict.',
    description: 'Bring work from one branch into another and learn what to do when files disagree.'
  },
  {
    id: 5,
    title: 'Working With GitHub',
    slug: 'github',
    category: 'Remote',
    difficulty: 'Beginner',
    command: 'git push',
    syntax: 'git push origin <branch-name>',
    example: 'git push origin main',
    whenToUse: 'Push when you want your local commits to appear on GitHub or another remote host.',
    warning: 'Pull before pushing if the remote branch has changes you do not have locally.',
    description: 'Connect local work to a remote repository so your code can be backed up and shared.'
  },
  {
    id: 6,
    title: 'Undoing Mistakes',
    slug: 'undoing-mistakes',
    category: 'Recovery',
    difficulty: 'Intermediate',
    command: 'git restore',
    syntax: 'git restore <file-name>',
    example: 'git restore index.html',
    whenToUse: 'Use restore for unstaged changes, revert for shared commits, and reset only when you understand the history impact.',
    warning: 'Be careful with git reset --hard because it can discard local work.',
    description: 'Recover from accidental edits, bad commits, and confusing history without making things worse.'
  },
  {
    id: 7,
    title: 'Stashing Changes',
    slug: 'stashing',
    category: 'Workflow',
    difficulty: 'Beginner',
    command: 'git stash',
    syntax: 'git stash',
    example: 'git stash pop',
    whenToUse: 'Stash when you need to switch tasks but are not ready to commit your current edits.',
    warning: 'Remember to pop or apply your stash later, or your saved changes can be easy to forget.',
    description: 'Temporarily shelve messy work so you can switch branches or pull updates cleanly.'
  },
  {
    id: 8,
    title: 'Reading Git History',
    slug: 'history',
    category: 'Inspection',
    difficulty: 'Beginner',
    command: 'git log',
    syntax: 'git log --oneline',
    example: 'git log --oneline --graph',
    whenToUse: 'Use history commands when you need to understand what changed, when it changed, and why.',
    warning: 'Read diffs before merging or reverting so you know exactly what code will change.',
    description: 'Inspect commits and file differences so the repository tells a readable story.'
  }
];

module.exports = gitGuides;
