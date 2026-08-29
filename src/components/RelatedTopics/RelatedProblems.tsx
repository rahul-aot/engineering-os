import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { getProblem } from "../../content/problems";

interface RelatedProblemsProps {
  categoryId: string;
  problemIds: string[];
}

/** Clickable chips linking to other problems within the same category. */
export default function RelatedProblems({ categoryId, problemIds }: RelatedProblemsProps) {
  const navigate = useNavigate();

  const resolved = problemIds
    .map((id) => getProblem(categoryId, id))
    .filter((problem): problem is NonNullable<typeof problem> => Boolean(problem));

  if (resolved.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {resolved.map((problem) => (
        <Chip
          key={problem.id}
          label={problem.title}
          clickable
          variant="outlined"
          onClick={() => navigate(`/problems/${categoryId}/${problem.id}`)}
        />
      ))}
    </Box>
  );
}
