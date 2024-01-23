import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginComp from "./components/LoginComp";
import RegisterComp from "./components/RegisterComp";
import HomeComp from "./components/HomeComp";
import DetailProduct from "./components/DetailProduct";

const StackScreen = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <StackScreen.Navigator initialRouteName="Login">
        <StackScreen.Screen
          name="Login"
          component={LoginComp}
          options={{ title: "Đăng nhập", headerShown: false }}
        />
        <StackScreen.Screen
          name="Register"
          component={RegisterComp}
          options={{ title: "Đăng ký", headerShown: false }}
        />
        <StackScreen.Screen
          name="Home"
          component={HomeComp}
          options={{ title: "Home", headerShown: false }}
        />
        <StackScreen.Screen
          name="DetailProduct"
          component={DetailProduct}
          options={{ title: "Chi tiết sản phẩm" }}
        />
      </StackScreen.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
