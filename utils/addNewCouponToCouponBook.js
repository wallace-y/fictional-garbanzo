import { collection, addDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig.js';

const addNewCouponToCouponBook = async (
  title,
  content,
  icon,
  coupon_book_id,
) => {
  const docRef = await addDoc(collection(db, 'coupons'), {
    title,
    content,
    icon,
    coupon_book_id: doc(db, 'coupon_book', coupon_book_id),
  });
};

module.exports = { addNewCouponToCouponBook };
