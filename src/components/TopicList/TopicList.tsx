import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import ReplayIcon from "@mui/icons-material/Replay";
import type { ProgressStatus, SubjectId, Topic, TopicLevel } from "../../types/content";
import { useProgress } from "../../hooks/useProgress";

interface TopicListProps {
  subjectId: SubjectId;
  topics: Topic[];
}

const LEVEL_ORDER: TopicLevel[] = ["beginner", "intermediate", "advanced"];
const LEVEL_LABEL: Record<TopicLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

function StatusIcon({ status }: { status: ProgressStatus }) {
  switch (status) {
    case "completed":
      return <CheckCircleIcon fontSize="small" color="primary" />;
    case "learning":
      return <TripOriginIcon fontSize="small" color="primary" />;
    case "needs-review":
      return <ReplayIcon fontSize="small" color="warning" />;
    default:
      return <RadioButtonUncheckedIcon fontSize="small" sx={{ color: "text.disabled" }} />;
  }
}

/** Topics organized into learning levels, rendered as simple list rows. */
export default function TopicList({ subjectId, topics }: TopicListProps) {
  const navigate = useNavigate();
  const { getStatus } = useProgress();

  // Number topics sequentially across all levels (01, 02, ...), computed
  // up front rather than mutated during the render below.
  const orderedIds = LEVEL_ORDER.flatMap((level) =>
    topics.filter((t) => t.level === level).map((t) => t.id),
  );
  const topicNumbers = new Map(orderedIds.map((id, i) => [id, i + 1]));

  return (
    <Box>
      {LEVEL_ORDER.map((level) => {
        const levelTopics = topics.filter((t) => t.level === level);
        if (levelTopics.length === 0) return null;

        return (
          <Box key={level} sx={{ mb: 4 }}>
            <Typography
              variant="overline"
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {LEVEL_LABEL[level]}
            </Typography>
            <List disablePadding sx={{ mt: 1 }}>
              {levelTopics.map((topic) => {
                const number = String(topicNumbers.get(topic.id)).padStart(2, "0");
                const status = getStatus(topic.id);

                return (
                  <ListItemButton
                    key={topic.id}
                    onClick={() => navigate(`/${subjectId}/${topic.id}`)}
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: 1,
                      "&:not(:last-of-type)": { mb: 0.5 },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <StatusIcon status={status} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", gap: 1.25, alignItems: "baseline" }}>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.secondary", fontVariantNumeric: "tabular-nums" }}
                          >
                            {number}
                          </Typography>
                          <Typography component="span" variant="body1" sx={{ fontWeight: 500 }}>
                            {topic.title}
                          </Typography>
                        </Box>
                      }
                      secondary={topic.description}
                      slotProps={{ secondary: { sx: { ml: "2.35rem" } } }}
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
