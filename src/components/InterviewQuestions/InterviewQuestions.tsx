import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { InterviewQuestion } from "../../types/content";
import { InlineText } from "../TopicPage/RichText";

interface InterviewQuestionsProps {
  questions: InterviewQuestion[];
}

/** Collapsed-by-default accordion list of interview Q&A for a topic. */
export default function InterviewQuestions({ questions }: InterviewQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div>
      {questions.map((q, i) => (
        <Accordion
          key={i}
          disableGutters
          variant="outlined"
          sx={{ "&:not(:last-of-type)": { mb: 1 } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              <InlineText text={q.question} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <InlineText text={q.answer} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
