import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

interface ProgressBarProps {
  /** 0-100 */
  value: number;
  label?: string;
  /** Show the percentage next to the label. Defaults to true. */
  showPercentage?: boolean;
}

export default function ProgressBar({
  value,
  label = "Progress",
  showPercentage = true,
}: ProgressBarProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 0.75,
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {label}
        </Typography>
        {showPercentage && (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            {value}%
          </Typography>
        )}
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: "divider",
        }}
      />
    </Box>
  );
}
