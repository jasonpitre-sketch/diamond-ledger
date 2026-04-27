import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const sourceRoot = path.join(root, "public", "cards")
const outputRoot = path.join(root, "public", "cards_display")

const CARD_WIDTH = 936
const CARD_HEIGHT = 1310
const INNER_WIDTH = 900
const INNER_HEIGHT = 1264

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"])

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...await listImages(fullPath))
      continue
    }

    const ext = path.extname(entry.name).toLowerCase()

    if (
      IMAGE_EXTENSIONS.has(ext) &&
      !entry.name.includes(".original.") &&
      !entry.name.includes(".polished.")
    ) {
      files.push(fullPath)
    }
  }

  return files
}

async function standardizeCard(sourcePath) {
  const relativePath = path.relative(sourceRoot, sourcePath)
  const outputPath = path.join(
    outputRoot,
    relativePath.replace(path.extname(relativePath), ".png")
  )

  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  const trimmed = sharp(sourcePath, { failOn: "none" })
    .rotate()
    .trim({
      background: "#ffffff",
      threshold: 8
    })

  await trimmed
    .resize({
      width: INNER_WIDTH,
      height: INNER_HEIGHT,
      fit: "contain",
      withoutEnlargement: false,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .extend({
      top: Math.floor((CARD_HEIGHT - INNER_HEIGHT) / 2),
      bottom: Math.ceil((CARD_HEIGHT - INNER_HEIGHT) / 2),
      left: Math.floor((CARD_WIDTH - INNER_WIDTH) / 2),
      right: Math.ceil((CARD_WIDTH - INNER_WIDTH) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true
    })
    .toFile(outputPath)

  return outputPath
}

const sourceFiles = await listImages(sourceRoot)
let generated = 0

for (const sourceFile of sourceFiles) {
  await standardizeCard(sourceFile)
  generated += 1
}

console.log(`Generated ${generated} standardized cards in ${path.relative(root, outputRoot)}`)
