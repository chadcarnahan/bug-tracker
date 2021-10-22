import React, { useContext, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import {
  collection,
  addDoc,
  getFirestore,
  setDoc,
  getDocs,
  Timestamp,
  where,
  query,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const DbContext = React.createContext();
export const useDb = () => {
  return useContext(DbContext);
};

export const DbProvider = ({ children }) => {
  const db = getFirestore();
  const [postSuccessful, setPostSuccessful] = useState(false);
  const [toggleIssue, setToggleIssue] = useState(false);
  const [toggleAllIssues, setToggleAllIssues] = useState("All Issues");
  const [issues, setIssues] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [userList, setUserList] = useState();
  const { currentUser } = useAuth();
  const postIssue = async (
    name,
    issueType,
    priority,
    summary,
    component,
    description,
    user
  ) => {
    var myTimestamp = Timestamp.fromDate(new Date());

    const docRef = await addDoc(collection(db, "issues"), {
      name,
      issueType,
      priority,
      summary,
      component,
      description,
      status: "Open",
      date: myTimestamp,
      closingComment: "",
      assignedTo: "Nobody Yet",
      assignedId: "",
      user,
    });
    setToggleIssue(false);
  };

  const updateIssues = async (
    postId,
    name,
    issueType,
    priority,
    summary,
    component,
    description,
    user,
    status,
    date,
    closingComment,
    assignedTo,
    assignedId
  ) => {
    await setDoc(doc(db, "issues", postId), {
      name,
      issueType,
      priority,
      summary,
      component,
      description,
      status,
      date,
      closingComment,
      assignedTo,
      assignedId,
      user,
    });
    setToggleIssue(false);
  };

  const getAllIssues = useCallback(() => {
    const query = async () => {
      const list = [];
      const docRef = collection(db, "issues");
      const docSnap = await getDocs(docRef);

      docSnap.forEach((doc) => {
        list.push(Object.assign({ id: doc.id }, doc.data()));
      });
      setIssues(list);
    };
    query();
  }, [db]);

  const getOpenIssues = useCallback(() => {
    const getData = async () => {
      const q = query(collection(db, "issues"), where("status", "==", "Open"));
      const list = [];
      const docSnap = await getDocs(q);

      docSnap.forEach((doc) => {
        list.push(Object.assign({ id: doc.id }, doc.data()));
      });
      setIssues(list);
    };
    getData();
  }, [db]);

  const getClosedIssues = useCallback(() => {
    const getData = async () => {
      const q = query(
        collection(db, "issues"),
        where("status", "==", "Closed")
      );
      const list = [];
      const docSnap = await getDocs(q);

      docSnap.forEach((doc) => {
        list.push(Object.assign({ id: doc.id }, doc.data()));
      });
      setIssues(list);
    };
    getData();
  }, [db]);

  const getMyIssues = useCallback(() => {
    const getData = async () => {
      const q = query(
        collection(db, "issues"),
        where("user", "==", currentUser?.uid)
      );
      const list = [];
      const docSnap = await getDocs(q);

      docSnap.forEach((doc) => {
        list.push(Object.assign({ id: doc.id }, doc.data()));
      });
      setIssues(list);
    };
    getData();
  }, [currentUser?.uid, db]);

  const showAllIssues = () => {
    setToggleIssue(false);
    setToggleAllIssues(true);
  };

  const assignIssue = async (assigneeId, assignee, id) => {
    const docRef = doc(db, "issues", id);
    await updateDoc(docRef, {
      assignedTo: assignee,
      assignedId: assigneeId,
    });
  };

  const closeIssue = async (postId) => {
    const docRef = doc(db, "issues", postId);
    await updateDoc(docRef, {
      status: "Closed",
    });
  };

  const openIssue = async (postId) => {
    const docRef = doc(db, "issues", postId);
    await updateDoc(docRef, {
      status: "Open",
    });
  };

  const getUsers = useCallback(() => {
    const query = async () => {
      const list = [];
      const docRef = collection(db, "userInfo");
      const docSnap = await getDocs(docRef);

      docSnap.forEach((doc) => {
        list.push(Object.assign({ id: doc.id }, doc.data()));
      });
      setUserList(list);
    };

    query();
  }, [db]);

  const deleteIssue = async (id) => {
    await deleteDoc(doc(db, "issues", id));
  };

  const value = {
    setToggleIssue,
    toggleIssue,
    postIssue,
    postSuccessful,
    setPostSuccessful,
    toggleAllIssues,
    showAllIssues,
    getAllIssues,
    setToggleAllIssues,
    getOpenIssues,
    getClosedIssues,
    getMyIssues,
    issues,
    showDetails,
    setShowDetails,
    setEditDetails,
    editDetails,
    updateIssues,
    getUsers,
    userList,
    assignIssue,
    closeIssue,
    deleteIssue,
    openIssue,
  };
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};
