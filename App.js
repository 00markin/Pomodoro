import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Dimensions, TextInput, Keyboard } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import Button from './src/components/Button';
import AppLoading from 'expo-app-loading';
import Texto from './src/components/Texto';
import Vibrate from './utils/Vibrate';

const screen = Dimensions.get("window");

// função para apresentar o tempo restante da forma 00:00
const formatNumber = number => `0${number}`.slice(-2);

const getRemainingTime = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function App() {
  // estados inciais para o timer
  const [remainingTime, setRemainingTime] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [newTime, setNewTime] = useState(0);
  const [type, setType] = useState('Work');
  const { mins, secs } = getRemainingTime(remainingTime);

  // função para iniciar o timer
  const toggle = () => {
    Vibrate();
    setIsActive(!isActive);
  }

  // função para zerar o timer
  const reset = () => {
    setRemainingTime(25);
    setIsActive(false);
  }

  //função para parar o timer
  const stop = () => {
    setIsActive(false);
    setRemainingTime(5);
  }


  // função para atualizar o tempo restante
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingTime(remainingTime => remainingTime - 1);
      }, 1000);
    } else if (!isActive && remainingTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingTime]);

  const keyboardHandler = () => {
    Keyboard.dismiss();
  }

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
      <View style={styles.timerContainer}>
        <Button onPress={() => {setRemainingTime(newTime * 60); keyboardHandler()}}> Minutos </Button>
        <Button onPress={() => {setRemainingTime(newTime); keyboardHandler()}}> Segundos </Button>
        <View style={styles.timePickerContainer}>
          <TextInput style={styles.input} keyboardType="number-pad" onChange={value => setNewTime(value)} />
        </View>
      </View>
      <Texto style={[styles.activity, { display: isActive ? 'flex' : 'none' }]}>{type}</Texto>
      <Texto style={styles.timer}>{`${mins}:${secs}`}</Texto>
      <View style={styles.buttonView}>
        <Button onPress={toggle} style={{ color: isActive ? "#FF0000" : "#00FF00" }}>{isActive ? 'Pausar' : 'Iniciar'}</Button>
        <Button onPress={reset}>Resetar</Button>
      </View>
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
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  timer: {
    color: '#f5af26',
    fontSize: 80,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
  },
  activity: {
    color: '#f5af26',
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
  },
  stopped: {
    color: '#FF0000',
  },
  running: {
    color: '#00FF00',
  },
  timePickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#f5af26",
    borderRadius: 10,
    borderWidth: 3,
    width: screen.width / 2,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    fontSize: 50,
    color: "#f5af26",
    backgroundColor: "#50285b",
    lineHeight: 60,
    textAlign: "center",
  },
});
