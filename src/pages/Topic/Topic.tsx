import { Navigate, useParams } from "react-router-dom";
import { getSubject, getTopic } from "../../content";
import TopicPageView from "../../components/TopicPage/TopicPage";

export default function Topic() {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();

  const subject = subjectId ? getSubject(subjectId) : undefined;
  const topic = subjectId && topicId ? getTopic(subjectId, topicId) : undefined;

  if (!subject || !topic) {
    return <Navigate to={subject ? `/${subject.id}` : "/"} replace />;
  }

  return <TopicPageView subject={subject} topic={topic} />;
}
