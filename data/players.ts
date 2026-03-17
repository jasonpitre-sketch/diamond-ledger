export type Player = {
  slug: string
  name: string
  position: string
  team: string
  level: "Draft" | "A" | "AA" | "AAA" | "MLB"
  age: number
}

export const players: Player[] = [
  {
    slug: "roch-cholowsky",
    name: "Roch Cholowsky",
    position: "SS",
    team: "Pirates",
    level: "Draft",
    age: 20,
  },
  {
    slug: "carson-bolemon",
    name: "Carson Bolemon",
    position: "LHP",
    team: "Reds",
    level: "A",
    age: 18,
  }
]