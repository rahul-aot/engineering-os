import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import type { Problem, ProblemDifficulty } from "../../types/problem";
import { useProblemProgress } from "../../hooks/useProblemProgress";

interface ProblemListProps {
  categoryId: string;
  problems: Problem[];
}

const DIFFICULTY_ORDER: ProblemDifficulty[] = ["Easy", "Medium", "Hard"];
const DIFFICULTY_COLOR: Record<ProblemDifficulty, "success" | "warning" | "error"> = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

/** Problems grouped by difficulty, rendered as simple list rows. */
export default function ProblemList({ categoryId, problems }: ProblemListProps) {
  const navigate = useNavigate();
  const { isSolved } = useProblemProgress();

  return (
    <Box>
      {DIFFICULTY_ORDER.map((difficulty) => {
        const items = problems.filter((p) => p.difficulty === difficulty);
        if (items.length === 0) return null;

        return (
          <Box key={difficulty} sx={{ mb: 4 }}>
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 1 }}
            >
              {difficulty}
            </Typography>
            <List disablePadding sx={{ mt: 1 }}>
              {items.map((problem) => {
                const solved = isSolved(problem.id);
                return (
                  <ListItemButton
                    key={problem.id}
                    onClick={() => navigate(`/problems/${categoryId}/${problem.id}`)}
                    sx={{ px: 1.5, py: 1, borderRadius: 1, "&:not(:last-of-type)": { mb: 0.5 } }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {solved ? (
                        <CheckCircleIcon fontSize="small" color="primary" />
                      ) : (
                        <RadioButtonUncheckedIcon fontSize="small" sx={{ color: "text.disabled" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={problem.title} />
                    <Chip
                      label={problem.difficulty}
                      size="small"
                      color={DIFFICULTY_COLOR[problem.difficulty]}
                      variant="outlined"
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        );
      })}
    </Box>
  );
}
