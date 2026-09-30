// All page content lives here. Anything marked `TODO:` is for you to fill in; while it is `null` it is simply not shown.

export interface NavLink {
    readonly label: string;
    readonly fragment: string;
}

export interface Spec {
    readonly label: string;
    readonly value: string;
}

export type ProjectCategory = 'ai' | 'web' | 'mobile' | 'games';

export const PROJECT_FILTERS: readonly { readonly id: 'all' | ProjectCategory; readonly label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI-ML' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'games', label: 'Games' },
] as const;

/** An image, GIF or short video for a project card. Files go in public/assets/projects/. */
export interface Media {
    readonly type: 'image' | 'video';
    readonly src: string;
    /** Describe what the picture shows, for screen readers. */
    readonly alt: string;
    /** Still frame for video, shown while it loads and under reduced motion. */
    readonly poster?: string;
    readonly width: number;
    readonly height: number;
}

export interface CaseStudy {
    readonly problem: string;
    readonly approach: string;
    readonly result: string | null;
    readonly different: string | null;
}

export interface Project {
    readonly id: string;
    readonly kind: string;
    readonly category: ProjectCategory;
    readonly title: string;
    /** Why it was built, in one line. Derived from the project record; review the wording. */
    readonly problem: string;
    /** Metrics or impact. Never guessed: stays null until you have a real number. */
    readonly outcome: string | null;
    readonly media: Media | null;
    /** Facts shown in the mono spec panel. Only facts already stated in the project or role record. */
    readonly specs: readonly Spec[];
    readonly tags: readonly string[];
    readonly sourceUrl?: string;
    readonly demoUrl?: string;
    /** Button label for demoUrl; defaults to "Live Demo". */
    readonly demoLabel?: string;
    readonly caseStudy?: CaseStudy;
}

export type SkillLevelId = 'strong' | 'comfortable' | 'familiar';

export interface Skill {
    readonly name: string;
    readonly level: SkillLevelId;
}

export interface SocialLink {
    readonly label: string;
    readonly url: string;
    readonly svgPath: string;
    readonly displayValue: string;
}

export type ExperienceKind = 'technical' | 'leadership';

export interface Experience {
    readonly id: string;
    readonly kind: ExperienceKind;
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
    bio: 'I am a passionate full-stack developer and AI engineer with a strong background in building web applications and machine learning models. I enjoy solving complex problems and creating innovative solutions that make a difference.',
    // TODO: what you are building or learning right now, one short line. Hidden while null.
    now: null as string | null,
    school: 'Universitas Multimedia Nusantara',
    program: 'Informatics',
    status: 'Open to internships & full-time roles',
    statusShort: 'Open to work',
} as const;

// TODO: add your CV as public/cv.pdf. Until then this button returns a 404.
export const CV_URL = '/cv.pdf';

export const SKILL_LEVELS: readonly { readonly id: SkillLevelId; readonly label: string }[] = [
    { id: 'strong', label: 'Strong in' },
    { id: 'comfortable', label: 'Comfortable with' },
    { id: 'familiar', label: 'Familiar with' },
] as const;

// TODO: review this grouping. It is a first draft based on how often each skill appears in your projects and roles.
export const SKILLS: readonly Skill[] = [
    { name: 'Angular', level: 'strong' },
    { name: 'TypeScript', level: 'strong' },
    { name: 'Laravel', level: 'strong' },
    { name: 'PHP', level: 'strong' },
    { name: 'Python', level: 'strong' },
    { name: 'PyTorch', level: 'strong' },
    { name: 'Kotlin', level: 'strong' },
    { name: 'JavaScript', level: 'comfortable' },
    { name: 'Node.js', level: 'comfortable' },
    { name: 'Tensorflow', level: 'comfortable' },
    { name: 'MySQL', level: 'comfortable' },
    { name: 'REST APIs', level: 'comfortable' },
    { name: 'HTML / CSS', level: 'comfortable' },
    { name: 'Tailwind CSS', level: 'comfortable' },
    { name: 'Git', level: 'comfortable' },
    { name: 'Unity', level: 'comfortable' },
    { name: 'C#', level: 'comfortable' },
    { name: 'React', level: 'familiar' },
    { name: 'Vue', level: 'familiar' },
    { name: 'NextJS', level: 'familiar' },
    { name: 'Java', level: 'familiar' },
    { name: 'Postman', level: 'familiar' },
    { name: 'Figma', level: 'familiar' },
    { name: 'CI/CD', level: 'familiar' },
    { name: 'Trello', level: 'familiar' },
] as const;

