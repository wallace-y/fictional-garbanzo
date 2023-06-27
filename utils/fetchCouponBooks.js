import { auth, db } from "../firebaseConfig.js";
import { collection, query, where, doc, getDocs } from "firebase/firestore";

const getAllCouponBooks = async () => {
  const user = auth.currentUser;
  const uid = user.uid;
  const couponBookRef = collection(db, "coupon_book");
  const userDocRef = doc(db, "users", uid);
  const q = query(couponBookRef, where("receiver_id", "==", userDocRef));
  const querySnapshot = await getDocs(q);
  const allCouponBooks = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    allCouponBooks.push(doc.data())
    // console.log(doc.id, " => ", doc.data());
  });
  return allCouponBooks
};

export { getAllCouponBooks };
