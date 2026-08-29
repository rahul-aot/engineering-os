import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import ArchitectureOutlinedIcon from "@mui/icons-material/ArchitectureOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import type { SubjectId } from "../types/content";

export interface SubjectMeta {
  id: SubjectId;
  path: string;
  icon: SvgIconComponent;
}

// Presentation metadata for each subject (icon + route), kept separate from
// the pure content data so content/ stays UI-agnostic.
export const subjectMeta: Record<SubjectId, SubjectMeta> = {
  javascript: { id: "javascript", path: "/javascript", icon: CodeOutlinedIcon },
  dsa: { id: "dsa", path: "/dsa", icon: AccountTreeOutlinedIcon },
  "system-design": {
    id: "system-design",
    path: "/system-design",
    icon: ArchitectureOutlinedIcon,
  },
};
