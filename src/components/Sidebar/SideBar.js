import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useDb } from "../../contexts/DbContext";
import SuccessModal from "../Issue/SuccessModal";
import AddIssue from "../Issue/addIssue/AddIssue";
import IssueDetails from "../IssueDetails/IssueDetails";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import BugReportIcon from "@mui/icons-material/BugReport";
import IssueTable from "../IssueTable/Table";

const DashboardSidebar = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const isMobile = useMediaQuery({ query: `(max-width: 650px)` });
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleIssueTable, setToggleIssueTable] = useState("All Issues");
  const [error, setError] = useState("");

  const {
    toggleIssue,
    setToggleIssue,
    postSuccessful,
    getAllIssues,
    getOpenIssues,
    getClosedIssues,
    getMyIssues,
    showDetails,
    setShowDetails,
    showAssignModal,
    showCloseModal,
  } = useDb();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("failed to logout");
    }
  };

  const selectIssueTable = (title) => {
    setToggleIssue(false);
    setToggleIssueTable(title);
    if (isMobile) {
      setToggleMenu(false);
    }
  };

  const handleAddIssuePopup = () => {
    if (isMobile) {
      setToggleMenu(false);
    }
    setShowDetails(false);
    setToggleIssue(true);
  };

  const checkForIssueTable = (title) => {
    if (
      (toggleIssueTable === title &&
        isMobile === true &&
        toggleIssue === false) ||
      (isMobile === false && toggleIssueTable === title)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div class="sm:flex">
      <div class="flex justify-center h-auto w-screen bg-gray-700 relative z-20 sm:h-screen sm:w-60 md:w-72 flex-shrink-0">
        <div class="flex flex-col justify-center sm:justify-start sm:items-start sm:h-full md:h-screen w-full pt-12 pl-2 text-gray-300">
          <div class="flex justify-evenly sm:justify-start w-full mb-10 px-6 font-semibold text-2xl uppercase">
            <h1 class="">Bug Tracker</h1>

            <button onClick={() => setToggleMenu(!toggleMenu)}>
              {isMobile ? <MenuIcon fontSize="large" /> : ""}
            </button>
          </div>
          {toggleMenu === true || isMobile === false ? (
            <>
              <button
                class="flex w-auto flex-shrink-0 px-6 py-2 mt-2 text-sm uppercase font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => selectIssueTable("All Issues")}
              >
                <BugReportIcon />
                <p class="px-4">Show All Bugs</p>
              </button>
              <button
                class="flex w-auto flex-shrink-0 px-6 py-2 mt-2 text-sm uppercase font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => selectIssueTable("Open Issues")}
              >
                <BugReportIcon />
                <p class="px-4">Show Open Bugs</p>
              </button>
              <button
                class="flex w-auto flex-shrink-0 px-6 py-2 mt-2 text-sm uppercase font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => selectIssueTable("Closed Issues")}
              >
                <BugReportIcon />
                <p class="px-4">Show Closed Bugs</p>
              </button>
              <button
                class="flex w-auto flex-shrink-0 px-6 py-2 mt-2 text-sm uppercase font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => selectIssueTable("My Bugs Reported")}
              >
                <BugReportIcon />
                <p class="px-4">Show My Bugs</p>
              </button>
              <button
                onClick={() => handleAddIssuePopup()}
                class="flex w-auto flex-shrink-0 px-6 py-2 mt-2 text-sm uppercase font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                <AddToPhotosIcon size="20" />
                <p class="px-4">Add Issue </p>
              </button>
              <button
                onClick={() => handleLogout()}
                class="flex w-auto flex-shrink-0 px-6 py-2 mt-2 text-sm uppercase font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                <LogoutIcon size="20" />
                <p class="px-4">Logout</p>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div class="w-full">
        {postSuccessful && <SuccessModal />}
        {toggleIssue && <AddIssue open={toggleIssue} />}
        {showDetails && <IssueDetails />}

        {checkForIssueTable("All Issues") ? (
          <IssueTable title={toggleIssueTable} fn={getAllIssues} />
        ) : checkForIssueTable("Open Issues") ? (
          <IssueTable title={toggleIssueTable} fn={getOpenIssues} />
        ) : checkForIssueTable("Closed Issues") ? (
          <IssueTable title={toggleIssueTable} fn={getClosedIssues} />
        ) : checkForIssueTable("My Bugs Reported") ? (
          <IssueTable title={toggleIssueTable} fn={getMyIssues} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default DashboardSidebar;
