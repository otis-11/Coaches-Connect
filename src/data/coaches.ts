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
  schoolRecords: {
    institution: string;
    years: string;
    wins: number;
    losses: number;
    ties?: number;
    note?: string;
  }[];
  personalRecord: {
    wins: number;
    losses: number;
    ties?: number;
  };
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
    schoolRecords: [
      {
        institution: "Central State University",
        years: "2024-Present",
        wins: 8,
        losses: 3,
        note: "SIAC Championship Appearance",
      },
      {
        institution: "Youngstown State",
        years: "2020-2024",
        wins: 29,
        losses: 19,
        note: "FCS Playoff Qualifier (2023)",
      },
      {
        institution: "Walsh University",
        years: "2018-2020",
        wins: 14,
        losses: 8,
      },
    ],
    personalRecord: {
      wins: 51,
      losses: 30,
    },
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
    schoolRecords: [
      {
        institution: "Pacific Lutheran University",
        years: "2023-Present",
        wins: 47,
        losses: 18,
        note: "NWC Tournament Champions (2025)",
      },
      {
        institution: "Whitworth University",
        years: "2020-2023",
        wins: 62,
        losses: 26,
        note: "NWC Regular Season Co-Champions (2022)",
      },
      {
        institution: "University of Portland",
        years: "2015-2020",
        wins: 78,
        losses: 72,
      },
    ],
    personalRecord: {
      wins: 187,
      losses: 116,
    },
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
    schoolRecords: [
      {
        institution: "Tennessee State University",
        years: "2020-Present",
        wins: 24,
        losses: 21,
        note: "OVC Semifinalists (2023)",
      },
      {
        institution: "Lane College",
        years: "2021-2023",
        wins: 13,
        losses: 9,
      },
    ],
    personalRecord: {
      wins: 37,
      losses: 30,
    },
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
    schoolRecords: [
      {
        institution: "RGV Vipers (G-League)",
        years: "2024-Present",
        wins: 22,
        losses: 14,
        note: "G-League Showcase Cup Qualifier",
      },
      {
        institution: "UT Rio Grande Valley",
        years: "2021-2024",
        wins: 52,
        losses: 42,
        note: "WAC Tournament Semifinals (2023)",
      },
      {
        institution: "Texas A&M Kingsville",
        years: "2019-2021",
        wins: 33,
        losses: 21,
      },
      {
        institution: "UT San Antonio",
        years: "2017-2019",
        wins: 39,
        losses: 25,
      },
    ],
    personalRecord: {
      wins: 146,
      losses: 102,
    },
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
    schoolRecords: [
      {
        institution: "Grand View University",
        years: "2022-Present",
        wins: 26,
        losses: 5,
        note: "NAIA National Semifinalists (2024)",
      },
    ],
    personalRecord: {
      wins: 26,
      losses: 5,
    },
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
    schoolRecords: [
      {
        institution: "Howard University",
        years: "2022-Present",
        wins: 58,
        losses: 31,
        note: "MEAC Tournament Champions (2024)",
      },
      {
        institution: "University of South Carolina",
        years: "2019-2022",
        wins: 82,
        losses: 15,
        note: "National Champions (2022), Final Four (2021)",
      },
      {
        institution: "Coppin State University",
        years: "2016-2019",
        wins: 38,
        losses: 52,
      },
      {
        institution: "Norfolk State University",
        years: "2014-2016",
        wins: 35,
        losses: 25,
        note: "MEAC Regular Season Champions (2015)",
      },
    ],
    personalRecord: {
      wins: 213,
      losses: 123,
    },
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

// ── Film Room ──────────────────────────────────────────────────────────

export interface FilmClip {
  id: string;
  coachId: string;
  title: string;
  description: string;
  category: "play" | "scheme" | "drill" | "game-film" | "breakdown";
  sport: "football" | "basketball";
  tags: string[];
  thumbnailColor: string;
  duration: string;
  views: number;
  likes: number;
  uploadedAt: string;
  formation?: string;
  result?: string;
}

