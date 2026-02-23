/**
 * ═══════════════════════════════════════════════════════════════
 * MANUAL TEXT SPLITTER
 * ═══════════════════════════════════════════════════════════════
 * Wraps each character / word of a text node in <span> elements
 * so GSAP can animate them individually (SplitText alternative).
 *
 * Usage:
 *   const { chars, words } = splitTextIntoSpans(element);
 *   gsap.from(chars, { opacity: 0, y: 20, stagger: 0.02 });
 */

export interface SplitResult {
  /** Array of <span> elements wrapping each character */
  chars: HTMLSpanElement[];
  /** Array of <span> elements wrapping each word */
  words: HTMLSpanElement[];
  /** Restore the element to its original innerHTML */
  revert: () => void;
}

export function splitTextIntoSpans(
  element: HTMLElement,
  options?: { charClass?: string; wordClass?: string }
): SplitResult {
  const charClass = options?.charClass ?? "split-char";
  const wordClass = options?.wordClass ?? "split-word";

  /* Preserve original content for revert */
  const originalHTML = element.innerHTML;
  const text = element.textContent ?? "";

  const allChars: HTMLSpanElement[] = [];
  const allWords: HTMLSpanElement[] = [];

  /* Split text by whitespace into words */
  const wordTexts = text.split(/(\s+)/);

  element.innerHTML = "";

  wordTexts.forEach((segment) => {
    if (/^\s+$/.test(segment)) {
      /* Preserve whitespace between words */
      element.appendChild(document.createTextNode(segment));
      return;
    }

    /* Create a word wrapper */
    const wordSpan = document.createElement("span");
    wordSpan.className = wordClass;
    wordSpan.setAttribute("aria-hidden", "true");

    /* Create char wrappers inside the word */
    for (const char of segment) {
      const charSpan = document.createElement("span");
      charSpan.className = charClass;
      charSpan.textContent = char;
      charSpan.style.display = "inline-block";
      charSpan.style.willChange = "transform, opacity";
      wordSpan.appendChild(charSpan);
      allChars.push(charSpan);
    }

    element.appendChild(wordSpan);
    allWords.push(wordSpan);
  });

  /* Screen reader: keep original text accessible */
  const srOnly = document.createElement("span");
  srOnly.className = "sr-only";
  srOnly.textContent = text;
  srOnly.style.position = "absolute";
  srOnly.style.width = "1px";
  srOnly.style.height = "1px";
  srOnly.style.overflow = "hidden";
  srOnly.style.clip = "rect(0, 0, 0, 0)";
  srOnly.style.whiteSpace = "nowrap";
  element.appendChild(srOnly);

  return {
    chars: allChars,
    words: allWords,
    revert: () => {
      element.innerHTML = originalHTML;
    },
  };
}
