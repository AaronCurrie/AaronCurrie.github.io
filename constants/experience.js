import styles from '../app/game/experience/page.module.css';

export const experience = [
    {
        title: 'Software Engineer',
        backgroundImage: '/backgrounds/apartment.png',
        layout: 'center',
        images: ['/personal/skygroup.png', '/personal/skygroup2.png'],
        timeline : <div aria-hidden={true} inert className={`${styles.timeLine} ${styles.middle100} `}></div>,
        description: {
            company: 'Sky',
            position: 'Software Engineer',
            date: 'March 2024 - Present',
            time: '1 year 5 months',
            location: "Leeds, UK",
            codename: 'Infinite Loop',
            bio: 'I\'ve been a full-stack developer at Sky for almost 3 years, I quickly progressed from junior to mid-level after proving myself on many projects some of which were lead by me. I\'ve delivered a wide range of projects across modern frontends and cloud-native backends, working with technologies like React, Next.js, Google Cloud, and Docker.',
            points: [
                'Led migration from Next.js Pages Router to App Router, improving codebase scalability and developer experience.',
                'Designed and implemented a secure, scalable article ingestion pipeline using GCP (API Gateway, Cloud Functions, Pub/Sub).',
                'Migrated search from Azure to Elasticsearch, enhancing search performance and reliability.',
                'Mentored new engineers and technically led a graduate team on an internal tool, covering planning, PR reviews, and architectural guidance.',
                'Integrated authentication across stage sites with NextAuth and custom middleware.',
                'Cybersecurity Champion (Green Belt Level), ensuring best practices across development'
            ]
        }
    },
    {
        title: 'Associate Software Engineer',
        backgroundImage: '/backgrounds/city.png',
        layout: 'right',
        images: ['/personal/bestream.png', 'personal/studios.png'],
        timeline : <>
            <div className={`${styles.timeLine} ${styles.top50} `}></div>
            <div className={`${styles.timeLine} ${styles.right50} `}></div>
            <div className={`${styles.timeLine} ${styles.bottomRight50} `}></div>
        </>,
        description: {
            company: 'Sky',
            position: 'Associate Software Engineer',
            time: '1 year',
            date: 'December 2022 - March 2024',
            location: "Leeds, UK",
            codename: 'Silent Commit',
            bio: 'I joined Sky as an Associate Software Engineer after completing my bootcamp, working on the SkyWebsites team. I hit the ground running, contributing to a large-scale website building platform by developing modular, composable React components used across multiple sites.',
            points: [
                'Key contributor on a team building a dynamic website builder platform (similar to Squarespace/Wix) for Sky-branded sites using Next.js and React.',
                'Promoted from Associate to Mid-level Software Engineer within 15 months due to impactful contributions and ownership.',
                'Built reusable component libraries and introduced a column-based layout system, significantly enhancing editorial design flexibility.',
                'Built and maintained CI/CD infrastructure with CircleCI, Octopus, and Terraform.',
                'Introduced and maintained functional testing suite using Cypress.',
                'Revamped theming architecture using Styled Components to allow greater customization.'
            ]
        }
    },
    {
        title: 'Northcoders Bootcamp',
        backgroundImage: '/backgrounds/campus.png',
        layout: 'center',
        images: ['/personal/ac-nc.jpeg', 'questr/questr1.jpg'],
        timeline : <>
            <div className={`${styles.timeLine} ${styles.topRight50} `}></div>
            <div className={`${styles.timeLine} ${styles.right50} `}></div>
            <div className={`${styles.timeLine} ${styles.bottom50} `}></div>
        </>,
        description: {
            company: 'Northcoders Bootcamp',
            position: 'Full Stack Developer Trainee',
            time: '4 months',
            date: 'August 2022 - November 2022',
            location: "Leeds, UK",
            codename: 'Recursive Shadow',
            bio: 'I completed a full-stack software development bootcamp with Northcoders, where I gained hands-on experience in modern web technologies. The program was divided into four key sections — JavaScript, frontend, backend, and a final group project — each culminating in practical app-building challenges. The focus was on writing real, working code over just theory, giving me a strong foundation in both individual and collaborative development.',
            points: [
                'Completed an intensive full-stack software development bootcamp.',
                'Built many projects including RESTful API\'s using Express and PostgreSQL, and full frontend\'s using React and vanilla js.',
                'Final project: A gamified life app using React Native and AWS for backend/authentication.',
                'Gained strong foundational skills in JavaScript, TDD, Git, pair programming, and Agile methodologies.',
                'Collaborated with peers on group projects, enhancing teamwork and communication skills.'
            ]
        }
    },
    {
        title: 'Bar Manager',
        backgroundImage: '/backgrounds/shore.png',
        layout: 'left',
        images: ['/personal/hobbies1.jpg'], 
        timeline : <><div className={`${styles.timeLine} ${styles.top50} `}></div>
        <div className={`${styles.timeLine} ${styles.right50} `}></div>
        <div className={`${styles.timeLine} ${styles.left50} `}></div>
        <div className={`${styles.timeLine} ${styles.bottomLeft50} `}></div>
        <div className={`${styles.timeLine} ${styles.bottomRight50} `}></div></>
        ,
        description: {
            company: 'Seasalt Clovelly',
            position: 'Bar Manager',
            time: '11 months',
            date: 'September 2021 - July 2022',
            location: "Sydney, Australia",
            codename: 'Memory Leak',
            bio: 'I worked as Bar Manager at Seasalt Clovelly, a high-volume beachfront venue in Sydney. I was responsible for the day-to-day operations of the bar, including managing a team of over 15 staff, coordinating rosters, overseeing inventory and ordering, ensuring compliance with licensing regulations, and maintaining high service standards during peak trading periods. The role demanded strong leadership, logistical planning, and the ability to adapt quickly in a fast-paced, customer-focused environment.',
            points: [
                'Managed daily operations of the bar, including staff scheduling and inventory management.',
                'Ensured high standards of customer service and satisfaction.',
                'Developed and implemented new drink menus and promotions to attract customers.',
                'Responsible for scheduling, ordering, staff training, cash handling, and customer service.',
                'Trained and mentored new staff on bar procedures and customer service best practices.',
            ]
        }
    },
    {
        title: 'Self Learning Code Academy',
        backgroundImage: '/backgrounds/city-mountains.png',
        layout: 'right',
        images: ['/personal/hobbies5.jpg'], 
        timeline : <><div className={`${styles.timeLine} ${styles.topRight50} `}></div>
        <div className={`${styles.timeLine} ${styles.topLeft50} `}></div>
        <div className={`${styles.timeLine} ${styles.bottomRight50} `}></div>
        <div className={`${styles.timeLine} ${styles.bottomLeft50} `}></div></>
        ,
        description: {
            company: 'Self Learning Code Academy',
            position: 'Student',
            time: '1 year',
            date: 'September 2021 - September 2022',
            location: "Sydney, Australia",
            codename: 'Encrypted Stack',
            bio: 'During my self-learning journey, I completed several Codecademy courses and studied Harvard’s CS50: Introduction to Computer Science. This gave me a strong foundation in HTML, CSS, and vanilla JavaScript, and helped me develop a solid understanding of core programming concepts, problem-solving, and front-end development best practices. This period laid the groundwork for my transition into a full-time software engineering role.',
            points: [
                'Engaged in self-directed learning to master web development technologies.',
                'Built several personal projects to apply learned skills in real-world scenarios.',
                'Participated in online coding communities to share knowledge and collaborate with others.'
            ]
        }
    },
    {
        title: 'Bar Supervisor',
        backgroundImage: '/backgrounds/mountain-town.png',
        layout: 'center',
        images: ['/personal/hobbies1.jpg'], 
        timeline : <><div className={`${styles.timeLine} ${styles.topRight50} `}></div>
        <div className={`${styles.timeLine} ${styles.topLeft50} `}></div>
        <div className={`${styles.timeLine} ${styles.right50} `}></div>
        <div className={`${styles.timeLine} ${styles.left50} `}></div>
            <div className={`${styles.timeLine} ${styles.bottom50} `}></div></>
        ,
        description: {
            company: 'Thredbo Ski Resort',
            position: 'Bar Supervisor',
            time: '1 year 3 months',
            date: 'June 2020 - September 2021',
            location: "Jindabyne, Australia",
            codename: 'Cold Commit',
            bio: 'I worked as a Bar Supervisor and Cocktail Bartender at Thredbo Ski Resort, rotating across multiple high-volume venues. This role sharpened my hospitality skills, with a strong focus on customer service, communication, and teamwork in a fast-paced, seasonal environment. I regularly prepared high-quality cocktails, managed bar operations during busy periods, and ensured a welcoming atmosphere for guests from around the world.',
            points: [
                'Bar supervisor in a busy ski resort; awarded Employee of the Season.',
                'Crafted original cocktails and handled high-volume service for restaurant and bar.',
                'Worked with international tourists in a fast-paced environment, sharpening communication and customer service skills.',
                'Ran various venues including cocktail bar, mountain BBQ, and bakery kitchen.',
                'Managed teams, handled stock, ensured smooth service during both winter and summer operations.'
            ]
        }
    },
    {
        title: 'Various Roles and Travel',
        backgroundImage: '/backgrounds/jungle.png',
        layout: 'left',
        images: ['/personal/hobbies1.jpg'], 
        timeline : <><div className={`${styles.timeLine} ${styles.top50} `}></div>
        <div className={`${styles.timeLine} ${styles.left50} `}></div>
        <div className={`${styles.timeLine} ${styles.bottomLeft50} `}></div></>
        ,
        description: {
            company: 'Various',
            position: 'Hospitality Work, Event Work, Hostel Work, Cocktail Bartender',
            time: '3 years',
            date: 'June 2017 - June 2020',
            location: "Unknown",
            codename: 'Manual Override',
            bio: 'During my travels through Australia and New Zealand, I embraced a wide variety of roles across hospitality, event setup, farm work, labouring, and hostel operations. This diverse experience developed my adaptability, work ethic, and communication skills as I navigated different industries and team dynamics in fast-changing environments. Whether serving guests, setting up large-scale events, or working hands-on in rural settings, I gained valuable insight into global work cultures while building resilience and problem-solving abilities.',
            points: [
                'Worked in various roles while traveling, enhancing customer service skills.',
                'Adapted to different work environments and cultures during travels.',
                'Developed strong problem-solving and communication skills through diverse experiences.'
            ]
        }
    },
    {
        title: 'Senior Laboratory Technician',
        backgroundImage: '/backgrounds/lab.png',
        layout: 'center',
        images: ['/personal/hobbies4.jpg'], 
        timeline : <><div className={`${styles.timeLine} ${styles.topLeft50} `}></div>
        <div className={`${styles.timeLine} ${styles.left50} `}></div>
        <div className={`${styles.timeLine} ${styles.bottom50} `}></div></>
        ,
        description: {
            company: 'Thorden Academy',
            position: 'Senior Laboratory Technician',
            time: '6 years',
            date: 'May 2011 - May 2017',
            location: "Southampton, UK",
            codename: 'Cache Fusion',
            bio: 'As a Senior Lab Technician, I was responsible for designing and preparing science experiments across Chemistry, Biology, and Physics. The role required a high level of precision, safety awareness, and attention to detail. I managed chemical inventories, ordered supplies, and prepared bespoke solutions and materials to exact specifications. I also supported teaching staff by ensuring all equipment was correctly calibrated and experiments were set up efficiently and safely.',
            points: [
                'Overseeing a team of 2 technicians.',
                'Managed procurement, budget, and rotas.',
                'Maintained and supported IT hardware (40 laptops, 20 iPads), installing and updating software.',
                'Adhered to strict COSH guidelines when preparing chemicals and compounds.',
                'Developed experiments and practicals for teachers to use in lessons to display key points in the curriculum.',
                'Developed leadership, organisational and multitasking skills in a demanding academic environment.'
            ]
        }
    },
]