const CONCAT_FIXES: [RegExp, string][] = [
  [/VIEWSHOWAPARTMENT/gi, "VIEW SHOW APARTMENT"],
  [/VIEWSHOW/gi, "VIEW SHOW"],
  [/PENTHOUSESHOWHOME/gi, "PENTHOUSE SHOW HOME"],
  [/SHOWROOMGOLDEN/gi, "SHOWROOM GOLDEN"],
  [/REFURBISHMENTCOMING/gi, "REFURBISHMENT COMING"],
  [/LONDONAWARD/gi, "LONDON AWARD"],
  [/SHOWVILLA/gi, "SHOW VILLA"],
  [/NEW SHOWROOMGOLDEN/gi, "NEW SHOWROOM GOLDEN"],
];

export function formatDisplayTitle(title: string): string {
  let normalized = title.trim().replace(/\s+/g, " ");

  for (const [pattern, replacement] of CONCAT_FIXES) {
    normalized = normalized.replace(pattern, replacement);
  }

  return normalized
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (word.length <= 2 && !["in", "of", "at", "on", "uk", "usa"].includes(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .replace(/\bUk\b/g, "UK")
    .replace(/\bUsa\b/g, "USA")
    .replace(/\bAnd\b/g, "and")
    .replace(/\bThe\b/g, (match, offset) => (offset === 0 ? match : "the"));
}
