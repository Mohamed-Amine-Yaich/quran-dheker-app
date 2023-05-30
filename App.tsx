import React,{useState} from 'react';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import {View,ImageBackground,AsyncStorage,Text, ActivityIndicator} from 'react-native';
import {Provider,useDispatch} from 'react-redux';
import store from './src/store';
import { useFonts } from 'expo-font';
import QuranScreen from './src/screens/quran/';

import {Root } from 'native-base'; 
import {init} from './src/store/db.js';
import Navigation from './src/navigation/Navigation';
import DoaaScreen from './src/screens/Doaa';
import Stream from './src/screens/stream';
import MainStackComp from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
init()
  .then(() => {
   // console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
});

const Main =()=>{
  const dispatch = useDispatch();
  const [isReady,setIsReady] = useState(false);
  const getData = async ()=>{
   try{
    const theme = await AsyncStorage.getItem('theme');
    const font = await AsyncStorage.getItem('font');
    const resTheme=JSON.parse(theme);
    const resFont=JSON.parse(font);
    if(resTheme){
       dispatch({type:'SET_THEME',payload:resTheme});
    }
    if(resFont){
      dispatch({type:'SET_FONT',payload:resFont});
    }
    const s= await AsyncStorage.getItem('islamghanyModdakir');
    dispatch({type:'SET_AYAY_STOP',payload:JSON.parse(s)});
   }catch(err){
    console.log(err);
   }
   setIsReady(true)
  }
  React.useEffect(()=>{
      getData();
  },[]);
  if(!isReady){
    return <ActivityIndicator />
  }
  return <View style={{flex:1}}>
   <Navigation /> 
    </View>
}
export default function  App() {
 const [isReady,setIsReady] = useState(false);

  const fetchAssests=async ()=>{
       const images = [require('./src/assets/images/checkerboard-cross.png')];
      const fonts = [        
        {hfs:require('./src/assets/fonts/hfs.otf')},     
        {cairo:require('./src/assets/fonts/Cairo-Regular.ttf')},
        {amiri:require('./src/assets/fonts/Amiri-Regular.ttf')},
        {qlm:require('./src/assets/fonts/AlQalamQuran.ttf')},
        {kufy:require('./src/assets/fonts/ReemKufi-Regular.ttf')},
        {ar:require('./src/assets/fonts/ar-Quran1.ttf')},
        {tijwal:require('./src/assets/fonts/Tajawal-Regular.ttf')},

        ];
      const chachedImages=images.map(image=>Asset.fromModule(image).downloadAsync());
      const chachedFonts = fonts.map(font=>Font.loadAsync(font)); 
      
      return Promise.all([...chachedImages,...chachedFonts]);
  }
  fetchAssests().then((result) => {
    console.log(result);
    setIsReady(true)
  }); 

  console.log('isReady',isReady)
  if(!isReady){
    return <ActivityIndicator />
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
  
    <Provider store={store}>
        <NavigationContainer>
       <Root>
        <MainStackComp/>
{/*    <Main />  */}
       
{/*  <DoaaScreen />  */}
{/*  <QuranScreen/>  */}
{/* <Stream /> */}
       </Root>
       </NavigationContainer>
    </Provider> 
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


