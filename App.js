import React, {useState, useEffect} from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {FontAwesome} from '@expo/vector-icons'

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back) //CameraType.back
  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync() //const [permission, requestPermission] = Camera.useCameraPermissions()
      setHasPermission(status === "granted")
    })()
  }, [])

  if(hasPermission === null){ //!permission
    return <View/>
  }

  if(hasPermission === false){ //!permission.granted
    <Text>Camera - Acesso Negado!</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera type={type} style={styles.camera}> 
        <View style={styles.viewBtFlip}>  
            <TouchableOpacity onPress={() => {
                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
              }}
            >
              <FontAwesome name="exchange" size={30} color="red"/>
            </TouchableOpacity> 
          </View>
      </Camera>  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "orange"
  },
  camera:{
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  viewBtFlip:{
    position: "absolute",
    bottom: 60,
    left: 60,
    backgroundColor: "#FFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: 'center',
  },
});
