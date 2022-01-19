import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Dimensions, TextInput, Keyboard } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import Button from './src/components/Button';
import AppLoading from 'expo-app-loading';
import Texto from './src/components/Texto';
import Vibrate from './utils/Vibrate';
import { Audio } from 'expo-av';

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
  const [newTime, setNewTime] = useState(1);
  const [type, setType] = useState('Work');
  const [startSound, setStartSound] = useState();
  const [stopSound, setStopSound] = useState();
  const { mins, secs } = getRemainingTime(remainingTime);

  async function playStartSound() {
    const { startFx } = await Audio.Sound.createAsync(
      require('./assets/StartFx.mp3')
    );
    setStartSound(startFx);
    await startFx.playAsync();
  }

  async function playStopSound() {
    const { stopFx } = await Audio.Sound.createAsync(
      require('./assets/StopFx.mp3')
    );
    setStopSound(stopFx);
    await stopFx.playAsync();
  }

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
    setRemainingTime(0);
    playStopSound();
  }

  // função para atualizar o tempo restante
  // pare o timer quando o tempo chegar em 0
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingTime(remainingTime => remainingTime - 1);
      }, 1000);
    } else if (!isActive && remainingTime !== 0) {
      clearInterval(interval);
    } else if (!isActive && remainingTime === 0) {
      stop();
    }
    return () => clearInterval(interval);
  }, [isActive, remainingTime]);

  const keyboardHandler = () => {
    Keyboard.dismiss();
  }

  //useEffect para o som de começo das atividades
  useEffect(() => {
    return startSound
      ? () => {
        startSound.unloadAsync();
      }
      : undefined;
  }, [startSound]);

  //useEffect para o som de fim das atividades
  useEffect(() => {
    return stopSound
      ? () => {
        stopSound.unloadAsync();
      }
      : undefined;
  }, [stopSound]);

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
      <View style={{ display: isActive ? 'none' : 'flex' }}>
        <View style={styles.buttonView}>
          <Button onPress={() => { setRemainingTime(parseInt(newTime) * 60); keyboardHandler() }}> Minutos </Button>
          <Button onPress={() => { setRemainingTime(parseInt(newTime)); keyboardHandler() }}> Segundos </Button>
        </View>
        <View style={styles.timePickerContainer}>
          <TextInput style={styles.input} keyboardType="number-pad" onChange={value => setNewTime(value)} />
        </View>
      </View>
      <Texto style={[styles.activity, { display: isActive ? 'flex' : 'none' }]}>{type}</Texto>
      <Texto style={styles.timer}>{`${mins}:${secs}`}</Texto>
      <View style={styles.buttonView}>
        <Button onPress={() => { toggle(); isActive ? playStartSound() : playStopSound() }} style={{ color: isActive ? "#FF0000" : "#00FF00" }}>{isActive ? 'Pausar' : 'Iniciar'}</Button>
        <Button onPress={() => { reset(); playStopSound() }}>Resetar</Button>
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
    margin: 10,
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
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});
