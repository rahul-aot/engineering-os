import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { CodeExample } from "../../types/content";
import { InlineText } from "../TopicPage/RichText";

interface CodeBlockProps {
  example: CodeExample;
}

/**
 * A readable, monospace code block with an optional caption and
 * explanation. Scrolls horizontally on its own rather than letting the
 * page overflow (important on mobile).
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
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          fontSize: "0.85rem",
          lineHeight: 1.65,
        }}
      >
        <code>{example.code}</code>
      </Box>
      {example.explanation && (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mt: 1 }}
        >
          <InlineText text={example.explanation} />
        </Typography>
      )}
    </Box>
  );
}
