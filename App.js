import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import Button from './src/components/Button';
import AppLoading from 'expo-app-loading';
import Texto from './src/components/Texto';

export default function App() {
  //carregando fonte externa
  const [fonteCarregada] = useFonts({
    "MontserratRegular": Montserrat_400Regular,
    "MontserratBold": Montserrat_700Bold
  });

  //se não carregou, mostra o loading
  if (!fonteCarregada) {
    return <AppLoading />;
  }
  
  //SafeAreaView para não ultrapassar o status bar
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Button onPress={() => null}>Iniciar</Button>
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
