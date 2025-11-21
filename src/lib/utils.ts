import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Calculate reading statistics from HTML content
 * Handles both Chinese characters and English words
 */
export function calculateReadingStats(
  html: string | null | undefined,
): { chineseChars: number; englishWords: number; totalCount: number } {
  if (!html) return { chineseChars: 0, englishWords: 0, totalCount: 0 }

  // Remove HTML tags
  const textOnly = html.replace(/<[^>]+>/g, '')

  // Count Chinese characters (including CJK Unified Ideographs and extensions)
  const chineseChars = (textOnly.match(/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff]/gu) || []).length

  // Remove Chinese characters and count English words
  const nonChineseText = textOnly.replace(/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff]/gu, ' ')
  const englishWords = nonChineseText.split(/\s+/).filter(word => /[a-zA-Z0-9]/.test(word)).length

  return {
    chineseChars,
    englishWords,
    totalCount: chineseChars + englishWords
  }
}

/**
 * Legacy function for backward compatibility
 * Returns total count (Chinese chars + English words)
 */
export function calculateWordCountFromHtml(
  html: string | null | undefined,
): number {
  return calculateReadingStats(html).totalCount
}

/**
 * Calculate reading time based on content type
 * Chinese: ~350 characters per minute
 * English: ~200 words per minute
 */
export function readingTime(html: string | null | undefined): string {
  const stats = calculateReadingStats(html)

  // Calculate reading time in minutes
  const chineseMinutes = stats.chineseChars / 350
  const englishMinutes = stats.englishWords / 200
  const totalMinutes = Math.max(1, Math.ceil(chineseMinutes + englishMinutes))

  return `${totalMinutes} min read`
}

export function getHeadingMargin(depth: number): string {
  const margins: Record<number, string> = {
    3: 'ml-4',
    4: 'ml-8',
    5: 'ml-12',
    6: 'ml-16',
  }
  return margins[depth] || ''
}