export const filmClips: FilmClip[] = [
  {
    id: "clip-1",
    coachId: "marcus-williams",
    title: "RPO Glance Concept vs. Cover 3",
    description: "Our bread-and-butter RPO that accounted for 14 TDs this season. QB reads the flat defender — if he widens, throw the glance route behind him. If he sits, hand off the inside zone.",
    category: "play",
    sport: "football",
    tags: ["RPO", "Air Raid", "Cover 3 Beater", "Quick Game"],
    thumbnailColor: "from-teal-500 to-emerald-600",
    duration: "2:34",
    views: 1243,
    likes: 87,
    uploadedAt: "2024-11-15",
    formation: "11 Personnel — Trips Right",
    result: "14 TDs, 78% completion rate on this concept in 2024",
  },
  {
    id: "clip-2",
    coachId: "marcus-williams",
    title: "Tempo No-Huddle: 2-Minute Drill Install",
    description: "Full breakdown of our 2-minute offense install. Covers signal system, formation checks, and the 5 plays we rep every Tuesday for end-of-half situations.",
    category: "scheme",
    sport: "football",
    tags: ["Tempo", "No-Huddle", "2-Minute Drill", "Situational"],
    thumbnailColor: "from-blue-500 to-indigo-600",
    duration: "8:12",
    views: 892,
    likes: 64,
    uploadedAt: "2024-10-22",
    formation: "Multiple",
    result: "Scored on 6 of 8 end-of-half possessions in 2024",
  },
  {
    id: "clip-3",
    coachId: "marcus-williams",
    title: "QB Progression Read Drill — 3-Step Drop",
    description: "Daily individual drill we use for QBs to train their eyes through a full-field progression. High-low read to boundary, backside check-down. Film from spring practice.",
    category: "drill",
    sport: "football",
    tags: ["QB Development", "Fundamentals", "Individual Drill"],
    thumbnailColor: "from-amber-500 to-orange-600",
    duration: "4:47",
    views: 2105,
    likes: 156,
    uploadedAt: "2024-04-08",
  },
  {
    id: "clip-4",
    coachId: "marcus-williams",
    title: "Game Film: Central State vs. Tuskegee — 4th Quarter Comeback",
    description: "Full 4th quarter cut-up from our comeback win over Tuskegee. Down 17 entering the quarter, we ran our tempo package and scored 24 unanswered. Annotated with play calls.",
    category: "game-film",
    sport: "football",
    tags: ["Game Film", "4th Quarter", "Comeback", "SIAC"],
    thumbnailColor: "from-red-500 to-rose-600",
    duration: "12:30",
    views: 3421,
    likes: 234,
    uploadedAt: "2024-10-06",
    result: "Central State 31, Tuskegee 24 — 24 unanswered in Q4",
  },
  {
    id: "clip-5",
    coachId: "marcus-williams",
    title: "Film Breakdown: How We Attack Cover 2",
    description: "Whiteboard + film breakdown of our Cover 2 attack package. Four-verticals, smash concept, and the sail route that gave us 3 TDs in the SIAC championship.",
    category: "breakdown",
    sport: "football",
    tags: ["Film Study", "Cover 2", "Passing Game", "Whiteboard"],
    thumbnailColor: "from-purple-500 to-violet-600",
    duration: "6:55",
    views: 1678,
    likes: 119,
    uploadedAt: "2024-12-01",
    formation: "11 & 12 Personnel",
    result: "3 TDs vs. Cover 2 in SIAC Championship",
  },
  {
    id: "clip-6",
    coachId: "sarah-chen",
    title: "Pack-Line Defense: Help-Side Principles",
    description: "Full teaching progression for our pack-line defense. Covers gap positioning, help-side rotation, and the closeout technique that held opponents to 38% FG in conference play.",
    category: "scheme",
    sport: "basketball",
    tags: ["Pack-Line", "Defense", "Help-Side", "Teaching Progression"],
    thumbnailColor: "from-orange-500 to-red-600",
    duration: "7:22",
    views: 1890,
    likes: 142,
    uploadedAt: "2025-01-10",
    result: "Opponents shot 38% FG in NWC play",
  },
  {
    id: "clip-7",
    coachId: "sarah-chen",
    title: "Motion Offense: Continuity Ball Screen Action",
    description: "Our primary half-court set. 5-out to ball screen, with 3 reads off the pick. Film from our NWC Tournament run showing how it creates layup-line looks against switching defenses.",
    category: "play",
    sport: "basketball",
    tags: ["Motion Offense", "Ball Screen", "NWC Tournament"],
    thumbnailColor: "from-teal-500 to-cyan-600",
    duration: "5:18",
    views: 1245,
    likes: 98,
    uploadedAt: "2025-03-02",
    result: "1.12 PPP in NWC Tournament",
  },
  {
    id: "clip-8",
    coachId: "devon-jackson",
    title: "Pattern Match Cover 3: Reroute & Rally",
    description: "How we teach our DBs to pattern-match in Cover 3. Film from the TSU vs. SEMO game showing our corners rerouting #1 and rallying to the flat when #2 goes out.",
    category: "scheme",
    sport: "football",
    tags: ["Coverage", "Pattern Match", "DB Technique", "Cover 3"],
    thumbnailColor: "from-blue-600 to-sky-500",
    duration: "5:41",
    views: 967,
    likes: 73,
    uploadedAt: "2024-09-20",
    result: "3 INTs in pattern-match coverage this season",
  },
  {
    id: "clip-9",
    coachId: "devon-jackson",
    title: "Press Coverage Drill Tape — Spring Ball 2024",
    description: "Individual DB drill work focusing on press-bail technique, off-man footwork, and transition. Used this progression to develop two all-conference corners.",
    category: "drill",
    sport: "football",
    tags: ["DB Drills", "Press Coverage", "Individual", "Spring Ball"],
    thumbnailColor: "from-green-500 to-emerald-600",
    duration: "3:55",
    views: 1456,
    likes: 101,
    uploadedAt: "2024-04-15",
  },
  {
    id: "clip-10",
    coachId: "antonio-reyes",
    title: "Spread PnR Reads: Roller vs. Pop Decision Tree",
    description: "Player development session breaking down ball-handler reads in our primary pick-and-roll. When to turn the corner, when to hit the roller, when to skip to the corner.",
    category: "breakdown",
    sport: "basketball",
    tags: ["Pick & Roll", "Decision Making", "Player Development"],
    thumbnailColor: "from-red-500 to-pink-600",
    duration: "6:10",
    views: 2034,
    likes: 167,
    uploadedAt: "2024-12-18",
    result: "G-League top 5 in PnR efficiency",
  },
  {
    id: "clip-11",
    coachId: "michelle-okafor",
    title: "Press Break: 1-4 Flat vs. Full Court Pressure",
    description: "Our press break that we installed after getting pressed out of the gym by Delaware State. Film from the rematch where we broke it 14 straight possessions.",
    category: "play",
    sport: "basketball",
    tags: ["Press Break", "Full Court", "In-Game Adjustment"],
    thumbnailColor: "from-purple-500 to-indigo-600",
    duration: "4:33",
    views: 1122,
    likes: 88,
    uploadedAt: "2025-02-14",
    formation: "1-4 Flat",
    result: "14/14 press break possessions in rematch",
  },
  {
    id: "clip-12",
    coachId: "tyler-brooks",
    title: "Inside Zone Double-Team Technique",
    description: "Teaching tape for our inside zone double-team at the point of attack. Covers hip-to-hip landmark, vertical displacement, and when to climb to the linebacker.",
    category: "drill",
    sport: "football",
    tags: ["Offensive Line", "Inside Zone", "Technique", "Double Team"],
    thumbnailColor: "from-green-600 to-lime-500",
    duration: "5:02",
    views: 876,
    likes: 62,
    uploadedAt: "2024-08-20",
  },
];

// ── Recruiting Data ────────────────────────────────────────────────────

export interface RecruitingTerritory {
  state: string;
  stateAbbr: string;
  region: string;
  recruitsSignedFromHere: number;
  keyHighSchools: string[];
  keyContacts: number;
  strengthLevel: "primary" | "secondary" | "developing";
}

export interface RecruitHighlight {
  id: string;
  coachId: string;
  playerName: string;
  position: string;
  highSchool: string;
  city: string;
  state: string;
  signedYear: number;
  starRating: number;
  currentStatus: string;
  achievement: string;
  story: string;
}

