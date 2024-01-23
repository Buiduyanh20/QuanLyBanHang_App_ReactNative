import { Image, RefreshControl, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListProducts from "./ListProducts";
import ProfileComp from "./ProfileComp";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const [objU, setobjU] = useState({});
  const [fullname, setfullname] = useState("");
  const [avatar, setavatar] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  var api_url = "http://10.24.23.123:3000/api/users/viewusername/";

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
        setobjU(JSON.parse(value));
        let obj = JSON.parse(value);

        fetch(api_url + obj.username)
          .then((res) => res.json())
          .then((data) => {
            setavatar(data.data.avatar);
            setfullname(data.data.fullname);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <View style={{ padding: 20, paddingTop: 10 }}>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={{
                width: 100,
                height: 100,
                marginBottom: 15,
                borderRadius: 100,
              }}
            />
          ) : (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
              }}
              style={{ width: 100, height: 100, marginBottom: 15 }}
            />
          )}
          <Text style={{ color: "black", fontWeight: "600", fontSize: 18 }}>
            {fullname}
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "#3997F0", fontWeight: "bold" }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeComp = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Sản phẩm" component={ListProducts} />
      <Drawer.Screen name="Thông tin người dùng" component={ProfileComp} />
    </Drawer.Navigator>
  );
};

export default HomeComp;

const styles = StyleSheet.create({});
