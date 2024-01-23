import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import colors from "../misc/colors";

const DetailProduct = () => {
  const router = useRoute();
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [desc, setdesc] = useState("");
  const [image, setimage] = useState("");
  const [cate, setcate] = useState("");

  var api_url = "http://10.24.23.123:3000/api/products/view/";

  useEffect(() => {
    fetch(api_url + router.params.idSp)
      .then((res) => res.json())
      .then((data) => {
        setname(data.data.name),
          setprice(data.data.price),
          setdesc(data.data.desc),
          setimage(data.data.image),
          setcate(data.data.cateId.name);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.txtName}>{name}</Text>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/679/679922.png",
            }}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        )}
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.txtPrice}>{price} ₫</Text>
          <Text style={styles.txtDesc}>{desc}</Text>
          <Text style={styles.txtCate}>Category: {cate}</Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end", flex: 1, marginTop: 10 }}>
        <TouchableOpacity style={styles.btnBuy} activeOpacity={0.5}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  txtName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  txtPrice: {
    color: colors.RED,
    fontSize: 20,
    fontWeight: "500",
    marginTop: 8,
  },
  txtDesc: {
    marginTop: 8,
    fontSize: 18,
  },
  txtCate: {
    marginTop: 8,
  },
  btnBuy: {
    backgroundColor: colors.RED,
    padding: 20,
    borderRadius: 20,
  },
});