export const recruitingData: Record<string, {
  territories: RecruitingTerritory[];
  highlights: RecruitHighlight[];
  stats: {
    totalRecruitsSigned: number;
    statesCovered: number;
    avgClassRating: number;
    currentCommits: number;
    offersOut: number;
    topRegion: string;
  };
}> = {
  "marcus-williams": {
    territories: [
      { state: "Ohio", stateAbbr: "OH", region: "Midwest", recruitsSignedFromHere: 18, keyHighSchools: ["Glenville HS", "St. Edward HS", "Massillon Washington HS", "Archbishop Hoban HS"], keyContacts: 24, strengthLevel: "primary" },
      { state: "Georgia", stateAbbr: "GA", region: "Southeast", recruitsSignedFromHere: 9, keyHighSchools: ["Archer HS", "Colquitt County HS", "Grayson HS"], keyContacts: 15, strengthLevel: "primary" },
      { state: "Florida", stateAbbr: "FL", region: "Southeast", recruitsSignedFromHere: 7, keyHighSchools: ["American Heritage", "IMG Academy", "Central HS (Miami)"], keyContacts: 12, strengthLevel: "secondary" },
      { state: "Pennsylvania", stateAbbr: "PA", region: "Northeast", recruitsSignedFromHere: 5, keyHighSchools: ["Imhotep Institute", "St. Joseph's Prep", "Gateway HS"], keyContacts: 8, strengthLevel: "secondary" },
      { state: "Alabama", stateAbbr: "AL", region: "Southeast", recruitsSignedFromHere: 4, keyHighSchools: ["Thompson HS", "Hoover HS"], keyContacts: 6, strengthLevel: "developing" },
      { state: "Michigan", stateAbbr: "MI", region: "Midwest", recruitsSignedFromHere: 3, keyHighSchools: ["Cass Tech HS", "Belleville HS"], keyContacts: 5, strengthLevel: "developing" },
    ],
    highlights: [
      { id: "rh-1", coachId: "marcus-williams", playerName: "James Crawford", position: "QB", highSchool: "Glenville HS", city: "Cleveland", state: "OH", signedYear: 2022, starRating: 3, currentStatus: "Starting QB — Central State (Senior)", achievement: "2x All-SIAC First Team, 3,200 passing yards in 2024", story: "Overlooked 3-star from Glenville who had zero FBS offers. Convinced him the RPO system would showcase his dual-threat ability. He's now the most decorated QB in SIAC history under our watch." },
      { id: "rh-2", coachId: "marcus-williams", playerName: "Darius Hamilton", position: "WR", highSchool: "Archer HS", city: "Lawrenceville", state: "GA", signedYear: 2023, starRating: 2, currentStatus: "Breakout Sophomore — Central State", achievement: "All-SIAC Honorable Mention, 48 catches for 720 yards", story: "No stars, no film views. Found him at a 7-on-7 camp in Atlanta. Raw route runner with elite speed. After one year learning the playbook, he became our #1 receiver." },
      { id: "rh-3", coachId: "marcus-williams", playerName: "Marcus Bell", position: "OL", highSchool: "Massillon Washington HS", city: "Massillon", state: "OH", signedYear: 2021, starRating: 2, currentStatus: "Signed UDFA — Cincinnati Bengals", achievement: "All-SIAC 3 years, Graded 92% in pass protection as senior", story: "6'4\" 275 lbs coming out of high school — undersized and under-recruited. We developed him over 4 years into a pro prospect. He's now in an NFL camp." },
      { id: "rh-4", coachId: "marcus-williams", playerName: "Jaylen Torres", position: "QB", highSchool: "Imhotep Institute", city: "Philadelphia", state: "PA", signedYear: 2024, starRating: 3, currentStatus: "Redshirt Freshman — Central State", achievement: "Scout Team Player of the Year, 4.0 GPA", story: "Philadelphia kid with a cannon arm. Every school wanted him to switch positions — we told him he'd play QB. He redshirted behind Crawford and is the future of our program." },
    ],
    stats: { totalRecruitsSigned: 46, statesCovered: 6, avgClassRating: 2.4, currentCommits: 8, offersOut: 22, topRegion: "Ohio / Southeast" },
  },
  "sarah-chen": {
    territories: [
      { state: "Washington", stateAbbr: "WA", region: "Pacific Northwest", recruitsSignedFromHere: 14, keyHighSchools: ["Garfield HS", "Eastside Catholic", "Kentwood HS"], keyContacts: 18, strengthLevel: "primary" },
      { state: "Oregon", stateAbbr: "OR", region: "Pacific Northwest", recruitsSignedFromHere: 8, keyHighSchools: ["Benson HS", "South Salem HS", "Sheldon HS"], keyContacts: 11, strengthLevel: "primary" },
      { state: "California", stateAbbr: "CA", region: "West Coast", recruitsSignedFromHere: 6, keyHighSchools: ["Mater Dei HS", "Windward School", "St. Mary's Stockton"], keyContacts: 14, strengthLevel: "secondary" },
      { state: "Idaho", stateAbbr: "ID", region: "Pacific Northwest", recruitsSignedFromHere: 3, keyHighSchools: ["Boise HS", "Coeur d'Alene HS"], keyContacts: 4, strengthLevel: "developing" },
    ],
    highlights: [
      { id: "rh-5", coachId: "sarah-chen", playerName: "Anika Patel", position: "PG", highSchool: "Garfield HS", city: "Seattle", state: "WA", signedYear: 2023, starRating: 3, currentStatus: "Starting PG — Pacific Lutheran (Sophomore)", achievement: "NWC Freshman of the Year, 14.2 PPG / 6.8 APG", story: "Local kid who was committed to a D2 school. Sarah saw her at a summer league game and offered immediately. She became the engine of PLU's conference championship run." },
      { id: "rh-6", coachId: "sarah-chen", playerName: "Destiny Moore", position: "C", highSchool: "Benson HS", city: "Portland", state: "OR", signedYear: 2024, starRating: 2, currentStatus: "Impact Freshman — Pacific Lutheran", achievement: "NWC Freshman All-Conference, 11.3 PPG / 8.1 RPG", story: "6'1\" center who was told she was too slow for college ball. Sarah saw her motor and footwork and knew she'd be a monster in the pack-line defense. She was right." },
    ],
    stats: { totalRecruitsSigned: 31, statesCovered: 4, avgClassRating: 2.7, currentCommits: 5, offersOut: 14, topRegion: "Pacific Northwest" },
  },
  "devon-jackson": {
    territories: [
      { state: "Tennessee", stateAbbr: "TN", region: "Southeast", recruitsSignedFromHere: 12, keyHighSchools: ["Pearl-Cohn HS", "Whitehaven HS", "Ensworth School", "Memphis Central HS"], keyContacts: 20, strengthLevel: "primary" },
      { state: "Georgia", stateAbbr: "GA", region: "Southeast", recruitsSignedFromHere: 10, keyHighSchools: ["Archer HS", "North Gwinnett HS", "Cedar Grove HS"], keyContacts: 18, strengthLevel: "primary" },
      { state: "Alabama", stateAbbr: "AL", region: "Southeast", recruitsSignedFromHere: 6, keyHighSchools: ["Hoover HS", "Thompson HS", "Hewitt-Trussville HS"], keyContacts: 10, strengthLevel: "secondary" },
      { state: "Mississippi", stateAbbr: "MS", region: "Southeast", recruitsSignedFromHere: 5, keyHighSchools: ["South Panola HS", "Olive Branch HS"], keyContacts: 7, strengthLevel: "secondary" },
      { state: "Texas", stateAbbr: "TX", region: "South", recruitsSignedFromHere: 3, keyHighSchools: ["South Oak Cliff HS", "DeSoto HS"], keyContacts: 5, strengthLevel: "developing" },
    ],
    highlights: [
      { id: "rh-7", coachId: "devon-jackson", playerName: "Keenan Wright", position: "CB", highSchool: "Pearl-Cohn HS", city: "Nashville", state: "TN", signedYear: 2023, starRating: 3, currentStatus: "All-OVC Corner — Tennessee State (Junior)", achievement: "All-OVC Second Team, 4 INTs, 12 PBUs in 2024", story: "Nashville native who grew up 10 minutes from campus. Devon built a relationship with his family for two years before he committed. Now our best cover corner." },
      { id: "rh-8", coachId: "devon-jackson", playerName: "Tre'von Davis", position: "S", highSchool: "Cedar Grove HS", city: "Ellenwood", state: "GA", signedYear: 2024, starRating: 3, currentStatus: "Immediate Impact Freshman — Tennessee State", achievement: "OVC Freshman Defensive Player of the Week (3x)", story: "Had FBS interest but wanted to play early. Devon sold him on the development plan and starting opportunity. He started Game 1 and never looked back." },
    ],
    stats: { totalRecruitsSigned: 36, statesCovered: 5, avgClassRating: 2.6, currentCommits: 6, offersOut: 18, topRegion: "Tennessee / Georgia" },
  },
  "antonio-reyes": {
    territories: [
      { state: "Texas", stateAbbr: "TX", region: "South", recruitsSignedFromHere: 15, keyHighSchools: ["San Antonio Wagner HS", "McAllen Memorial HS", "Edinburg Vela HS", "La Joya HS"], keyContacts: 22, strengthLevel: "primary" },
      { state: "California", stateAbbr: "CA", region: "West Coast", recruitsSignedFromHere: 4, keyHighSchools: ["Long Beach Poly", "Fairfax HS"], keyContacts: 8, strengthLevel: "secondary" },
    ],
    highlights: [
      { id: "rh-9", coachId: "antonio-reyes", playerName: "Diego Salazar", position: "PG", highSchool: "McAllen Memorial HS", city: "McAllen", state: "TX", signedYear: 2022, starRating: 2, currentStatus: "Two-Way Contract — Houston Rockets / RGV Vipers", achievement: "G-League All-Rookie Team, 18.4 PPG", story: "Border kid from the Valley with no national exposure. Antonio found him, developed his pick-and-roll game for 3 years at UTRGV, and he's now on a two-way NBA contract." },
    ],
    stats: { totalRecruitsSigned: 19, statesCovered: 2, avgClassRating: 2.2, currentCommits: 3, offersOut: 8, topRegion: "South Texas / Rio Grande Valley" },
  },
  "tyler-brooks": {
    territories: [
      { state: "Iowa", stateAbbr: "IA", region: "Midwest", recruitsSignedFromHere: 8, keyHighSchools: ["Dowling Catholic HS", "Southeast Polk HS", "Valley HS"], keyContacts: 12, strengthLevel: "primary" },
      { state: "Nebraska", stateAbbr: "NE", region: "Midwest", recruitsSignedFromHere: 4, keyHighSchools: ["Omaha Westside HS", "Bellevue West HS"], keyContacts: 6, strengthLevel: "secondary" },
      { state: "Minnesota", stateAbbr: "MN", region: "Midwest", recruitsSignedFromHere: 3, keyHighSchools: ["Eden Prairie HS", "Lakeville South HS"], keyContacts: 4, strengthLevel: "developing" },
    ],
    highlights: [
      { id: "rh-10", coachId: "tyler-brooks", playerName: "Ethan Mulder", position: "OT", highSchool: "Dowling Catholic HS", city: "West Des Moines", state: "IA", signedYear: 2023, starRating: 2, currentStatus: "All-Conference OT — Grand View (Sophomore)", achievement: "Heart of America All-Conference, 0 sacks allowed in 2024", story: "6'5\" basketball player who Tyler converted to offensive tackle. Zero football experience before his senior year. Now he's the best tackle in the conference." },
    ],
    stats: { totalRecruitsSigned: 15, statesCovered: 3, avgClassRating: 2.1, currentCommits: 4, offersOut: 10, topRegion: "Iowa / Midwest" },
  },
  "michelle-okafor": {
    territories: [
      { state: "Maryland", stateAbbr: "MD", region: "Mid-Atlantic", recruitsSignedFromHere: 11, keyHighSchools: ["Bishop McNamara HS", "St. John's Catholic Prep", "Riverdale Baptist HS"], keyContacts: 16, strengthLevel: "primary" },
      { state: "Virginia", stateAbbr: "VA", region: "Mid-Atlantic", recruitsSignedFromHere: 8, keyHighSchools: ["Paul VI Catholic HS", "T.C. Williams HS", "Woodbridge HS"], keyContacts: 14, strengthLevel: "primary" },
      { state: "North Carolina", stateAbbr: "NC", region: "Southeast", recruitsSignedFromHere: 6, keyHighSchools: ["Northwest Guilford HS", "Vance HS", "Apex Friendship HS"], keyContacts: 10, strengthLevel: "secondary" },
      { state: "New York", stateAbbr: "NY", region: "Northeast", recruitsSignedFromHere: 4, keyHighSchools: ["Christ the King HS", "South Shore HS"], keyContacts: 8, strengthLevel: "secondary" },
      { state: "South Carolina", stateAbbr: "SC", region: "Southeast", recruitsSignedFromHere: 3, keyHighSchools: ["Ridge View HS", "Wilson HS"], keyContacts: 5, strengthLevel: "developing" },
    ],
    highlights: [
      { id: "rh-11", coachId: "michelle-okafor", playerName: "Tiana Washington", position: "PF", highSchool: "Bishop McNamara HS", city: "Forestville", state: "MD", signedYear: 2022, starRating: 4, currentStatus: "WNBA Draft Prospect — Howard University (Senior)", achievement: "2x All-MEAC First Team, MEAC Tournament MVP (2024)", story: "Michelle's signature recruit. Top-100 national prospect who chose Howard over multiple Power 5 schools because of the vision Michelle and Coach Freeman pitched. She put Howard women's basketball on the map." },
      { id: "rh-12", coachId: "michelle-okafor", playerName: "Jade Rivers", position: "PG", highSchool: "Paul VI Catholic HS", city: "Fairfax", state: "VA", signedYear: 2023, starRating: 3, currentStatus: "Starting PG — Howard University (Sophomore)", achievement: "MEAC Freshman of the Year, 12.8 PPG / 5.4 APG", story: "Had Georgetown and Virginia Tech offers. Michelle built a relationship over 18 months and sold her on being the face of a rising program. She delivered immediately." },
    ],
    stats: { totalRecruitsSigned: 32, statesCovered: 5, avgClassRating: 3.1, currentCommits: 7, offersOut: 16, topRegion: "DMV (DC/MD/VA)" },
  },
};