export const PROJECTS: readonly Project[] = [
    {
        id: 'neuropulse',
        kind: 'Web App',
        category: 'web',
        title: 'NeuroPulse',
        problem: 'An ADHD companion that breaks big tasks into tiny steps, rewards progress, and adapts to your energy instead of demanding the reverse.',
        outcome: '16th of 50 teams in the track',
        media: {
            type: 'image',
            src: 'assets/projects/neuropulse.png',
            alt: 'NeuroPulse landing page: the headline "Work with your brain, not against it." beside a friendly 3D brain mascot, with Start Now and sign-in buttons.',
            width: 1384,
            height: 605,
        },
        specs: [
            { label: 'Role', value: 'AI Engineer' },
            { label: 'Stack', value: 'Next.js, FastAPI' },
            { label: 'Features', value: 'Task breaker, focus tracker' },
            { label: 'Languages', value: 'Indonesian, English' },
            { label: 'Origin', value: 'Hackathon project' },
            // TODO: Team size.
        ],
        tags: ['Next.js', 'FastAPI', 'AI', 'Hackathon'],
        demoUrl: 'https://neuropulse-web-ten.vercel.app/',
        // TODO: sourceUrl if the code is public.
    },
    {
        id: 'depression-classification',
        kind: 'Research',
        category: 'ai',
        title: 'Depression Classification from Facial Expressions',
        problem: 'Can a lightweight deep learning model screen for depression from facial expressions?',
        outcome: '83% accuracy, 0.82 macro F1 on 935 test images',
        media: null, // TODO: figure, confusion matrix or poster. Save to public/assets/projects/ and describe it in `alt`.
        specs: [
            { label: 'Task', value: 'Depression screening from facial expressions' },
            { label: 'Model', value: 'EfficientNetB3, lightweight' },
            { label: 'Stack', value: 'PyTorch, Python' },
            { label: 'Accuracy', value: '0.83' },
            { label: 'F1-score', value: '0.84 neutral, 0.81 depressed' },
            { label: 'Team', value: '5 people, UMN Informatics' },
        ],
        tags: ['PyTorch', 'Python', 'EfficientNetB3', 'CalmScope'],
        // TODO: sourceUrl and demoUrl if the work is public.
    },
    {
        id: 'mindlens',
        kind: 'Android App',
        category: 'mobile',
        title: 'MindLens',
        problem: 'Support early detection of depression and mental well-being through daily journaling and mood tracking.',
        outcome: null, // TODO: users, features shipped, or another real result
        media: {
            type: 'image',
            src: 'assets/projects/mindlens.jpg',
            alt: 'MindLens presentation slide on a green background: the title, the line "Daily journaling and mood tracking, kept safe behind a lock", and a phone showing the onboarding screen "Diary with lock".',
            width: 1280,
            height: 800,
        },
        specs: [
            { label: 'Platform', value: 'Android' },
            { label: 'Stack', value: 'Kotlin, Jetpack Compose' },
            { label: 'Backend', value: 'Supabase' },
            { label: 'Features', value: 'Daily journaling, mood tracking' },
        ],
        tags: ['Kotlin', 'Android', 'Supabase', 'Jetpack Compose'],
        sourceUrl: 'https://github.com/henrysalim/mindlens',
        caseStudy: {
            problem: 'Support early detection of depression and mental well-being through daily journaling and mood tracking.',
            approach: 'A holistic Android application built with Kotlin and Jetpack Compose, with Supabase as the backend. People write a daily journal entry and record their mood, so patterns become visible over time.',
            result: null, // TODO: what happened: users, feedback, what worked
            different: null, // TODO: what you would do differently next time
        },
    },
    {
        id: 'sgp-net',
        kind: 'ML System',
        category: 'ai',
        title: 'SGP-NET: Priority Seat Validation',
        problem: 'Check that priority seats on public transit are used as intended, with automated feedback on violations.',
        outcome: null, // TODO: accuracy or another real result
        media: null, // TODO: architecture diagram or demo frame
        specs: [
            { label: 'Task', value: 'Priority-seat validation on public transit' },
            { label: 'Method', value: 'Scene Graph Priority Network' },
            { label: 'Stack', value: 'Python, TensorFlow' },
            { label: 'Output', value: 'Automated feedback on violations' },
        ],
        tags: ['Machine Learning', 'Python', 'Tensorflow', 'SGP-NET'],
        sourceUrl: 'https://github.com/henrysalim/priority-seat-sgp-net',
    },
    {
        id: 'perkenalan-backend-2026',
        kind: 'Web Backend',
        category: 'web',
        title: 'Perkenalan Prodi Informatika UMN 2026: Backend',
        problem: 'Backend for the orientation website of the Informatics program, powering the crossword puzzle and quiz activities for 200+ new students, with rate limiting to keep it reliable under load.',
        outcome: 'Stable throughout the event',
        media: {
            type: 'image',
            src: 'assets/projects/ppif-2026.jpg',
            alt: 'Home page of the Perkenalan Prodi Informatika 2026 website: a 3D subway platform with red mascot characters, under a navigation bar with Home, About, Timeline and Contact.',
            width: 1280,
            height: 720,
        },
        specs: [
            { label: 'Role', value: 'Backend Developer' },
            { label: 'Stack', value: 'Laravel, PHP, MySQL' },
            { label: 'Built', value: 'TTS and quiz backend' },
            { label: 'Scale', value: '200+ participants' },
            { label: 'Period', value: 'Jun 2026 to Jul 2026' },
        ],
        tags: ['Laravel', 'PHP', 'MySQL'],
        demoUrl: 'https://ppif.umn.ac.id',
        demoLabel: 'Visit Site',
        // TODO: demoUrl if the site is still online, sourceUrl if the code is public.
    },
    {
        id: 'maze-runner',
        kind: 'Game',
        category: 'games',
        title: 'Maze Runner',
        problem: 'A college game project: control a character through a 3D maze and find the exit.',
        outcome: null, // TODO: plays, feedback, or another real result
        media: {
            type: 'image',
            src: 'assets/projects/maze-runner.png',
            alt: 'Maze Runner game logo: the title in bold beige letters over a diamond-shaped stone maze.',
            width: 347,
            height: 234,
        }, // TODO: swap for a gameplay GIF or screenshot
        specs: [
            { label: 'Engine', value: 'Unity' },
            { label: 'Language', value: 'C#' },
            { label: 'Genre', value: '3D maze' },
            { label: 'Origin', value: 'College project' },
        ],
        tags: ['Unity', 'C#', '3D', 'Game Development'],
        demoUrl: 'https://rascalosh.itch.io/mazerunner',
        demoLabel: 'Play',
    },
] as const;

