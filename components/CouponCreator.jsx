import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  View,
  LogBox,
  ScrollView,
  Platform,
} from "react-native";
import { Button, TextInput, Text, useTheme } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import { app, db } from "../firebaseConfig.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addNewCouponBook } from "../utils/addNewCouponBook.js";

//avoid reinitalizing every refresh
if (!getApps().length) {
  initializeApp(app);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function CouponCreator({ navigation }) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
    },
    imageText: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: "center",
      marginHorizontal: 15,
      color: theme.colors.text,
    },
    title: {
      fontSize: 24,
      color: theme.colors.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 20,
      color: theme.colors.text,
      marginBottom: 10,
    },
    input: {
      backgroundColor: theme.colors.surface,
    },
    button: {
      marginVertical: 10,
    },
    createText: {
      fontSize: 20,
      color: theme.colors.text,
    },
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [couponBookName, setCouponBookName] = useState(null);
  const [couponBookRecipient, setCouponBookRecipient] = useState(null);


  useEffect(() => {
    if (Platform.OS !== "web") {
      requestMediaLibraryPermissions();
    }
  }, []);

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const handleSetCouponBookName = (name) => {
    setCouponBookName(name);
  };

  const renderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  const maybeRenderImage = () => {
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        {/* <Text
          onPress={copyToClipboard}
          onLongPress={share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          {image}
        </Text> */}
      </View>
    );
  };

  const share = () => {
    Share.share({
      message: image,
      title: "Check out this photo",
      url: image,
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(image);
    alert("Copied image URL to clipboard");
  };

  const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    handleImagePicked(pickerResult);
  };

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);
      if (!pickerResult.canceled) {
        const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log("Upload error", e.message);
      console.log("Upload error", e.stack);

      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

  const handleCreateNewCouponBook = () => {
    try {
      addNewCouponBook(couponBookName, image,couponBookRecipient).then((res) => {
        alert("Coupon book created with id: " + res);
        navigation.navigate("CouponBookEditor", {
          title: couponBookName,
          image: image,
          coupon_book_id: res,
          couponBookRecipient
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImageAsync = async (uri) => {
    const storage = getStorage();

    function generateUniqueID() {
      const timestamp = Date.now().toString();
      const randomNum = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
      return `${timestamp}-${randomNum}`;
    }

    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, generateUniqueID());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* {!!image && (
        <Text style={styles.imageText}>
          Are you happy with this image? Note: you can change this later.
        </Text>
      )} */}
        <Text style={styles.title}>Create a new coupon book</Text>
        <Text style={styles.subtitle}>Choose a name for your coupon book</Text>
        <TextInput
          label="Coupon Book Name"
          value={couponBookName}
          onChangeText={handleSetCouponBookName}
          style={[styles.input, { mode: "outlined" }]}
          dense
        />
        <TextInput
          label="Recipient"
          value={couponBookRecipient}
          onChangeText={(text) => setCouponBookRecipient(text)}
          style={[styles.input, { mode: "outlined" }]}
          dense
        />
        <Text style={styles.subtitle}>
          Choose a photo to be your coupon book cover
        </Text>

        <Button
          mode="outlined"
          onPress={pickImage}
          style={styles.button}
          labelStyle={{ fontSize: 16 }}
        >
          Camera
        </Button>

        <Button
          mode="outlined"
          onPress={takePhoto}
          style={styles.button}
          labelStyle={{ fontSize: 16 }}
        >
          Take Photo
        </Button>

        {maybeRenderImage()}
        {renderUploadingOverlay()}

        <Text style={styles.createText}>
          If you're happy, press create below.
        </Text>
        <Button
          mode="outlined"
          onPress={handleCreateNewCouponBook}
          style={styles.button}
          labelStyle={{ fontSize: 18 }}
        >
          Create
        </Button>

        <StatusBar barStyle="default" />
      </View>
    </ScrollView>
  );
}
