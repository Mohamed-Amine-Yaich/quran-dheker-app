/* import {AppLoading} from 'expo'; */
/* import * as Font from 'expo-font';
import {Asset} from 'expo-asset'; */

/* import { useFonts } from 'expo-font';
import QuranScreen from './src/screens/quran/'; */

/* import {init} from './src/store/db.js'; */
/* import DoaaScreen from './src/screens/Doaa';
import Stream from './src/screens/stream'; */
import React, {useState} from 'react';
import {View, ImageBackground, Text, ActivityIndicator} from 'react-native';
import Navigation from './src/navigation/Navigation';

import MainStackComp from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeBaseProvider, Box} from 'native-base';
import {Provider, useDispatch} from 'react-redux';
import store from './src/store';

const Main = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const getData = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      const font = await AsyncStorage.getItem('font');
      let resTheme;
      let resFont;
      if (theme) resTheme = JSON.parse(theme);
      if (font) resFont = JSON.parse(font);
      if (resTheme) {
        dispatch({type: 'SET_THEME', payload: resTheme});
      }
      if (resFont) {
        dispatch({type: 'SET_FONT', payload: resFont});
      }
      const s = await AsyncStorage.getItem('islamghanyModdakir');

      if (s) dispatch({type: 'SET_AYAY_STOP', payload: JSON.parse(s)});
    } catch (err) {
      console.log(err);
    }
    setIsReady(true);
  };
  React.useEffect(() => {
    getData();
  }, []);
  if (!isReady) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{flex: 1}}>
      <Navigation />
    </View>
  );
};
export default function App() {
  const [isReady, setIsReady] = useState(false);

  const fetchAssests = async () => {
    const images = [require('./src/assets/images/checkerboard-cross.png')];
    const fonts = [
      {hfs: require('./src/assets/fonts/hfs.otf')},
      {cairo: require('./src/assets/fonts/Cairo-Regular.ttf')},
      {amiri: require('./src/assets/fonts/Amiri-Regular.ttf')},
      {qlm: require('./src/assets/fonts/AlQalamQuran.ttf')},
      {kufy: require('./src/assets/fonts/ReemKufi-Regular.ttf')},
      {ar: require('./src/assets/fonts/ar-Quran1.ttf')},
      {tijwal: require('./src/assets/fonts/Tajawal-Regular.ttf')},
    ];
    /*   const chachedImages = images.map(image =>
      Asset.fromModule(image).downloadAsync(),
    );
    const chachedFonts = fonts.map(font => Font.loadAsync(font)); 

    return Promise.all([...chachedImages, ...chachedFonts]);*/
    return [images, fonts];
  };
  fetchAssests().then(result => {
    console.log(result);
    setIsReady(true);
  });

  console.log('isReady', isReady);
  if (!isReady) {
    return <ActivityIndicator />;
  }
  /*  if(!isReady){
    return <AppLoading 
            startAsync={fetchAssests}
             onFinish={() =>{ 
              setIsReady(true)}}
             onError={console.warn}
             />
  }   */

  return (
    <NativeBaseProvider>
      <Box>
        <Provider store={store}>         
            <Main />      
        </Provider>
      </Box>
    </NativeBaseProvider>
  );
  // return <View style={{
  //   backgroundColor:'red',
  //   justifyContent:'center',
  //   alignItems:'center'
  // }}>
  // <Text>
  //   Please Work!!!
  // </Text>
  // </View>
}