export const EXPERIENCE_GROUPS: readonly { readonly id: ExperienceKind; readonly label: string }[] = [
    { id: 'technical', label: 'Engineering & Teaching' },
    { id: 'leadership', label: 'Leadership & Organizations' },
] as const;

export const EXPERIENCES: readonly Experience[] = [
    {
        id: 'ids-medical',
        kind: 'technical',
        role: 'Application Developer Intern',
        company: 'IDS Medical Systems Indonesia',
        duration: 'Jan 2026 to Present',
        current: true,
        description: 'Develop and maintain web applications for healthcare professionals, ensuring high performance and data accuracy.',
        tags: ['Angular', 'TypeScript', 'Node.js', 'Laravel', 'Flutter'],
    },
    {
        id: 'lab-assistant',
        kind: 'technical',
        role: 'Laboratory Assistant',
        company: 'Multimedia Nusantara University',
        duration: 'Feb 2026 to May 2026',
        current: false,
        description: 'Assist students in learning and understanding the concepts of object-oriented programming through practical exercises and interactive sessions.',
        tags: ['OOP', 'Kotlin', 'Tutoring', 'Problem Solving'],
        achievements: ['Assisted 80 students in learning OOP concepts', 'Improved student understanding of OOP concepts by 20%'],
    },
    {
        id: 'perkenalan-backend-2026-role',
        kind: 'technical',
        role: 'Backend Developer',
        company: 'Perkenalan Prodi Informatika UMN 2026',
        duration: 'Jun 2026 to Jul 2026',
        description: 'Backend developer for the Perkenalan Prodi Informatika UMN 2026 website. I built the backend for the interactive activities incoming students took part in, including the crossword puzzle (TTS) and quizzes, and implemented rate limiting to keep the system reliable for 200+ participants. The system ran stably throughout the event.',
        tags: ['Laravel', 'PHP', 'MySQL'],
        achievements: [
            'Built the backend for the TTS and quiz activities as the only backend developer',
            'Implemented rate limiting to handle concurrent traffic from 200+ participants',
            'System stayed stable throughout the event',
        ],
    },
    {
        id: 'byte-chairman',
        kind: 'leadership',
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
        kind: 'leadership',
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
        id: 'perkenalan-prodi',
        kind: 'leadership',
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