export interface TreeNode {
  name: string;
  title: string;
  institution: string;
  initials: string;
  sport: "football" | "basketball";
  sideOfBall: "offense" | "defense" | "head coach" | "special teams" | null;
  yearsTogether?: string;
  relationship: "mentor" | "peer" | "protege" | "colleague" | "root";
  status: "active" | "retired" | "moved";
  level: string;
  achievements: string[];
  influence: string[];
  careerSnapshot: { year: string; role: string; institution: string }[];
  children: TreeNode[];
}

export const coachingTreeData: {
  rootCoach: TreeNode;
  mentorTree: TreeNode;
  protegeTree: TreeNode;
  influenceMap: { from: string; to: string; lessons: string[] }[];
  legacyStats: {
    totalCoaches: number;
    programs: number;
    conferences: string[];
    championships: number;
    activeHeadCoaches: number;
    statesReached: string[];
  };
} = {
  rootCoach: {
    name: "Coach David Patterson",
    title: "Head Coach",
    institution: "Central State University",
    initials: "DP",
    sport: "football",
    sideOfBall: "head coach",
    relationship: "root",
    status: "active",
    level: "Division II",
    achievements: ["3x SIAC Coach of the Year", "2022 D2 Playoff Appearance", "42 Career Wins"],
    influence: [],
    careerSnapshot: [
      { year: "2018-Present", role: "Head Coach", institution: "Central State University" },
      { year: "2012-2018", role: "Defensive Coordinator", institution: "Tuskegee University" },
      { year: "2008-2012", role: "LB Coach", institution: "Miles College" },
    ],
    children: [
      {
        name: "Marcus Williams",
        title: "OC / QB Coach",
        institution: "Central State University",
        initials: "MW",
        sport: "football",
        sideOfBall: "offense",
        yearsTogether: "2024-Present",
        relationship: "protege",
        status: "active",
        level: "Division II",
        achievements: ["Developed 2 All-Conference QBs", "Top 5 Passing Offense in SIAC (2024)"],
        influence: ["RPO scheme design", "QB progression reads", "Tempo offense"],
        careerSnapshot: [
          { year: "2024-Present", role: "OC / QB Coach", institution: "Central State University" },
          { year: "2022-2024", role: "QB Coach", institution: "Youngstown State" },
        ],
        children: [],
      },
      {
        name: "Andre Mitchell",
        title: "Defensive Coordinator",
        institution: "Central State University",
        initials: "AM",
        sport: "football",
        sideOfBall: "defense",
        yearsTogether: "2019-Present",
        relationship: "colleague",
        status: "active",
        level: "Division II",
        achievements: ["SIAC Top 3 Defense (3 consecutive years)", "12 All-Conference Defenders developed"],
        influence: ["Multiple front defense", "Press coverage techniques", "Defensive culture building"],
        careerSnapshot: [
          { year: "2019-Present", role: "DC", institution: "Central State University" },
          { year: "2015-2019", role: "DB Coach", institution: "Albany State University" },
          { year: "2012-2015", role: "GA — Defense", institution: "Tuskegee University" },
        ],
        children: [
          {
            name: "Kyle Henderson",
            title: "DB Coach",
            institution: "Tuskegee University",
            initials: "KH",
            sport: "football",
            sideOfBall: "defense",
            yearsTogether: "2019-2022",
            relationship: "protege",
            status: "moved",
            level: "Division II",
            achievements: ["Developed 1 All-American DB"],
            influence: ["Film study techniques", "Man coverage fundamentals"],
            careerSnapshot: [
              { year: "2023-Present", role: "DB Coach", institution: "Tuskegee University" },
              { year: "2019-2022", role: "Defensive GA", institution: "Central State University" },
            ],
            children: [
              {
                name: "Terrence Davis",
                title: "Defensive GA",
                institution: "Clark Atlanta University",
                initials: "TD",
                sport: "football",
                sideOfBall: "defense",
                yearsTogether: "2023-2024",
                relationship: "protege",
                status: "active",
                level: "Division II",
                achievements: [],
                influence: ["Secondary alignment", "Practice planning"],
                careerSnapshot: [
                  { year: "2024-Present", role: "Defensive GA", institution: "Clark Atlanta University" },
                ],
                children: [],
              },
            ],
          },
          {
            name: "Jamal Carter",
            title: "LB Coach",
            institution: "Fort Valley State University",
            initials: "JC",
            sport: "football",
            sideOfBall: "defense",
            yearsTogether: "2020-2023",
            relationship: "protege",
            status: "moved",
            level: "Division II",
            achievements: ["SIAC Defensive Staff of the Year (2022)"],
            influence: ["Blitz package design", "Run fit discipline"],
            careerSnapshot: [
              { year: "2024-Present", role: "LB Coach", institution: "Fort Valley State University" },
              { year: "2020-2023", role: "Defensive Quality Control", institution: "Central State University" },
            ],
            children: [],
          },
        ],
      },
      {
        name: "Brandon Lewis",
        title: "Running Backs Coach",
        institution: "Kentucky State University",
        initials: "BL",
        sport: "football",
        sideOfBall: "offense",
        yearsTogether: "2018-2023",
        relationship: "protege",
        status: "moved",
        level: "Division II",
        achievements: ["Produced 1,000-yard rusher in back-to-back seasons"],
        influence: ["Zone blocking schemes", "Ball security drills", "Special teams philosophy"],
        careerSnapshot: [
          { year: "2024-Present", role: "RB Coach", institution: "Kentucky State University" },
          { year: "2018-2023", role: "RB Coach / ST Coordinator", institution: "Central State University" },
        ],
        children: [
          {
            name: "DeShawn Brooks",
            title: "Offensive GA",
            institution: "Kentucky State University",
            initials: "DB",
            sport: "football",
            sideOfBall: "offense",
            yearsTogether: "2024-Present",
            relationship: "protege",
            status: "active",
            level: "Division II",
            achievements: [],
            influence: ["RB drills", "Film breakdown fundamentals"],
            careerSnapshot: [
              { year: "2024-Present", role: "Offensive GA", institution: "Kentucky State University" },
            ],
            children: [],
          },
        ],
      },
      {
        name: "Tiffany Moore",
        title: "Director of Player Development",
        institution: "Central State University",
        initials: "TM",
        sport: "football",
        sideOfBall: null,
        yearsTogether: "2021-Present",
        relationship: "colleague",
        status: "active",
        level: "Division II",
        achievements: ["Implemented academic mentorship program", "95% team graduation rate"],
        influence: ["Student-athlete development", "NIL education", "Leadership training"],
        careerSnapshot: [
          { year: "2021-Present", role: "Director of Player Development", institution: "Central State University" },
          { year: "2018-2021", role: "Academic Advisor — Athletics", institution: "Wilberforce University" },
        ],
        children: [],
      },
      {
        name: "Corey Washington",
        title: "OL Coach / Run Game Coordinator",
        institution: "Central State University",
        initials: "CW",
        sport: "football",
        sideOfBall: "offense",
        yearsTogether: "2020-Present",
        relationship: "colleague",
        status: "active",
        level: "Division II",
        achievements: ["SIAC OL Coach of the Year (2023)", "3 All-Conference Linemen"],
        influence: ["Gap scheme run game", "OL technique drills", "In-game adjustments"],
        careerSnapshot: [
          { year: "2020-Present", role: "OL Coach / Run Game Coord.", institution: "Central State University" },
          { year: "2016-2020", role: "OL Coach", institution: "Lane College" },
        ],
        children: [],
      },
    ],
  },
  mentorTree: {
    name: "Coach Harold Graves",
    title: "Head Coach (Retired)",
    institution: "Grambling State University",
    initials: "HG",
    sport: "football",
    sideOfBall: "head coach",
    relationship: "root",
    status: "retired",
    level: "Division I FCS",
    achievements: ["SWAC Championship (1998, 2001)", "College Football Hall of Fame Inductee", "185 Career Wins", "Produced 14 NFL Players"],
    influence: [],
    careerSnapshot: [
      { year: "1985-2005", role: "Head Coach", institution: "Grambling State University" },
      { year: "1978-1985", role: "Defensive Coordinator", institution: "Southern University" },
    ],
    children: [
      {
        name: "Coach Robert Ellis",
        title: "Head Coach (Retired)",
        institution: "Tuskegee University",
        initials: "RE",
        sport: "football",
        sideOfBall: "head coach",
        yearsTogether: "1988-1995",
        relationship: "protege",
        status: "retired",
        level: "Division II",
        achievements: ["SIAC Championship (2004, 2008)", "104 Career Wins", "23 All-Americans developed"],
        influence: ["Program-building philosophy", "Defensive fundamentals", "Recruiting the Southeast"],
        careerSnapshot: [
          { year: "2000-2015", role: "Head Coach", institution: "Tuskegee University" },
          { year: "1996-2000", role: "DC", institution: "Alabama A&M" },
          { year: "1988-1995", role: "LB Coach", institution: "Grambling State University" },
        ],
        children: [
          {
            name: "Coach David Patterson",
            title: "Head Coach",
            institution: "Central State University",
            initials: "DP",
            sport: "football",
            sideOfBall: "head coach",
            yearsTogether: "2008-2012",
            relationship: "protege",
            status: "active",
            level: "Division II",
            achievements: ["3x SIAC Coach of the Year", "42 Career Wins"],
            influence: ["Defensive identity building", "Staff management", "Game-day preparation"],
            careerSnapshot: [
              { year: "2018-Present", role: "Head Coach", institution: "Central State University" },
              { year: "2012-2018", role: "DC", institution: "Tuskegee University" },
              { year: "2008-2012", role: "LB Coach", institution: "Miles College" },
            ],
            children: [
              {
                name: "Marcus Williams",
                title: "OC / QB Coach",
                institution: "Central State University",
                initials: "MW",
                sport: "football",
                sideOfBall: "offense",
                yearsTogether: "2024-Present",
                relationship: "protege",
                status: "active",
                level: "Division II",
                achievements: ["Developed 2 All-Conference QBs"],
                influence: ["RPO scheme design", "Game management"],
                careerSnapshot: [
                  { year: "2024-Present", role: "OC / QB Coach", institution: "Central State University" },
                ],
                children: [],
              },
              {
                name: "Andre Mitchell",
                title: "DC",
                institution: "Central State University",
                initials: "AM",
                sport: "football",
                sideOfBall: "defense",
                yearsTogether: "2019-Present",
                relationship: "protege",
                status: "active",
                level: "Division II",
                achievements: ["SIAC Top 3 Defense (3 years)"],
                influence: ["Multiple front defense", "Culture building"],
                careerSnapshot: [
                  { year: "2019-Present", role: "DC", institution: "Central State University" },
                ],
                children: [],
              },
            ],
          },
          {
            name: "Coach Angela Ford",
            title: "Head Coach",
            institution: "Miles College",
            initials: "AF",
            sport: "football",
            sideOfBall: "head coach",
            yearsTogether: "2000-2006",
            relationship: "protege",
            status: "active",
            level: "Division II",
            achievements: ["First female HC in SIAC football history", "SIAC Coach of the Year (2023)"],
            influence: ["Program culture transformation", "Community engagement"],
            careerSnapshot: [
              { year: "2021-Present", role: "Head Coach", institution: "Miles College" },
              { year: "2014-2021", role: "Associate HC / DC", institution: "Tuskegee University" },
              { year: "2000-2006", role: "LB Coach / Recruiting Coord.", institution: "Tuskegee University" },
            ],
            children: [
              {
                name: "Rashida Thompson",
                title: "DC",
                institution: "Miles College",
                initials: "RT",
                sport: "football",
                sideOfBall: "defense",
                yearsTogether: "2021-Present",
                relationship: "protege",
                status: "active",
                level: "Division II",
                achievements: ["SIAC Top 5 Scoring Defense (2023)"],
                influence: ["3-4 defense installation", "Defensive recruiting"],
                careerSnapshot: [
                  { year: "2021-Present", role: "DC", institution: "Miles College" },
                  { year: "2017-2021", role: "LB Coach", institution: "Tuskegee University" },
                ],
                children: [],
              },
            ],
          },
          {
            name: "Coach Marcus Reed",
            title: "Offensive Coordinator",
            institution: "Alabama A&M",
            initials: "MR",
            sport: "football",
            sideOfBall: "offense",
            yearsTogether: "2002-2008",
            relationship: "protege",
            status: "active",
            level: "Division I FCS",
            achievements: ["SWAC Offensive Coordinator of the Year (2022)", "Top 3 SWAC Offense (2021-2023)"],
            influence: ["Spread offense concepts", "QB development", "Offensive tempo"],
            careerSnapshot: [
              { year: "2019-Present", role: "OC", institution: "Alabama A&M" },
              { year: "2009-2019", role: "WR Coach / Pass Game Coord.", institution: "Southern University" },
              { year: "2002-2008", role: "Offensive GA / WR Coach", institution: "Tuskegee University" },
            ],
            children: [],
          },
        ],
      },
      {
        name: "Coach Bill McEntire",
        title: "Head Coach",
        institution: "Walsh University",
        initials: "BM",
        sport: "football",
        sideOfBall: "head coach",
        yearsTogether: "1985-1990",
        relationship: "protege",
        status: "active",
        level: "NAIA",
        achievements: ["Great Midwest Athletic Conference Champion (2019)", "200+ Career Wins", "Longest-tenured active NAIA HC"],
        influence: ["Discipline-first program building", "Small-school recruiting", "Community roots"],
        careerSnapshot: [
          { year: "1995-Present", role: "Head Coach", institution: "Walsh University" },
          { year: "1990-1995", role: "OC", institution: "Mount Union" },
          { year: "1985-1990", role: "OL Coach", institution: "Grambling State University" },
        ],
        children: [
          {
            name: "Coach Ray Thompson",
            title: "Offensive Coordinator",
            institution: "Youngstown State",
            initials: "RT",
            sport: "football",
            sideOfBall: "offense",
            yearsTogether: "1998-2006",
            relationship: "protege",
            status: "active",
            level: "Division I FCS",
            achievements: ["FCS Playoff Coordinator (2016, 2021)", "Developed 3 All-American WRs"],
            influence: ["West Coast passing concepts", "RPO integration", "Play-action deep shots"],
            careerSnapshot: [
              { year: "2010-Present", role: "OC", institution: "Youngstown State" },
              { year: "2006-2010", role: "WR Coach / Pass Game Coord.", institution: "Akron" },
              { year: "1998-2006", role: "WR Coach / Recruiting", institution: "Walsh University" },
            ],
            children: [
              {
                name: "Marcus Williams",
                title: "OC / QB Coach",
                institution: "Central State University",
                initials: "MW",
                sport: "football",
                sideOfBall: "offense",
                yearsTogether: "2022-2024",
                relationship: "protege",
                status: "active",
                level: "Division II",
                achievements: ["Developed 2 All-Conference QBs"],
                influence: ["RPO scheme design", "QB progression reads"],
                careerSnapshot: [
                  { year: "2024-Present", role: "OC / QB Coach", institution: "Central State University" },
                  { year: "2022-2024", role: "QB Coach", institution: "Youngstown State" },
                ],
                children: [],
              },
              {
                name: "Ryan Cooper",
                title: "WR Coach",
                institution: "Youngstown State",
                initials: "RC",
                sport: "football",
                sideOfBall: "offense",
                yearsTogether: "2012-Present",
                relationship: "protege",
                status: "active",
                level: "Division I FCS",
                achievements: ["Developed FCS All-American WR (2023)"],
                influence: ["Route-running technique", "Red zone concepts"],
                careerSnapshot: [
                  { year: "2012-Present", role: "WR Coach", institution: "Youngstown State" },
                ],
                children: [],
              },
              {
                name: "Chris Harmon",
                title: "OC",
                institution: "Akron",
                initials: "CH",
                sport: "football",
                sideOfBall: "offense",
                yearsTogether: "2010-2016",
                relationship: "protege",
                status: "active",
                level: "Division I FBS",
                achievements: ["MAC Offensive Coordinator of the Year (2024)"],
                influence: ["Spread concepts at FBS level", "Transfer portal recruiting"],
                careerSnapshot: [
                  { year: "2022-Present", role: "OC", institution: "Akron" },
                  { year: "2016-2022", role: "Pass Game Coord.", institution: "Kent State" },
                  { year: "2010-2016", role: "WR Coach", institution: "Youngstown State" },
                ],
                children: [],
              },
            ],
          },
          {
            name: "Coach Jim Hargrove",
            title: "Defensive Coordinator",
            institution: "Malone University",
            initials: "JH",
            sport: "football",
            sideOfBall: "defense",
            yearsTogether: "1999-2008",
            relationship: "protege",
            status: "active",
            level: "NAIA",
            achievements: ["NAIA Top 10 Defense (2020, 2022)", "40+ All-Conference defenders developed"],
            influence: ["4-2-5 defense installation", "Secondary play"],
            careerSnapshot: [
              { year: "2008-Present", role: "DC", institution: "Malone University" },
              { year: "1999-2008", role: "DB Coach / ST Coordinator", institution: "Walsh University" },
            ],
            children: [
              {
                name: "Tony Russo",
                title: "DB Coach",
                institution: "Walsh University",
                initials: "TR",
                sport: "football",
                sideOfBall: "defense",
                yearsTogether: "2010-2018",
                relationship: "protege",
                status: "active",
                level: "NAIA",
                achievements: ["NAIA All-American DB developed (2022)"],
                influence: ["Cover 3 matchup zone", "Turnover drills"],
                careerSnapshot: [
                  { year: "2019-Present", role: "DB Coach", institution: "Walsh University" },
                  { year: "2010-2018", role: "Defensive GA / Safeties", institution: "Malone University" },
                ],
                children: [],
              },
            ],
          },
          {
            name: "Coach Denise Walker",
            title: "Associate Head Coach",
            institution: "Walsh University",
            initials: "DW",
            sport: "football",
            sideOfBall: "offense",
            yearsTogether: "2005-Present",
            relationship: "colleague",
            status: "active",
            level: "NAIA",
            achievements: ["20 years at Walsh", "GMAC Assistant of the Year (2021)"],
            influence: ["Program continuity", "Academic-athletic balance"],
            careerSnapshot: [
              { year: "2015-Present", role: "Associate HC / OC", institution: "Walsh University" },
              { year: "2005-2015", role: "TE Coach / Recruiting Coord.", institution: "Walsh University" },
            ],
            children: [],
          },
        ],
      },
      {
        name: "Coach Leon Harris",
        title: "Head Coach (Retired)",
        institution: "Southern University",
        initials: "LH",
        sport: "football",
        sideOfBall: "head coach",
        yearsTogether: "1985-1992",
        relationship: "peer",
        status: "retired",
        level: "Division I FCS",
        achievements: ["SWAC Championship (1993, 1995)", "Heritage Bowl Champion (1995)", "128 Career Wins"],
        influence: [],
        careerSnapshot: [
          { year: "1992-2003", role: "Head Coach", institution: "Southern University" },
          { year: "1985-1992", role: "DC", institution: "Grambling State University" },
        ],
        children: [
          {
            name: "Coach Terrell Banks",
            title: "Head Coach",
            institution: "Southern University",
            initials: "TB",
            sport: "football",
            sideOfBall: "head coach",
            yearsTogether: "1997-2003",
            relationship: "protege",
            status: "active",
            level: "Division I FCS",
            achievements: ["SWAC Coach of the Year (2023)", "Bayou Classic Champions (2022, 2024)"],
            influence: ["HBCU tradition", "Defensive culture"],
            careerSnapshot: [
              { year: "2019-Present", role: "Head Coach", institution: "Southern University" },
              { year: "2010-2019", role: "DC", institution: "Alcorn State" },
              { year: "1997-2003", role: "DL Coach", institution: "Southern University" },
            ],
            children: [],
          },
        ],
      },
    ],
  },
  protegeTree: {
    name: "Marcus Williams",
    title: "OC / QB Coach",
    institution: "Central State University",
    initials: "MW",
    sport: "football",
    sideOfBall: "offense",
    relationship: "root",
    status: "active",
    level: "Division II",
    achievements: ["Developed 2 All-Conference QBs", "Top 5 Passing Offense in SIAC (2024)"],
    influence: [],
    careerSnapshot: [
      { year: "2024-Present", role: "OC / QB Coach", institution: "Central State University" },
      { year: "2022-2024", role: "QB Coach", institution: "Youngstown State" },
      { year: "2020-2022", role: "Offensive GA", institution: "Walsh University" },
    ],
    children: [
      {
        name: "Elijah Grant",
        title: "QB Coach / Offensive GA",
        institution: "Wilberforce University",
        initials: "EG",
        sport: "football",
        sideOfBall: "offense",
        yearsTogether: "2024-Present",
        relationship: "protege",
        status: "active",
        level: "NAIA",
        achievements: [],
        influence: ["Pre-snap read system", "QB footwork drills"],
        careerSnapshot: [
          { year: "2025-Present", role: "QB Coach", institution: "Wilberforce University" },
          { year: "2024-2025", role: "Offensive Student Assistant", institution: "Central State University" },
        ],
        children: [],
      },
      {
        name: "Jordan Mitchell",
        title: "Offensive Quality Control",
        institution: "Youngstown State",
        initials: "JM",
        sport: "football",
        sideOfBall: "offense",
        yearsTogether: "2022-2024",
        relationship: "protege",
        status: "active",
        level: "Division I FCS",
        achievements: [],
        influence: ["Film study process", "RPO installation", "Practice scripting"],
        careerSnapshot: [
          { year: "2024-Present", role: "Offensive QC", institution: "Youngstown State" },
          { year: "2022-2024", role: "Student Assistant", institution: "Youngstown State" },
        ],
        children: [],
      },
      {
        name: "Tyler Washington",
        title: "Volunteer Assistant — Offense",
        institution: "Central State University",
        initials: "TW",
        sport: "football",
        sideOfBall: "offense",
        yearsTogether: "2024-Present",
        relationship: "protege",
        status: "active",
        level: "Division II",
        achievements: [],
        influence: ["QB mechanics coaching", "Game-week preparation"],
        careerSnapshot: [
          { year: "2024-Present", role: "Vol. Assistant", institution: "Central State University" },
        ],
        children: [],
      },
    ],
  },
  influenceMap: [
    { from: "Coach Harold Graves", to: "Coach Robert Ellis", lessons: ["Defensive fundamentals as program identity", "Recruiting the Deep South", "Building tradition at HBCUs"] },
    { from: "Coach Harold Graves", to: "Coach Bill McEntire", lessons: ["Discipline-first culture", "Developing walk-ons into starters", "Small-school program building"] },
    { from: "Coach Robert Ellis", to: "Coach David Patterson", lessons: ["Defensive identity building", "Staff loyalty and development", "Game-day preparation rituals"] },
    { from: "Coach Robert Ellis", to: "Coach Angela Ford", lessons: ["Breaking barriers in coaching", "Community-first program culture", "Player development over recruitment stars"] },
    { from: "Coach Bill McEntire", to: "Coach Ray Thompson", lessons: ["West Coast passing concepts", "RPO integration with pro-style", "Attention to detail in route running"] },
    { from: "Coach Ray Thompson", to: "Marcus Williams", lessons: ["RPO scheme design and tags", "QB progression reads under pressure", "Simplicity creates confidence in play-calling"] },
    { from: "Coach David Patterson", to: "Marcus Williams", lessons: ["Managing an offensive staff", "Balancing run/pass philosophy", "Recruiting at the D2 level"] },
    { from: "Coach David Patterson", to: "Andre Mitchell", lessons: ["Multiple front defense at D2", "Building a defensive culture of effort", "Film study as competitive edge"] },
    { from: "Andre Mitchell", to: "Kyle Henderson", lessons: ["Secondary technique fundamentals", "Practice tempo and energy", "Developing DBs for the next level"] },
    { from: "Marcus Williams", to: "Elijah Grant", lessons: ["Pre-snap read system", "QB footwork progression drills", "Building trust with your QB room"] },
    { from: "Marcus Williams", to: "Jordan Mitchell", lessons: ["Film breakdown methodology", "RPO installation week-by-week", "Offensive practice scripting"] },
  ],
  legacyStats: {
    totalCoaches: 28,
    programs: 16,
    conferences: ["SIAC", "SWAC", "GMAC", "FCS", "MAC", "Independents"],
    championships: 7,
    activeHeadCoaches: 4,
    statesReached: ["OH", "AL", "LA", "GA", "TX", "KY", "TN", "PA", "MS"],
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
