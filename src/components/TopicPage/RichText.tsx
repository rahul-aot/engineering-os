import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CODE_FONT_STACK =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

// Matches, in priority order: **bold**, `inline code`, *italic*.
const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;

/**
 * Parses the lightweight markup used throughout topic content — **bold**,
 * `inline code`, and *italic* — into React nodes. Shared by RichText
 * (multi-paragraph blocks) and InlineText (single-line strings like
 * bullets, exercise prompts, and interview answers).
 */
function renderInline(line: string) {
  const parts = line.split(INLINE_PATTERN);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <Box
          key={i}
          component="code"
          sx={[
            {
              fontFamily: CODE_FONT_STACK,
              fontSize: "0.875em",
              bgcolor: "grey.100",
              px: 0.6,
              py: 0.1,
              borderRadius: 0.75,
            },
            (theme) => theme.applyStyles("dark", { bgcolor: "grey.800" }),
          ]}
        >
          {part.slice(1, -1)}
        </Box>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Renders a single line/string of lightly-marked-up text inline. */
export function InlineText({ text }: { text: string }) {
  return <>{renderInline(text)}</>;
}

interface RichTextProps {
  text: string;
}

/**
 * Renders the lightly-marked-up plain text used throughout topic content:
 * blank-line-separated paragraphs, "- " bullet lists, and inline
 * **bold** / `code` / *italic* spans. Keeps content files as plain
 * readable strings instead of JSX or a full markdown dependency.
 */
export default function RichText({ text }: RichTextProps) {
  const blocks = text
    .trim()
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim());
        const isList = lines.every((l) => l.startsWith("- "));

        if (isList) {
          return (
            <Box key={i} component="ul" sx={{ m: 0, pl: 3 }}>
              {lines.map((line, j) => (
                <Typography key={j} component="li" variant="body1" sx={{ mb: 0.5 }}>
                  {renderInline(line.slice(2))}
                </Typography>
              ))}
            </Box>
          );
        }

        return (
          <Typography key={i} variant="body1">
            {renderInline(lines.join(" "))}
          </Typography>
        );
      })}
    </Box>
  );
}
