import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

const addNewCouponBook = async () => {
  console.log("here");
    const docRef = await addDoc(collection(db, "coupon_book"), {
      title: "test",
    });
    console.log(docRef.id)
 
};

module.exports = { addNewCouponBook };
