export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  institution: string;
  sport: "football" | "basketball";
  level: string;
  location: string;
  state: string;
  yearsExperience: number;
  avatarInitials: string;
  bannerColor: string;
  openToOpportunities: boolean;
  philosophy: string;
  bio: string;
  roles: string[];
  systems: string[];
  coachedUnder: { name: string; title: string; institution: string }[];
  timeline: {
    year: string;
    role: string;
    institution: string;
    level: string;
  }[];
  education: { degree: string; institution: string; year: string }[];
  certifications: string[];
  awards: string[];
  conferences: string[];
  endorsements: {
    author: string;
    authorTitle: string;
    text: string;
    relationship: string;
  }[];
  skills: { name: string; endorsementCount: number }[];
  connections: number;
  profileViews: number;
  searchAppearances: number;
}

export const coaches: Coach[] = [
  {
    id: "marcus-williams",
    firstName: "Marcus",
    lastName: "Williams",
    title: "Offensive Coordinator / Quarterbacks Coach",
    institution: "Central State University",
    sport: "football",
    level: "Division II",
    location: "Wilberforce, OH",
    state: "OH",
    yearsExperience: 8,
    avatarInitials: "MW",
    bannerColor: "from-navy-900 to-teal-700",
    openToOpportunities: true,
    philosophy:
      "I believe in developing the complete quarterback — mentally, physically, and emotionally. My offensive philosophy centers on RPO-heavy schemes that create mismatches through pre-snap reads and tempo. Every play should put the QB in a position to make a confident, quick decision.",
    bio: "Former D1-AA quarterback turned offensive mind. 8 years of coaching experience across three levels, specializing in QB development and RPO scheme design. Known for developing raw talent into conference-level starters.",
    roles: [
      "Offensive Coordinator",
      "Quarterbacks Coach",
      "Passing Game Coordinator",
      "Recruiting Coordinator",
    ],
    systems: [
      "Air Raid",
      "RPO Heavy",
      "Spread Offense",
      "Tempo/No-Huddle",
      "West Coast Concepts",
    ],
    coachedUnder: [
      {
        name: "Coach David Patterson",
        title: "Head Coach",
        institution: "Central State University",
      },
      {
        name: "Coach Ray Thompson",
        title: "Offensive Coordinator",
        institution: "Youngstown State",
      },
      {
        name: "Coach Bill McEntire",
        title: "Head Coach",
        institution: "Walsh University",
      },
    ],
    timeline: [
      {
        year: "2024-Present",
        role: "Offensive Coordinator / QB Coach",
        institution: "Central State University",
        level: "Division II",
      },
      {
        year: "2022-2024",
        role: "Quarterbacks Coach",
        institution: "Youngstown State",
        level: "FCS",
      },
      {
        year: "2020-2022",
        role: "Offensive Quality Control",
        institution: "Youngstown State",
        level: "FCS",
      },
      {
        year: "2018-2020",
        role: "Graduate Assistant (Offense)",
        institution: "Walsh University",
        level: "NAIA",
      },
    ],
    education: [
      {
        degree: "M.S. Sport Management",
        institution: "Youngstown State University",
        year: "2020",
      },
      {
        degree: "B.S. Exercise Science",
        institution: "Walsh University",
        year: "2018",
      },
    ],
    certifications: [
      "AFCA Level 2 Certification",
      "CPR/AED Certified",
      "NCAA Recruiting Certification",
      "USA Football Coach Certification",
    ],
    awards: [
      "SIAC Offensive Coordinator of the Year (2024)",
      "FCS Rising Coach Award Nominee (2023)",
    ],
    conferences: [
      "AFCA National Convention 2024",
      "Glazier Coaching Clinic 2023",
      "Nike Coach of the Year Clinic 2022",
      "AFCA National Convention 2021",
    ],
    endorsements: [
      {
        author: "Coach David Patterson",
        authorTitle: "Head Coach, Central State University",
        text: "Marcus has an exceptional ability to connect with quarterbacks and develop their decision-making. His scheme design is creative and puts players in positions to succeed. He's ready for a coordinator role at the next level.",
        relationship: "Direct Supervisor",
      },
      {
        author: "Coach Ray Thompson",
        authorTitle: "OC, Youngstown State",
        text: "One of the most prepared and detail-oriented young coaches I've worked with. Marcus brings energy, innovation, and a genuine care for player development that is rare at his experience level.",
        relationship: "Former Supervisor",
      },
      {
        author: "James Crawford",
        authorTitle: "Starting QB, Central State (2024)",
        text: "Coach Williams changed my entire approach to reading defenses. He doesn't just teach plays — he teaches you how to think. Best QB coach I've had at any level.",
        relationship: "Former Player",
      },
    ],
    skills: [
      { name: "Quarterback Development", endorsementCount: 24 },
      { name: "RPO Scheme Design", endorsementCount: 19 },
      { name: "Play Calling", endorsementCount: 17 },
      { name: "Film Study & Game Planning", endorsementCount: 15 },
      { name: "Recruiting", endorsementCount: 12 },
      { name: "Player Development", endorsementCount: 22 },
    ],
    connections: 342,
    profileViews: 1847,
    searchAppearances: 523,
  },
  {
    id: "sarah-chen",
    firstName: "Sarah",
    lastName: "Chen",
    title: "Head Women's Basketball Coach",
    institution: "Pacific Lutheran University",
    sport: "basketball",
    level: "Division III",
    location: "Tacoma, WA",
    state: "WA",
    yearsExperience: 11,
    avatarInitials: "SC",
    bannerColor: "from-navy-900 to-orange-700",
    openToOpportunities: false,
    philosophy:
      "Defense wins championships, but player development wins careers. I build programs on a foundation of defensive intensity, unselfish ball movement, and a culture of accountability. Every player leaves my program better than they arrived — on and off the court.",
    bio: "Former D1 player turned championship-level D3 coach. Built Pacific Lutheran into a conference contender in 3 seasons. Known for developing guards and creating a defensive identity that travels across roster turnover.",
    roles: [
      "Head Coach",
      "Defensive Coordinator",
      "Guard Development",
      "Program Builder",
    ],
    systems: [
      "Pack-Line Defense",
      "Motion Offense",
      "Press & Trap Schemes",
      "Transition Attack",
      "4-Out 1-In",
    ],
    coachedUnder: [
      {
        name: "Coach Linda Ramirez",
        title: "Head Coach",
        institution: "University of Portland",
      },
      {
        name: "Coach Tom Brennan",
        title: "Head Coach",
        institution: "Whitworth University",
      },
    ],
    timeline: [
      {
        year: "2023-Present",
        role: "Head Coach",
        institution: "Pacific Lutheran University",
        level: "Division III",
      },
      {
        year: "2020-2023",
        role: "Associate Head Coach",
        institution: "Whitworth University",
        level: "Division III",
      },
      {
        year: "2017-2020",
        role: "Assistant Coach",
        institution: "University of Portland",
        level: "Division I",
      },
      {
        year: "2015-2017",
        role: "Graduate Assistant",
        institution: "University of Portland",
        level: "Division I",
      },
    ],
    education: [
      {
        degree: "M.Ed. Higher Education",
        institution: "University of Portland",
        year: "2017",
      },
      {
        degree: "B.A. Communications",
        institution: "University of Portland",
        year: "2015",
      },
    ],
    certifications: [
      "WBCA Level 3 Coaching Certification",
      "CPR/AED Certified",
      "NCAA Recruiting Certification",
      "Positive Coaching Alliance Double-Goal Coach",
    ],
    awards: [
      "NWC Coach of the Year (2025)",
      "NWC Tournament Champions (2025)",
      "WBCA 30 Under 30 (2022)",
    ],
    conferences: [
      "WBCA National Convention 2025",
      "PGC Basketball Coaching Clinic 2024",
      "NABC Convention 2023",
    ],
    endorsements: [
      {
        author: "Coach Linda Ramirez",
        authorTitle: "Head Coach, University of Portland",
        text: "Sarah is a builder. She took what she learned as a player and assistant and translated it into a program identity at PLU. Her defensive acumen is elite, and her ability to connect with student-athletes is her superpower.",
        relationship: "Former Head Coach / Mentor",
      },
      {
        author: "Coach Tom Brennan",
        authorTitle: "Head Coach, Whitworth University",
        text: "I hired Sarah because of her defensive mind and lost her because she was ready to lead. She has all the tools — recruiting, game management, player development, and the intangibles that separate good coaches from great ones.",
        relationship: "Former Head Coach",
      },
    ],
    skills: [
      { name: "Defensive Scheme Design", endorsementCount: 31 },
      { name: "Guard Development", endorsementCount: 26 },
      { name: "Program Building", endorsementCount: 20 },
      { name: "Recruiting", endorsementCount: 18 },
      { name: "Game Management", endorsementCount: 16 },
      { name: "Culture Building", endorsementCount: 28 },
    ],
    connections: 518,
    profileViews: 2341,
    searchAppearances: 712,
  },
  {
    id: "devon-jackson",
    firstName: "Devon",
    lastName: "Jackson",
    title: "Defensive Backs Coach / Recruiting Coordinator",
    institution: "Tennessee State University",
    sport: "football",
    level: "FCS",
    location: "Nashville, TN",
    state: "TN",
    yearsExperience: 6,
    avatarInitials: "DJ",
    bannerColor: "from-navy-900 to-blue-700",
    openToOpportunities: true,
    philosophy:
      "I coach the secondary like chess, not checkers. My players understand leverage, spacing, and anticipation before they ever think about athleticism. Film study is the foundation — if you can see it, you can play it.",
    bio: "High-energy defensive backs coach with a recruiting background that spans the Southeast. Former all-conference safety who transitioned into coaching with a passion for developing ball-hawking secondaries.",
    roles: [
      "Defensive Backs Coach",
      "Recruiting Coordinator",
      "Special Teams Assistant",
      "Player Development",
    ],
    systems: [
      "Cover 3 / Cover 1",
      "Pattern Match Coverage",
      "Quarters / Split Safety",
      "Pressure Packages",
      "Zone Blitz Concepts",
    ],
    coachedUnder: [
      {
        name: "Coach Eddie George",
        title: "Former Head Coach",
        institution: "Tennessee State University",
      },
      {
        name: "Coach Derrick Mason",
        title: "Defensive Coordinator",
        institution: "Tennessee State University",
      },
    ],
    timeline: [
      {
        year: "2023-Present",
        role: "DB Coach / Recruiting Coordinator",
        institution: "Tennessee State University",
        level: "FCS",
      },
      {
        year: "2021-2023",
        role: "Defensive Backs Coach",
        institution: "Lane College",
        level: "Division II",
      },
      {
        year: "2020-2021",
        role: "Graduate Assistant (Defense)",
        institution: "Tennessee State University",
        level: "FCS",
      },
    ],
    education: [
      {
        degree: "M.S. Sports Administration",
        institution: "Tennessee State University",
        year: "2021",
      },
      {
        degree: "B.S. Kinesiology",
        institution: "Austin Peay State University",
        year: "2019",
      },
    ],
    certifications: [
      "AFCA Level 1 Certification",
      "CPR/AED Certified",
      "NCAA Recruiting Certification",
    ],
    awards: ["OVC All-Conference Safety (2018, 2019 — as player)"],
    conferences: [
      "AFCA National Convention 2024",
      "Nike Coach of the Year Clinic 2023",
    ],
    endorsements: [
      {
        author: "Coach Derrick Mason",
        authorTitle: "DC, Tennessee State University",
        text: "Devon is a natural teacher. His DBs play with confidence and technique because of the work he puts in during the week. His recruiting ability in the Southeast is a real asset.",
        relationship: "Direct Supervisor",
      },
    ],
    skills: [
      { name: "Secondary Development", endorsementCount: 14 },
      { name: "Coverage Scheme Design", endorsementCount: 11 },
      { name: "Recruiting (Southeast)", endorsementCount: 18 },
      { name: "Film Analysis", endorsementCount: 13 },
      { name: "Player Relationships", endorsementCount: 16 },
    ],
    connections: 267,
    profileViews: 1203,
    searchAppearances: 389,
  },
  {
    id: "antonio-reyes",
    firstName: "Antonio",
    lastName: "Reyes",
    title: "Assistant Coach / Player Development",
    institution: "Rio Grande Valley Vipers (G-League)",
    sport: "basketball",
    level: "Professional",
    location: "Edinburg, TX",
    state: "TX",
    yearsExperience: 9,
    avatarInitials: "AR",
    bannerColor: "from-navy-900 to-red-700",
    openToOpportunities: true,
    philosophy:
      "Player development is about building habits, not just skills. I focus on creating repeatable processes that translate from practice to games. Analytics inform my approach, but relationships drive my results.",
    bio: "Bilingual coaching professional with experience spanning college and professional basketball. Specializes in individual player development, analytics integration, and bridging the gap between G-League and NBA preparation.",
    roles: [
      "Player Development Coach",
      "Analytics Integration",
      "Shooting Coach",
      "Advance Scout",
    ],
    systems: [
      "Spread Pick & Roll",
      "Dribble Drive Motion",
      "Switching Defense",
      "Five-Out Concepts",
      "Analytics-Driven Lineups",
    ],
    coachedUnder: [
      {
        name: "Coach Matt Brase",
        title: "Head Coach",
        institution: "RGV Vipers",
      },
      {
        name: "Coach Al Skinner",
        title: "Coaching Consultant",
        institution: "NBA Development Program",
      },
    ],
    timeline: [
      {
        year: "2024-Present",
        role: "Assistant Coach / Player Development",
        institution: "RGV Vipers (G-League)",
        level: "Professional",
      },
      {
        year: "2021-2024",
        role: "Director of Player Development",
        institution: "UT Rio Grande Valley",
        level: "Division I",
      },
      {
        year: "2019-2021",
        role: "Assistant Coach",
        institution: "Texas A&M Kingsville",
        level: "Division II",
      },
      {
        year: "2017-2019",
        role: "Graduate Assistant",
        institution: "UT San Antonio",
        level: "Division I",
      },
    ],
    education: [
      {
        degree: "M.B.A.",
        institution: "UT San Antonio",
        year: "2019",
      },
      {
        degree: "B.S. Sport Management",
        institution: "Texas A&M Kingsville",
        year: "2017",
      },
    ],
    certifications: [
      "NBA Coaches Association Development Program",
      "CPR/AED Certified",
      "NABC Court Coaches Certification",
    ],
    awards: [
      "WAC Rising Coach Award (2023)",
      "NABC Under Armour 30-Under-30 Team (2022)",
    ],
    conferences: [
      "NBA Summer League Coaching Symposium 2024",
      "NABC Convention 2023",
      "Sloan Sports Analytics Conference 2023",
    ],
    endorsements: [
      {
        author: "Coach Matt Brase",
        authorTitle: "Head Coach, RGV Vipers",
        text: "Antonio bridges the gap between analytics and player relationships better than anyone I've worked with. His bilingual ability and cultural intelligence make him invaluable in our market.",
        relationship: "Direct Supervisor",
      },
      {
        author: "Coach Al Skinner",
        authorTitle: "NBA Development Consultant",
        text: "Antonio has the mind and the work ethic to be a head coach. His player development plans are thorough, data-driven, and most importantly, they work.",
        relationship: "Mentor",
      },
    ],
    skills: [
      { name: "Player Development", endorsementCount: 29 },
      { name: "Analytics Integration", endorsementCount: 22 },
      { name: "Shooting Development", endorsementCount: 19 },
      { name: "Advance Scouting", endorsementCount: 15 },
      { name: "Bilingual Coaching (EN/ES)", endorsementCount: 20 },
    ],
    connections: 412,
    profileViews: 2890,
    searchAppearances: 834,
  },
  {
    id: "tyler-brooks",
    firstName: "Tyler",
    lastName: "Brooks",
    title: "Offensive Line Coach",
    institution: "Grand View University",
    sport: "football",
    level: "NAIA",
    location: "Des Moines, IA",
    state: "IA",
    yearsExperience: 4,
    avatarInitials: "TB",
    bannerColor: "from-navy-900 to-green-700",
    openToOpportunities: true,
    philosophy:
      "The offensive line is the heartbeat of the team. I emphasize technique-first coaching — hand placement, footwork, leverage — and build from there into scheme mastery. Toughness is taught, not inherited.",
    bio: "Young, hungry offensive line coach building his career in the NAIA. Former walk-on lineman who earned a scholarship and now pours that same work ethic into developing undersized, overlooked linemen into conference performers.",
    roles: [
      "Offensive Line Coach",
      "Run Game Coordinator",
      "Strength & Conditioning Support",
    ],
    systems: [
      "Inside Zone",
      "Outside Zone",
      "Gap/Power Scheme",
      "RPO Blocking Concepts",
      "Pass Protection (Slide/Man)",
    ],
    coachedUnder: [
      {
        name: "Coach Joe Woodley",
        title: "Head Coach",
        institution: "Grand View University",
      },
    ],
    timeline: [
      {
        year: "2023-Present",
        role: "Offensive Line Coach",
        institution: "Grand View University",
        level: "NAIA",
      },
      {
        year: "2022-2023",
        role: "Graduate Assistant (OL)",
        institution: "Grand View University",
        level: "NAIA",
      },
    ],
    education: [
      {
        degree: "M.S. Coaching & Athletic Administration",
        institution: "Grand View University",
        year: "2023",
      },
      {
        degree: "B.A. Physical Education",
        institution: "Grand View University",
        year: "2021",
      },
    ],
    certifications: [
      "AFCA Level 1 Certification",
      "NSCA CSCS",
      "CPR/AED Certified",
    ],
    awards: [],
    conferences: ["AFCA National Convention 2024", "Glazier Coaching Clinic 2023"],
    endorsements: [
      {
        author: "Coach Joe Woodley",
        authorTitle: "Head Coach, Grand View University",
        text: "Tyler is the first one in and the last one out. His technical knowledge of OL play is advanced for his experience level, and his players would run through a wall for him.",
        relationship: "Head Coach",
      },
    ],
    skills: [
      { name: "Offensive Line Technique", endorsementCount: 8 },
      { name: "Zone Blocking Schemes", endorsementCount: 7 },
      { name: "Film Breakdown", endorsementCount: 6 },
      { name: "Strength Development", endorsementCount: 9 },
      { name: "Player Motivation", endorsementCount: 11 },
    ],
    connections: 134,
    profileViews: 567,
    searchAppearances: 189,
  },
  {
    id: "michelle-okafor",
    firstName: "Michelle",
    lastName: "Okafor",
    title: "Associate Head Coach / Recruiting Coordinator",
    institution: "Howard University",
    sport: "basketball",
    level: "Division I",
    location: "Washington, DC",
    state: "DC",
    yearsExperience: 12,
    avatarInitials: "MO",
    bannerColor: "from-navy-900 to-purple-700",
    openToOpportunities: false,
    philosophy:
      "Basketball is a game of spacing, timing, and trust. I build offenses that empower decision-makers at every position and defenses that communicate relentlessly. Recruiting is about relationships first — find great people, and you'll find great players.",
    bio: "Veteran associate head coach with a proven track record in D1 women's basketball recruiting and program development. Former MEAC Player of the Year now dedicated to building championship-caliber programs at HBCUs.",
    roles: [
      "Associate Head Coach",
      "Recruiting Coordinator",
      "Offensive Coordinator",
      "Post Player Development",
    ],
    systems: [
      "Motion Offense",
      "Ball Screen Heavy",
      "2-3 Zone",
      "Transition Offense",
      "Press Break Specialist",
    ],
    coachedUnder: [
      {
        name: "Coach Ty Freeman",
        title: "Head Coach",
        institution: "Howard University",
      },
      {
        name: "Coach Dawn Staley",
        title: "Head Coach",
        institution: "University of South Carolina",
      },
    ],
    timeline: [
      {
        year: "2022-Present",
        role: "Associate Head Coach",
        institution: "Howard University",
        level: "Division I",
      },
      {
        year: "2019-2022",
        role: "Assistant Coach",
        institution: "University of South Carolina",
        level: "Division I",
      },
      {
        year: "2016-2019",
        role: "Assistant Coach",
        institution: "Coppin State University",
        level: "Division I",
      },
      {
        year: "2014-2016",
        role: "Graduate Assistant",
        institution: "Norfolk State University",
        level: "Division I",
      },
    ],
    education: [
      {
        degree: "M.A. Sports Leadership",
        institution: "Norfolk State University",
        year: "2016",
      },
      {
        degree: "B.S. Business Administration",
        institution: "Howard University",
        year: "2014",
      },
    ],
    certifications: [
      "WBCA Level 3 Coaching Certification",
      "NCAA Recruiting Certification",
      "CPR/AED Certified",
      "WBCA So You Want to Be a Coach Program",
    ],
    awards: [
      "MEAC Player of the Year (2013, 2014 — as player)",
      "WBCA Thirty Under 30 (2020)",
      "MEAC Tournament Champions (2024 — as coach)",
    ],
    conferences: [
      "WBCA National Convention 2025",
      "NCAA Women's Final Four Coaching Symposium 2024",
      "WBCA National Convention 2023",
    ],
    endorsements: [
      {
        author: "Coach Dawn Staley",
        authorTitle: "Head Coach, University of South Carolina",
        text: "Michelle is a future head coach, no question. Her recruiting eye, her ability to develop post players, and her understanding of the game at the highest level make her one of the best young coaches in the country.",
        relationship: "Former Head Coach",
      },
      {
        author: "Coach Ty Freeman",
        authorTitle: "Head Coach, Howard University",
        text: "Michelle is the engine of our program. She recruits at an elite level, coaches with intensity and care, and represents everything we want Howard basketball to be.",
        relationship: "Current Head Coach",
      },
    ],
    skills: [
      { name: "D1 Recruiting", endorsementCount: 35 },
      { name: "Post Player Development", endorsementCount: 28 },
      { name: "Offensive Scheme Design", endorsementCount: 24 },
      { name: "Program Building", endorsementCount: 22 },
      { name: "Game Preparation", endorsementCount: 19 },
      { name: "HBCU Network", endorsementCount: 30 },
    ],
    connections: 687,
    profileViews: 3456,
    searchAppearances: 1102,
  },
];

