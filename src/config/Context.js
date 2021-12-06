import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "./firebase";
import {
  addDoc,
  query,
  collection,
  getDocs,
  where,
  limit,
  onSnapshot,
  doc,
} from "firebase/firestore";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState();
  const [user, setUser] = useState();
  const [reviews, setReviews] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const subscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const reviews = snapshot.docs.map((doc) => doc.data());
      setReviews(reviews);
    });
    return subscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const subscribe = onSnapshot(doc(db, "users", user.authId), (doc) => {
        setUser({ ...doc.data(), authId: user.authId });
      });
      return subscribe;
    }
  }, [user]);

  useEffect(() => {
    const getReviews = async () => {
      const collectionRef = collection(db, "reviews");
      const q = query(collectionRef, limit(12));
      const querySnap = await getDocs(q);
      setReviews(querySnap.docs.map((doc) => doc.data()));
    };
    getReviews();
  }, []);

  useEffect(() => {
    const subscribe = () => {
      auth.onAuthStateChanged(async (user) => {
        setAuthedUser(user);
      });
    };
    subscribe();
    return subscribe;
  }, []);

  useEffect(() => {
    const getOrCreateUser = async () => {
      if (authedUser) {
        try {
          const collectionRef = collection(db, "users");
          const q = query(collectionRef, where("id", "==", authedUser.uid));
          const querySnap = await getDocs(q);
          if (querySnap.docs.length > 0) {
            const { id } = querySnap.docs[0];
            setUser({ ...querySnap.docs[0].data(), authId: id });
          } else {
            const payload = {
              email: authedUser.email,
              id: authedUser.uid,
              plants: [],
            };
            const { id } = await addDoc(collection(db, "users"), payload);
            setUser({ ...payload, authId: id });
          }
        } catch (error) {
          console.log(error);
        }
      } else setUser(null);
    };
    getOrCreateUser();
  }, [authedUser]);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <Context.Provider value={{ user, authedUser, reviews }}>
      {children}
    </Context.Provider>
  );
};
