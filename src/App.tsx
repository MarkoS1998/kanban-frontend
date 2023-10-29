import { useSelector } from "react-redux";
import { RootState } from "./store/reducers";
import TaskListsPage from "./pages/taskListsPage";
import LoginPage from "./pages/loginPage";
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from "./components/Loader";
import Header from "./components/Header";


const App = () => {

  const apiStatus = useSelector((state: RootState) => state.apiStatus)
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser)

  return (
    <>
      <Loader isOpen={apiStatus.loading} />
      {
          loggedInUser.id !== -1 &&
          <Header />
      }
      <Routes>
        {
          loggedInUser.id !== -1 ?
            <Route path="/task-lists" element={<TaskListsPage />} />
            :
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

        }
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
