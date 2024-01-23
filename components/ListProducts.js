import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";

const ListProducts = (props) => {
  const [products, setproducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setkeyword] = useState("");

  var api_url = "http://10.24.23.123:3000/api/products";
  var api_url_search = "http://10.24.23.123:3000/api/products/search";

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        setproducts(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        setproducts(data.data);
        setkeyword("");
      })
      .catch((err) => console.error(err));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const doSearch = (req, res, next) => {
    fetch(api_url_search + "?keyword=" + keyword)
      .then((res) => res.json())
      .then((data) => setproducts(data.data))
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          placeholder="Nhập tên sản phẩm"
          onChangeText={(text) => setkeyword(text)}
          value={keyword}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.btnSearch} onPress={doSearch}>
          <Text style={{ color: "white" }}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item._id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.containerItem}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
              <View>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    marginLeft: 10,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 15,
                    marginLeft: 10,
                    color: "red",
                    marginTop: 10,
                  }}
                >
                  {item.price} ₫
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  props.navigation.navigate("DetailProduct", {
                    idSp: item._id,
                  });
                }}
              >
                <Text style={{ color: colors.BLUE1, fontStyle: "italic" }}>
                  Xem chi tiết
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ListProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 0,
  },
  containerItem: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  textInput: {
    borderColor: colors.GREY,
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    flex: 1,
  },
  btnSearch: {
    backgroundColor: colors.BLUE1,
    padding: 16,
    borderRadius: 10,
    marginLeft: 15,
  },
});
