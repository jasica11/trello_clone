import AuthorizationPage from "./components/AuthorizationPage";
import DashboardPage from "./components/Dashboardpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewBoardPage from "./components/ViewBoardPage";
import ViewListsPage from "./components/ViewListsPage";
import CardDetails from "./components/CardDetails";
import "./index.css";
// import useAuth from "./hooks/useAuth";

function App() {
  // const { isAuthorized } = useAuth();
  return (
    <Router>
      <Routes>
        <Route exact path="/authorize" element={<AuthorizationPage />} />
        <Route path="/" element={<DashboardPage />} />

        <Route exact path="/view-board/:boardId" element={<ViewBoardPage />} />
        <Route
          exact
          path="/view-list/:boardId/:listId"
          element={<ViewListsPage />}
        />
        <Route
          exact
          path="/card-details/:listId/:cardId"
          element={<CardDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
