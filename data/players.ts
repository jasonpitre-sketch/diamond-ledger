export type Player = {
  rank: number
  slug: string
  name: string
  position: string
  school: string
  age: number
  level?: string
  eta?: string
  bio?: string
  stats?: {
    year: number
    avg?: number
    hr?: number
    rbi?: number
    ops?: number
  }[]
}

const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-")

export const players: Player[] = [
  {
    rank: 1,
    name: "Roch Cholowsky",
    slug: slugify("Roch Cholowsky"),
    position: "SS",
    school: "UCLA",
    age: 20,
    level: "College",
    eta: "2029",
    bio: "Advanced college shortstop with elite bat-to-ball skills and strong defensive profile.",
    stats: [
      { year: 2025, avg: 0.335, hr: 14, rbi: 62, ops: 0.987 },
    ],
  },
  {
    rank: 2,
    name: "Grady Emerson",
    slug: slugify("Grady Emerson"),
    position: "SS",
    school: "High School",
    age: 18,
    level: "Prep",
    eta: "2029",
    bio: "Toolsy shortstop with high upside and advanced athleticism.",
    stats: [
      { year: 2025, avg: 0.390, hr: 8, rbi: 40, ops: 1.020 },
    ],
  },
]