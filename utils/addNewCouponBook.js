import { collection, addDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig.js';

const addNewCouponBook = async (title, image, recipient, sender_name) => {
  const docRef = await addDoc(collection(db, 'coupon_book'), {
    title,
    image,
    sender_id: doc(db, 'users', auth.currentUser.uid),
    recipient,
    sender_name,
  });
  return docRef.id;
};

module.exports = { addNewCouponBook };
