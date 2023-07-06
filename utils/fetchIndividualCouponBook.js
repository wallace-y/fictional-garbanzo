import { auth, db } from '../firebaseConfig.js';
import { collection, query, where, doc, getDocs } from 'firebase/firestore';

const getIndividualCouponBook = async (coupon_book_id) => {
  const couponsRef = collection(db, 'coupons');
  const couponBookRef = doc(db, 'coupon_book', coupon_book_id);
  const q = query(couponsRef, where('coupon_book_id', '==', couponBookRef));
  const querySnapshot = await getDocs(q);
  const allCoupons = [];
  querySnapshot.forEach((doc) => {
    allCoupons.push({ unique_coupon_book_id: doc.id, ...doc.data() });
  });
  return allCoupons;
};

export { getIndividualCouponBook };