export const coachingTreeData = {
  rootCoach: {
    name: "Coach David Patterson",
    title: "Head Coach",
    institution: "Central State University",
    children: [
      {
        name: "Marcus Williams",
        title: "OC / QB Coach",
        institution: "Central State University",
        children: [],
      },
      {
        name: "Andre Mitchell",
        title: "DC",
        institution: "Central State University",
        children: [
          {
            name: "Kyle Henderson",
            title: "DB Coach",
            institution: "Tuskegee University",
            children: [],
          },
        ],
      },
      {
        name: "Brandon Lewis",
        title: "RB Coach",
        institution: "Kentucky State University",
        children: [],
      },
    ],
  },
  mentorTree: {
    name: "Coach Bill McEntire",
    title: "Head Coach",
    institution: "Walsh University",
    children: [
      {
        name: "Coach Ray Thompson",
        title: "OC",
        institution: "Youngstown State",
        children: [
          {
            name: "Marcus Williams",
            title: "OC / QB Coach",
            institution: "Central State University",
            children: [],
          },
          {
            name: "Ryan Cooper",
            title: "WR Coach",
            institution: "Youngstown State",
            children: [],
          },
        ],
      },
      {
        name: "Coach Jim Hargrove",
        title: "DC",
        institution: "Malone University",
        children: [],
      },
    ],
  },
};

