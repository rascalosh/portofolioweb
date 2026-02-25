export interface NavLink {
    readonly label: string;
    readonly fragment: string;
}

export interface Project {
    readonly title: string;
    readonly description: string;
    readonly tags: readonly string[];
    readonly liveUrl?: string;
    readonly repoUrl?: string;
}

export interface Skill {
    readonly name: string;
    readonly icon: string;
    readonly category: 'frontend' | 'backend' | 'tools';
}

export interface SocialLink {
    readonly label: string;
    readonly url: string;
    readonly svgPath: string;
}

export const NAV_LINKS: readonly NavLink[] = [
    { label: 'About', fragment: 'about' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Contact', fragment: 'contact' },
] as const;

export const HERO_DATA = {
    greeting: 'Hello, I\'m',
    name: 'Willbert Budi Lian',
    title: 'Full-Stack Developer & AI Engineer',
    subtitle: 'I craft modern, performant, and accessible web experiences with clean code and thoughtful design and I also build AI applications that can help people in their daily lives.',
} as const;

export const ABOUT_DATA = {
    heading: 'About Me',
    paragraphs: [
        'I\'m a passionate full-stack developer with 5+ years of experience building web applications that users love. I specialize in Angular, TypeScript, and Node.js, with a keen eye for design and user experience.',
        'When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, or sketching UI concepts. I believe great software is born at the intersection of engineering excellence and thoughtful design.',
        'Currently open to new opportunities and exciting collaborations. Let\'s build something amazing together.',
    ],
    stats: [
        { value: '5+', label: 'Years Experience' },
        { value: '30+', label: 'Projects Completed' },
        { value: '15+', label: 'Happy Clients' },
        { value: '4', label: 'Open Source Libs' },
    ],
} as const;

export const SKILLS: readonly Skill[] = [
    { name: 'Angular', icon: '🅰️', category: 'frontend' },
    { name: 'TypeScript', icon: '🔷', category: 'frontend' },
    { name: 'React', icon: '⚛️', category: 'frontend' },
    { name: 'Tailwind CSS', icon: '🎨', category: 'frontend' },
    { name: 'HTML / CSS', icon: '🌐', category: 'frontend' },
    { name: 'JavaScript', icon: '⚡', category: 'frontend' },
    { name: 'Node.js', icon: '🟢', category: 'backend' },
    { name: 'Python', icon: '🐍', category: 'backend' },
    { name: 'PostgreSQL', icon: '🐘', category: 'backend' },
    { name: 'REST APIs', icon: '🔗', category: 'backend' },
    { name: 'GraphQL', icon: '◈', category: 'backend' },
    { name: 'Docker', icon: '🐳', category: 'tools' },
    { name: 'Git', icon: '📦', category: 'tools' },
    { name: 'Figma', icon: '🎯', category: 'tools' },
    { name: 'CI/CD', icon: '🔄', category: 'tools' },
] as const;

export const PROJECTS: readonly Project[] = [
    {
        title: 'TaskFlow',
        description: 'A collaborative project management app with real-time updates, Kanban boards, and team analytics. Built with Angular and Firebase.',
        tags: ['Angular', 'Firebase', 'RxJS', 'Tailwind CSS'],
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
    },
    {
        title: 'Lumina UI',
        description: 'An open-source component library for Angular with 40+ accessible, themeable components and comprehensive documentation.',
        tags: ['Angular', 'TypeScript', 'Storybook', 'A11y'],
        repoUrl: 'https://github.com',
    },
    {
        title: 'Wavelength',
        description: 'A music discovery platform that uses machine learning to recommend tracks based on mood and listening patterns.',
        tags: ['React', 'Python', 'TensorFlow', 'Spotify API'],
        liveUrl: 'https://example.com',
    },
    {
        title: 'FinTrack',
        description: 'Personal finance dashboard with expense tracking, budget goals, and interactive charts for visualizing spending habits.',
        tags: ['Angular', 'Node.js', 'D3.js', 'PostgreSQL'],
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
    },
] as const;

export const SOCIAL_LINKS: readonly SocialLink[] = [
    {
        label: 'GitHub',
        url: 'https://github.com/rascalosh',
        svgPath: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
    },
    {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/willbert-budi-lian',
        svgPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
        label: 'Email',
        url: 'mailto:willbertlian@gmail.com',
        svgPath: 'M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z',
    },
] as const;
