export interface NavLink {
    readonly label: string;
    readonly fragment: string;
}

export interface Spec {
    readonly label: string;
    readonly value: string;
}

export interface Project {
    readonly id: string;
    readonly kind: string;
    readonly title: string;
    readonly description: string;
    /** Facts shown in the mono spec panel. Only facts already stated in the project or role record. */
    readonly specs: readonly Spec[];
    readonly tags: readonly string[];
    readonly liveUrl?: string;
    /** Button label for liveUrl; defaults to "Live Demo". */
    readonly liveLabel?: string;
    readonly repoUrl?: string;
}

export type SkillGroupId = 'frontend' | 'backend' | 'ai' | 'mobile-games' | 'tools';

export interface Skill {
    readonly name: string;
    readonly group: SkillGroupId;
}

export interface SocialLink {
    readonly label: string;
    readonly url: string;
    readonly svgPath: string;
    readonly displayValue: string;
}

export interface Experience {
    readonly id: string;
    readonly role: string;
    readonly company: string;
    readonly duration: string;
    readonly current?: boolean;
    readonly description: string;
    readonly tags: readonly string[];
    readonly achievements?: readonly string[];
}

export const NAV_LINKS: readonly NavLink[] = [
    { label: 'Work', fragment: 'work' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'Experience', fragment: 'experience' },
    { label: 'Contact', fragment: 'contact' },
] as const;

export const HERO_DATA = {
    name: 'Willbert Budi Lian',
    title: 'Full-Stack Developer & AI Engineer',
    bio: 'Informatics student at Universitas Multimedia Nusantara. I build web applications, and machine-learning models that solve real-world problems. I am open to internships and full-time roles.',
    school: 'Universitas Multimedia Nusantara',
    program: 'Informatics',
    status: 'Open to internships & full-time roles',
    statusShort: 'Open to work',
} as const;

export const SKILL_GROUPS: readonly { readonly id: SkillGroupId; readonly label: string }[] = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI / ML' },
    { id: 'mobile-games', label: 'Mobile & Games' },
    { id: 'tools', label: 'Tools' },
] as const;

export const SKILLS: readonly Skill[] = [
    { name: 'Angular', group: 'frontend' },
    { name: 'TypeScript', group: 'frontend' },
    { name: 'JavaScript', group: 'frontend' },
    { name: 'React', group: 'frontend' },
    { name: 'Vue', group: 'frontend' },
    { name: 'NextJS', group: 'frontend' },
    { name: 'HTML / CSS', group: 'frontend' },
    { name: 'Tailwind CSS', group: 'frontend' },
    { name: 'Node.js', group: 'backend' },
    { name: 'PHP', group: 'backend' },
    { name: 'Laravel', group: 'backend' },
    { name: 'Java', group: 'backend' },
    { name: 'MySQL', group: 'backend' },
    { name: 'REST APIs', group: 'backend' },
    { name: 'Python', group: 'ai' },
    { name: 'PyTorch', group: 'ai' },
    { name: 'Tensorflow', group: 'ai' },
    { name: 'Kotlin', group: 'mobile-games' },
    { name: 'Unity', group: 'mobile-games' },
    { name: 'C#', group: 'mobile-games' },
    { name: 'Git', group: 'tools' },
    { name: 'Postman', group: 'tools' },
    { name: 'Figma', group: 'tools' },
    { name: 'CI/CD', group: 'tools' },
    { name: 'Trello', group: 'tools' },
] as const;

export const PROJECTS: readonly Project[] = [
    {
        id: 'depression-classification',
        kind: 'Research',
        title: 'Depression Classification from Facial Expressions',
        description: 'As part of a 5-person research team in the Informatics Department at Universitas Multimedia Nusantara, I worked on building a lightweight deep learning model to screen for depression from facial expressions.',
        specs: [
            { label: 'Task', value: 'Depression screening from facial expressions' },
            { label: 'Model', value: 'EfficientNetB3, lightweight' },
            { label: 'Stack', value: 'PyTorch, Python' },
            { label: 'Team', value: '5 people, UMN Informatics' },
        ],
        tags: ['PyTorch', 'Python', 'EfficientNetB3', 'CalmScope'],
    },
    {
        id: 'mindlens',
        kind: 'Android App',
        title: 'MindLens',
        description: 'A holistic Android application designed to facilitate early detection of depression and support mental well-being through daily journaling and mood tracking.',
        specs: [
            { label: 'Platform', value: 'Android' },
            { label: 'Stack', value: 'Kotlin, Jetpack Compose' },
            { label: 'Backend', value: 'Supabase' },
            { label: 'Features', value: 'Daily journaling, mood tracking' },
        ],
        tags: ['Kotlin', 'Android', 'Supabase', 'Jetpack Compose'],
        repoUrl: 'https://github.com/henrysalim/mindlens',
    },
    {
        id: 'sgp-net',
        kind: 'ML System',
        title: 'SGP-NET: Priority Seat Validation',
        description: 'A real-time monitoring system for public transit priority seating, powered by deep learning and contextual analysis. It identifies violations and delivers automated feedback, promoting a more inclusive and ethical transit environment.',
        specs: [
            { label: 'Task', value: 'Priority-seat validation on public transit' },
            { label: 'Method', value: 'Scene Graph Priority Network' },
            { label: 'Stack', value: 'Python, TensorFlow' },
            { label: 'Output', value: 'Automated feedback on violations' },
        ],
        tags: ['Machine Learning', 'Python', 'Tensorflow', 'SGP-NET'],
        repoUrl: 'https://github.com/henrysalim/priority-seat-sgp-net',
    },
    {
        id: 'radioactive-backend',
        kind: 'Web Backend',
        title: 'UMN Radioactive 2025',
        description: 'Backend system for the UMN Radioactive 2025 website.',
        specs: [
            { label: 'Role', value: 'Backend Developer' },
            { label: 'Stack', value: 'Laravel, PHP' },
            { label: 'Built', value: 'Ticketing system, merchandise management' },
            { label: 'Period', value: 'Mar 2025 to Nov 2025' },
        ],
        tags: ['Laravel', 'PHP'],
    },
    {
        id: 'maze-runner',
        kind: 'Game',
        title: 'Maze Runner',
        description: 'A small college game development project: a 3D maze game where the player controls a character to navigate through a maze and find the exit.',
        specs: [
            { label: 'Engine', value: 'Unity' },
            { label: 'Language', value: 'C#' },
            { label: 'Genre', value: '3D maze' },
            { label: 'Origin', value: 'College project' },
        ],
        tags: ['Unity', 'C#', '3D', 'Game Development'],
        liveUrl: 'https://rascalosh.itch.io/mazerunner',
        liveLabel: 'Play',
    },
] as const;

