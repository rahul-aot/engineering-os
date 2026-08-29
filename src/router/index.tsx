import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Subject from "../pages/Subject/Subject";
import Topic from "../pages/Topic/Topic";
import Progress from "../pages/Progress/Progress";
import Bookmarks from "../pages/Bookmarks/Bookmarks";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/:subjectId" element={<Subject />} />
        <Route path="/:subjectId/:topicId" element={<Topic />} />
      </Route>
    </Routes>
  );
}