export const opportunities = [
  {
    id: "opp-1",
    title: "Quarterbacks Coach",
    institution: "Sam Houston State University",
    level: "FCS (Division I)",
    sport: "football" as const,
    location: "Huntsville, TX",
    type: "Full-Time",
    posted: "2 days ago",
    description:
      "Seeking an experienced quarterbacks coach to develop a young QB room. Preference for candidates with RPO scheme experience and strong recruiting ties in Texas.",
    requirements: [
      "3+ years coaching experience at the college level",
      "QB development track record",
      "Recruiting experience in Texas/Gulf Coast",
    ],
    tags: ["Quarterbacks", "FCS", "Texas", "RPO"],
  },
  {
    id: "opp-2",
    title: "Assistant Women's Basketball Coach",
    institution: "Villanova University",
    level: "Division I (Big East)",
    sport: "basketball" as const,
    location: "Villanova, PA",
    type: "Full-Time",
    posted: "5 days ago",
    description:
      "Villanova women's basketball is looking for an assistant coach to oversee guard development, assist with game preparation, and serve as a primary recruiter in the Mid-Atlantic region.",
    requirements: [
      "5+ years D1 coaching or playing experience",
      "Strong recruiting network in the Northeast",
      "Experience with motion offense systems",
    ],
    tags: ["Women's Basketball", "D1", "Big East", "Recruiting"],
  },
  {
    id: "opp-3",
    title: "Defensive Coordinator",
    institution: "Lenoir-Rhyne University",
    level: "Division II (SAC)",
    sport: "football" as const,
    location: "Hickory, NC",
    type: "Full-Time",
    posted: "1 week ago",
    description:
      "Lenoir-Rhyne seeks a defensive coordinator to install and manage a multiple-front defense. Ideal candidate has experience with 3-4 and 4-3 schemes and can recruit the Carolinas.",
    requirements: [
      "5+ years defensive coaching experience",
      "DC or co-DC experience preferred",
      "Proven recruiting ability in the Southeast",
    ],
    tags: ["Defensive Coordinator", "D2", "Southeast", "Multiple Defense"],
  },
  {
    id: "opp-4",
    title: "Men's Basketball Head Coach",
    institution: "Bethany College",
    level: "NAIA",
    sport: "basketball" as const,
    location: "Lindsborg, KS",
    type: "Full-Time",
    posted: "3 days ago",
    description:
      "Bethany College is searching for a head men's basketball coach to rebuild and energize the program. This is an excellent opportunity for a first-time head coach with strong program-building skills.",
    requirements: [
      "Assistant coaching experience at the college level",
      "Demonstrated ability to recruit student-athletes",
      "Experience with program development",
    ],
    tags: ["Head Coach", "NAIA", "Program Builder", "Men's Basketball"],
  },
  {
    id: "opp-5",
    title: "Graduate Assistant — Football (Offense)",
    institution: "Western Kentucky University",
    level: "FBS (Division I)",
    sport: "football" as const,
    location: "Bowling Green, KY",
    type: "Graduate Assistant",
    posted: "1 day ago",
    description:
      "WKU football is accepting applications for an offensive GA position. Responsibilities include quality control, film breakdown, practice organization, and recruiting support.",
    requirements: [
      "Bachelor's degree required",
      "Admission to WKU graduate program",
      "Playing or coaching experience preferred",
    ],
    tags: ["GA", "FBS", "Offense", "Entry Level"],
  },
  {
    id: "opp-6",
    title: "Women's Basketball — Director of Player Development",
    institution: "University of Memphis",
    level: "Division I (AAC)",
    sport: "basketball" as const,
    location: "Memphis, TN",
    type: "Full-Time",
    posted: "4 days ago",
    description:
      "The University of Memphis women's basketball program seeks a Director of Player Development to oversee individual skill development, coordinate off-season workouts, and support analytics integration.",
    requirements: [
      "Playing experience at the D1 level preferred",
      "Experience with individual skill development",
      "Understanding of basketball analytics",
    ],
    tags: [
      "Player Development",
      "D1",
      "Women's Basketball",
      "Analytics",
    ],
  },
];