export const EXPERIENCES: readonly Experience[] = [
    {
        id: 'lab-assistant',
        role: 'Laboratory Assistant',
        company: 'Multimedia Nusantara University',
        duration: 'Feb 2026 to Present',
        current: true,
        description: 'Assist students in learning and understanding the concepts of object-oriented programming through practical exercises and interactive sessions.',
        tags: ['OOP', 'Kotlin', 'Tutoring', 'Problem Solving'],
        achievements: ['Assisted 80 students in learning OOP concepts', 'Improved student understanding of OOP concepts by 20%'],
    },
    {
        id: 'ids-medical',
        role: 'Application Developer Intern',
        company: 'IDS Medical Systems Indonesia',
        duration: 'Jan 2026 to Present',
        current: true,
        description: 'Develop and maintain web applications for healthcare professionals, ensuring high performance and data accuracy.',
        tags: ['Angular', 'TypeScript', 'Node.js', 'Laravel', 'Flutter'],
    },
    {
        id: 'byte-chairman',
        role: 'Chairman',
        company: 'Bringing Your Tech Experience',
        duration: 'Feb 2025 to Dec 2025',
        description: 'Led a multidisciplinary team to organize a technology-focused event aimed at inspiring innovation and collaboration among Informatics students.',
        tags: ['Leadership', 'Event Management', 'Teamwork'],
        achievements: [
            'Led a team of 100+ students to organize a technology-focused event',
            'Collaborated with industry professionals to deliver high-quality content and workshops',
            'Coordinated event planning and execution for 200+ attendees',
        ],
    },
    {
        id: 'hmif-vice-head',
        role: 'Vice Head of Division, Project Manager',
        company: 'HMIF UMN',
        duration: 'Dec 2024 to Dec 2025',
        description: 'Acted as vice head of division overseeing the division responsible for planning and executing HMIF programs and initiatives. Supported project leads in organizing timelines, coordinating teams, and ensuring each program aligned with the organization’s goals. Contributed to workflow improvements, internal communication, and smooth execution of events.',
        tags: ['Leadership', 'Project Management', 'Teamwork'],
        achievements: [
            'Brainstormed and executed 5+ programs for HMIF UMN',
            'Improved internal communication and workflow efficiency',
            'Strengthened leadership, coordination, and cross-team collaboration',
        ],
    },
    {
        id: 'radioactive-backend-role',
        role: 'Backend Developer',
        company: 'UMN Radioactive 2025',
        duration: 'Mar 2025 to Nov 2025',
        description: 'Developed a backend system for the UMN Radioactive 2025 website.',
        tags: ['Laravel', 'PHP'],
        achievements: [
            'Developed a merchandise management system',
            'Developed a ticketing system',
        ],
    },
    {
        id: 'perkenalan-prodi',
        role: 'Head of Division, Event',
        company: 'Perkenalan Prodi Informatika UMN 2025',
        duration: 'Jan 2025 to Sep 2025',
        description: 'Led the event division for Perkenalan Prodi Informatika 2025 with two partners, managing the full program flow from planning to execution. Coordinated sub-teams, aligned schedules, and ensured every segment ran smoothly on the day of the event. Collaborated with committees, speakers, and technical crews to deliver an engaging experience for incoming students. Also trained division members as a Master of Ceremony, sharpening stage presence, pacing, and audience engagement.',
        tags: ['Leadership', 'Event Planning', 'Teamwork'],
        // TODO: three real achievements were listed here but belong to a different role or project:
        // a sentiment analysis tool for social media data, 2 internal symposium presentations,
        // and a contribution to an open-source Bahasa Indonesia NLP dataset. Re-add them where they belong.
        achievements: [],
    },
] as const;

export const SOCIAL_LINKS: readonly SocialLink[] = [
    {
        label: 'GitHub',
        url: 'https://github.com/rascalosh',
        svgPath: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
        displayValue: 'rascalosh',
    },
    {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/willbert-budi-lian',
        svgPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
        displayValue: 'Willbert Budi Lian',
    },
    {
        label: 'Email',
        url: 'mailto:lianwillbert@gmail.com',
        svgPath: 'M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z',
        displayValue: 'lianwillbert@gmail.com',
    },
] as const;

// Kept for later: not shown on the page (a public phone number is a privacy risk, and recruiters rarely use either).
export const UNLISTED_LINKS: readonly SocialLink[] = [
    {
        label: 'WhatsApp',
        url: 'https://wa.me/6288297999171',
        svgPath: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
        displayValue: '088297999171',
    },
    {
        label: 'Instagram',
        url: 'https://instagram.com/willbertbudi',
        svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
        displayValue: 'willbertbudi',
    }
] as const;
