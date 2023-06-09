import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  TextInput,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { bleuPalette } from "../colors";
import MapList from "../Components/MapList";
import fetchJsonp from "fetch-jsonp";
import { getAllHadith, getAllHadithInfo } from "../utils/fetchDorarAPI";
export default function HomeScreen({ route }) {
  const font = route.params.font;
  const [skey, setSkey] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  function fetchDorarAPI(skey) {
    
   function reverseString(str) {
      return str.split('').reduce((reversedString, char) => char + reversedString, '');
    }
    const arabicText=reverseString(skey)
    
const encodedArabicText = encodeURIComponent(arabicText);
console.log(encodedArabicText)
    const APIURI2 = `https://dorar.net/dorar_api.json?skey=${encodedArabicText}&callback=?`;
    console.log(APIURI2)
    setIsLoading(true);
    fetch(APIURI2)
      .then((response) => {
        console.log('res',response)
        console.log('ressss',JSON.parse(response))
        return response.json();
      })
      .then((json) => {
        /* const allHadith = getAllHadith(json.ahadith.result);
        const allHadithInfo = getAllHadithInfo(json.ahadith.result);
        const result = allHadith.map((hadith, index) => {
          return {
            ...hadith,
            ...allHadithInfo[index],
          };
        });
        setData(result); */
        console.log(json)
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }
  console.log(data);
  console.log(skey);
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, font.ExtraBold]}>الباحث في الحديث</Text>
      <Text style={[styles.subHeaderText, font.Light]}>
        يمكنك البرنامج من البحث عن الأحاديث النبوية والتحقق من صحتها إنطلاقا من
        كلمة أو جملة من الحديث
      </Text>
      <View style={styles.serachBarContainer}>
        <TextInput
          value={skey}
          onChangeText={setSkey}
          placeholder="البحث"
          style={[styles.searchInput, font.Light]}
          autoFocus
        />
        <Pressable
          style={({ pressed }) => [
            styles.searchIconOuter,
            { backgroundColor: pressed ? "black" : null },
          ]}
          onPress={() => fetchDorarAPI(skey)}
          disabled={isLoading}
        >
          <Ionicons
            name="search"
            size={20}
            color="black"
            style={styles.searchIcon}
          />
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={bleuPalette.bleu50}
            style={{ margin: 10, padding: 10 }}
          />
        ) : error || !data ? (
          <Text>{error}</Text>
        ) : data.length > 0 ? (
          <MapList data={data} />
        ) : !data ? (
          <Text>{"..."}</Text>
        ) : null}
      </View>
    </View>
  );
}
import { ScaledSheet } from "react-native-size-matters";
import Helmet from "react-helmet";
export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: "10@s",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  serachBarContainer: {
    maxWidth: 800,
    flexDirection: "row",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#bbb",
  },
  searchInput: {
    flex: 1,
    textAlign: "right",
    padding: 10,
    fontSize: "12@s",
    height: "40@s",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchIconOuter: {
    padding: 10,
  },
  searchIcon: {
    flex: 1,
    height: "40@s",
  },
  headerText: {
    fontSize: "20@s",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: "auto",
    margin: 5,
  },
  subHeaderText: {
    fontSize: "12@s",
    padding: 5,
    marginBottom: "20@s",
    textAlign: "center",
    color: "#888",
    marginHorizontal: "auto",
  },
});