export const feedPosts = [
  {
    id: "post-1",
    author: "Michelle Okafor",
    authorTitle: "Associate Head Coach, Howard University",
    authorInitials: "MO",
    timeAgo: "3 hours ago",
    content:
      "Thrilled to announce that Howard women's basketball will be hosting our annual coaching clinic this summer! Great opportunity for aspiring coaches to learn from some of the best minds in the MEAC. Registration opens next week.",
    likes: 47,
    comments: 12,
    type: "announcement",
  },
  {
    id: "post-2",
    author: "Marcus Williams",
    authorTitle: "OC / QB Coach, Central State University",
    authorInitials: "MW",
    timeAgo: "6 hours ago",
    content:
      "One thing I learned early from Coach Thompson: the best play callers aren't the ones with the most plays — they're the ones who know which 15 plays to call in the right moment. Simplicity creates confidence. Confidence creates execution.",
    likes: 89,
    comments: 23,
    type: "insight",
  },
  {
    id: "post-3",
    author: "Sarah Chen",
    authorTitle: "Head Coach, Pacific Lutheran University",
    authorInitials: "SC",
    timeAgo: "1 day ago",
    content:
      "Just returned from the WBCA Convention — so many incredible sessions on building defensive culture. The panel on pack-line defense adaptations for smaller rosters was exactly what I needed. Grateful for this coaching community.",
    likes: 62,
    comments: 8,
    type: "development",
  },
  {
    id: "post-4",
    author: "Devon Jackson",
    authorTitle: "DB Coach, Tennessee State University",
    authorInitials: "DJ",
    timeAgo: "2 days ago",
    content:
      "Film study tip for young DB coaches: don't just watch the receiver — watch the QB's eyes and shoulders. Teach your guys to read the same pre-snap cues the QB is reading. It changes everything about how they play the ball.",
    likes: 134,
    comments: 31,
    type: "insight",
  },
];
