import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

const addNewCouponBook = async (title,image) => {
    const docRef = await addDoc(collection(db, "coupon_book"), {
      title,
      image
    });
    return docRef.id
 
};

module.exports = { addNewCouponBook };
