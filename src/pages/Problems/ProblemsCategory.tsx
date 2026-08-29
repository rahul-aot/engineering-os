import { Navigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getCategory, getProblemsByCategory } from "../../content/problems";
import ProblemList from "../../components/ProblemList/ProblemList";

export default function ProblemsCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? getCategory(categoryId) : undefined;

  if (!category) {
    return <Navigate to="/problems" replace />;
  }

  const problems = getProblemsByCategory(category.id);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/problems" underline="hover" color="inherit">
          Problems
        </Link>
        <Typography color="text.primary">{category.title}</Typography>
      </Breadcrumbs>

      <Typography variant="h1" component="h1" sx={{ mb: 1 }}>
        {category.title}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
        {category.description}
      </Typography>

      {problems.length === 0 ? (
        <Typography variant="body2" sx={{ color: "text.disabled" }}>
          Problems for this category are on their way.
        </Typography>
      ) : (
        <ProblemList categoryId={category.id} problems={problems} />
      )}
    </Box>
  );
}
