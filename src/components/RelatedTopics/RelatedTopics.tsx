import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { getTopic } from "../../content";
import type { SubjectId } from "../../types/content";

interface RelatedTopicsProps {
  subjectId: SubjectId;
  topicIds: string[];
}

/** Clickable chips linking to other topics within the same subject. */
export default function RelatedTopics({ subjectId, topicIds }: RelatedTopicsProps) {
  const navigate = useNavigate();

  const resolved = topicIds
    .map((id) => getTopic(subjectId, id))
    .filter((topic): topic is NonNullable<typeof topic> => Boolean(topic));

  if (resolved.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {resolved.map((topic) => (
        <Chip
          key={topic.id}
          label={topic.title}
          clickable
          variant="outlined"
          onClick={() => navigate(`/${subjectId}/${topic.id}`)}
        />
      ))}
    </Box>
  );
}
