import React, {useState, useEffect, useRef} from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {FontAwesome} from '@expo/vector-icons'

export default function App() {
  const camRef = useRef(null)
  const [type, setType] = useState(Camera.Constants.Type.back) //CameraType.back
  const [hasPermission, setHasPermission] = useState(null)
  const [capturedPhoto, setCapturedPhoto] = useState(null)

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

 async function takePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync()
      setCapturedPhoto(data.uri)
    }
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
        <View style={styles.viewBtCamera}>
          <TouchableOpacity onPress={() =>{

            }}
          >
            <FontAwesome name="camera" size={30} color="white"/>
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
    justifyContent: 'center'
  },
  camera:{
    width: "100%",
    height: "100%"
  },
  viewBtFlip:{
    position: "absolute",
    bottom: 60,
    left: 60,
    backgroundColor: "#FFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'center',
  },
  viewBtCamera:{
    position: "absolute",
    bottom: 60,
    right: 60,
    backgroundColor: "#F00",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'center',
  },
});
