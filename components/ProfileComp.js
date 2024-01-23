import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../misc/colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ProfileComp = (props) => {
  const [objU, setobjU] = useState({});
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [avatar, setavatar] = useState("");
  const [username, setusername] = useState("");
  const [passwd, setpasswd] = useState("");
  const [passwdOld, setpasswdOld] = useState("");
  const [passwdNew, setpasswdNew] = useState("");
  const [role, setrole] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordNew, setHidePasswordNew] = useState(true);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const toggleHidePasswordNew = () => {
    setHidePasswordNew(!hidePasswordNew);
  };

  var api_url = "http://10.24.23.123:3000/api/users/edit/";
  var api_url_check_pass = "http://10.24.23.123:3000/api/users/viewid/";

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
        let obj = JSON.parse(value);
        setobjU(JSON.parse(value));

        fetch(api_url_check_pass + obj._id)
          .then((res) => res.json())
          .then((data) => {
            setfullname(data.data.fullname),
              setemail(data.data.email),
              setavatar(data.data.avatar),
              setrole(data.data.role),
              setusername(data.data.username),
              setpasswd(data.data.password);
          })
          .catch((err) => console.error(err));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      let _uri = result.assets[0].uri;
      let file_ext = _uri.substring(_uri.lastIndexOf(".") + 1);

      FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      }).then((res) => {
        setavatar("data:image/" + file_ext + ";base64," + res);
      });
    }
  };

  const updateProfile = () => {
    if (fullname.length == 0) {
      alert("Vui lòng nhập họ tên");
      return;
    }
    if (username.length == 0) {
      alert("Vui lòng nhập username");
      return;
    }
    if (passwdOld.length == 0) {
      alert("Vui lòng nhập mật khẩu cũ");
      return;
    }
    if (passwdNew.length == 0) {
      alert("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (email.length == 0) {
      alert("Vui lòng nhập email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không đúng định dạng");
      return;
    }
    // fetch(api_url_check_pass + objU._id)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (passwdOld == passwd) {
    //       fetch(api_url + objU._id, {
    //         method: "PUT",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           _id: objU._id,
    //           username: username,
    //           password: passwdNew,
    //           avatar: avatar,
    //           fullname: fullname,
    //           email: email,
    //           role: role,
    //         }),
    //       })
    //         .then((res) => {
    //           if (res.status === 200 || res.status === 204) {
    //             alert("Sửa thành công");
    //             setpasswdOld("");
    //             setpasswdNew("");
    //           } else {
    //             alert("Sửa thất bại");
    //           }
    //         })
    //         .catch((err) => console.error(err));
    //     } else {
    //       alert("Mật khẩu cũ sai !!");
    //       return;
    //     }
    //   });

    if (passwdOld == passwd) {
      fetch(api_url + objU._id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: passwdNew,
          avatar: avatar,
          fullname: fullname,
          email: email,
          role: role,
        }),
      })
        .then((res) => {
          if (res.status === 200 || res.status === 204) {
            alert("Sửa thành công");
            setpasswdOld("");
            setpasswdNew("");
            // getData()
          } else {
            alert("Sửa thất bại");
          }
        })
        .catch((err) => console.error(err));
    } else {
      alert("Mật khẩu cũ sai !!");
      return;
    }

    // fetch(api_url + `${objU.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: objU.id,
    //     username: objU.username,
    //     passwd: objU.passwd,
    //     avatar: avatar,
    //     fullname: fullname,
    //     role: role,
    //   }),
    // })
    //   .then((res) => {
    //     if (res.status === 200 || res.status === 204) {
    //       alert("Sửa thành công");
    //     } else {
    //       alert("Sửa thất bại");
    //     }
    //   })
    //   .catch((err) => console.error(err));
  };

  return (
    <View style={styles.contaniner}>
      <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
        ) : (
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
            }}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
        )}
      </TouchableOpacity>
      <TextInput
        value={fullname}
        style={styles.tIFullname}
        placeholder="Họ tên"
        onChangeText={(text) => setfullname(text)}
      />
      <TextInput
        value={email}
        style={styles.tIFullname}
        placeholder="Email"
        onChangeText={(text) => setemail(text)}
      />
      <TextInput
        value={username}
        style={styles.tIFullname}
        placeholder="Username"
        editable={false}
        onChangeText={(text) => setusername(text)}
      />
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          borderColor: colors.GREY,
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <TextInput
          style={{ flex: 1, textAlign: "center" }}
          value={passwdOld}
          placeholder="Nhập mật khẩu cũ"
          onChangeText={(text) => setpasswdOld(text)}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity onPress={toggleHidePassword}>
          <Text style={{ color: "gray", fontSize: 13 }}>
            {hidePassword ? "Show" : "Hide"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          borderColor: colors.GREY,
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <TextInput
          value={passwdNew}
          secureTextEntry={hidePasswordNew}
          style={{ flex: 1, textAlign: "center" }}
          placeholder="Nhập mật khẩu mới"
          onChangeText={(text) => setpasswdNew(text)}
        />
        <TouchableOpacity onPress={toggleHidePasswordNew}>
          <Text style={{ color: "gray", fontSize: 13 }}>
            {hidePasswordNew ? "Show" : "Hide"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btnSave}
        activeOpacity={0.7}
        onPress={updateProfile}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileComp;

const styles = StyleSheet.create({
  contaniner: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 20,
  },
  tIFullname: {
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.GREY,
    textAlign: "center",
    padding: 12,
    marginTop: 20,
  },
  btnSave: {
    backgroundColor: colors.ORANGE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginTop: 30,
    borderRadius: 20,
  },
});
