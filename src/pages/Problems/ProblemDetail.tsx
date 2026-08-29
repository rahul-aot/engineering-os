import { Navigate, useParams } from "react-router-dom";
import { getCategory, getProblem } from "../../content/problems";
import ProblemPageView from "../../components/ProblemPage/ProblemPage";

export default function ProblemDetail() {
  const { categoryId, problemId } = useParams<{ categoryId: string; problemId: string }>();

  const category = categoryId ? getCategory(categoryId) : undefined;
  const problem = categoryId && problemId ? getProblem(categoryId, problemId) : undefined;

  if (!category || !problem) {
    return <Navigate to={category ? `/problems/${category.id}` : "/problems"} replace />;
  }

  return <ProblemPageView category={category} problem={problem} />;
}
