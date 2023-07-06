import { auth, db } from '../firebaseConfig.js';
import { collection, query, where, doc, getDocs } from 'firebase/firestore';

const getAllMyCouponBooksForOthers = async () => {
  const user = auth.currentUser;
  const uid = user.uid;
  const couponBookRef = collection(db, 'coupon_book');
  const userDocRef = doc(db, 'users', uid);
  const q = query(couponBookRef, where('sender_id', '==', userDocRef));
  const querySnapshot = await getDocs(q);
  const allCouponBooks = [];
  querySnapshot.forEach((doc) => {
    allCouponBooks.push({ coupon_book_id: doc.id, ...doc.data() });
  });
  return allCouponBooks;
};

export { getAllMyCouponBooksForOthers };
