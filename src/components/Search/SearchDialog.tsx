import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../../hooks/useSearch";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

/** A simple client-side search dialog over topic titles, descriptions, and keywords. */
export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const results = useSearch(query);
  const navigate = useNavigate();

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const goToResult = (subjectId: string, topicId: string) => {
    navigate(`/${subjectId}/${topicId}`);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: { borderRadius: 2, overflow: "hidden" } } }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <SearchIcon sx={{ color: "text.secondary" }} />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Search topics…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ fontSize: "1.05rem" }}
        />
      </Box>

      <Box sx={{ maxHeight: 420, overflowY: "auto" }}>
        {query.trim() && results.length === 0 && (
          <Typography variant="body2" sx={{ color: "text.secondary", p: 3, textAlign: "center" }}>
            No topics found for "{query}"
          </Typography>
        )}

        {results.length > 0 && (
          <List disablePadding>
            {results.map(({ subject, topic }) => (
              <ListItemButton
                key={`${subject.id}/${topic.id}`}
                onClick={() => goToResult(subject.id, topic.id)}
              >
                <ListItemText
                  primary={topic.title}
                  secondary={topic.description}
                />
                <Chip label={subject.title} size="small" variant="outlined" />
              </ListItemButton>
            ))}
          </List>
        )}

        {!query.trim() && (
          <Typography variant="body2" sx={{ color: "text.secondary", p: 3, textAlign: "center" }}>
            Start typing to search across JavaScript, DSA, and System Design.
          </Typography>
        )}
      </Box>
    </Dialog>
  );
}
