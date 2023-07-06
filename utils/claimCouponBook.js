import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig.js';

const claimCouponBook = async (docId, callback) => {
  const docRef = doc(db, 'coupon_book', docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const senderExists = docSnap.data().receiver_id;
    if (senderExists == undefined) {
      await updateDoc(docRef, {
        receiver_id: doc(db, 'users', auth.currentUser.uid),
      });
      callback(true);
    } else {
      alert('This coupon has already been claimed');
      callback(false);
    }
  } else {
    alert('This reference is invalid. Please check again.');
  }
};

module.exports = { claimCouponBook };
