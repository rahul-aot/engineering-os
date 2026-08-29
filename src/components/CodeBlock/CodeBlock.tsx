import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { CodeExample } from "../../types/content";
import { InlineText } from "../TopicPage/RichText";

interface CodeBlockProps {
  example: CodeExample;
}

const CODE_FONT_STACK =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

/**
 * A readable, monospace code block with an optional caption, explanation,
 * and a numbered line-by-line walkthrough. Scrolls horizontally on its own
 * rather than letting the page overflow (important on mobile).
 */
export default function CodeBlock({ example }: CodeBlockProps) {
  return (
    <Box sx={{ my: 2.5 }}>
      {example.title && (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 0.75, fontWeight: 600 }}
        >
          <InlineText text={example.title} />
        </Typography>
      )}
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          borderRadius: 1.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "grey.900" : "grey.50",
          overflowX: "auto",
          fontFamily: CODE_FONT_STACK,
          fontSize: "0.85rem",
          lineHeight: 1.65,
        }}
      >
        <code>{example.code}</code>
      </Box>
      {example.explanation && (
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          <InlineText text={example.explanation} />
        </Typography>
      )}

      {example.walkthrough && example.walkthrough.length > 0 && (
        <Box
          sx={{
            mt: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
            Line by line
          </Typography>
          {example.walkthrough.map((step, i) => (
            <Box
              key={i}
              sx={{
                display: "grid",
                gridTemplateColumns: "auto minmax(0, 1fr)",
                gap: 1.5,
                alignItems: "start",
              }}
            >
              <Box
                component="code"
                sx={{
                  fontFamily: CODE_FONT_STACK,
                  fontSize: "0.8rem",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.900" : "grey.50",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  whiteSpace: "pre",
                  overflowX: "auto",
                  maxWidth: { xs: 160, sm: 240 },
                }}
              >
                {step.code}
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", pt: 0.5 }}>
                <InlineText text={step.explanation} />
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
