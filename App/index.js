import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { AppLoading } from 'expo-app-loading';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Button from '../src/components/Button';
import Texto from '../src/components/Text';

export default function App() {
  //carregando fonte externa
  let [fontsLoaded] = useFonts({
    "RobotoRegular": Roboto_400Regular,
    "RobotoBold": Roboto_700Bold,
  });

  //se não carregou, mostra o loading
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  //SafeAreaView para não ultrapassar o status bar
  return (
    <SafeAreaView style={[{flex:1}, styles.container]}>
      <StatusBar style="light" />
      <Button onPress={() => null}>
        <Texto>Iniciar</Texto>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#50285b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
