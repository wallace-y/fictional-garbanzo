import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import React from "react";
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
import { Button, TextInput, Text } from "react-native-paper";
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

export default class CouponCreator extends React.Component {
  state = {
    image: null,
    uploading: false,
    couponBookName: null,
  };

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  _setCouponBookName = (name) => {
    this.setState({ couponBookName: name });
  };

  render() {
    let { couponBookName, image } = this.state;

    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {!!image && (
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                textAlign: "center",
                marginHorizontal: 15,
              }}
            >
              Are you happy with this image? Note: you can change this later.
            </Text>
          )}
          <Text variant="displayMedium">Create a new coupon book</Text>
          <Text variant="titleMedium">Choose a name for your coupon book</Text>
          <TextInput
            label="Coupon Book Name"
            value={couponBookName}
            onChangeText={this._setCouponBookName}
          ></TextInput>
          <Text variant="titleMedium">
            Choose a photo to be your coupon book cover
          </Text>

          <Button mode="outlined" onPress={this._pickImage}>
            Camera
          </Button>

          <Button mode="outlined" onPress={this._takePhoto}>
            Take Photo
          </Button>

          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}

          <Text variant="titleMedium">If you're happy press create below.</Text>
          <Button mode="outlined" onPress={this._handleCreateNewCouponBook}>
            Create
          </Button>

          <StatusBar barStyle="default" />
        </View>
      </ScrollView>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
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

  _maybeRenderImage = () => {
    let { image } = this.state;
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
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.canceled) {
        const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log("Upload error", e.message);
      console.log("Upload error", e.stack);

      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };

  _handleCreateNewCouponBook = () => {
    // const { couponBookName, image } = this.state;
    try {
      addNewCouponBook()
    } catch (err) {
      console.log(err);
    }
  };
}

async function uploadImageAsync(uri) {
  const storage = getStorage()

  function generateUniqueID() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
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
}
