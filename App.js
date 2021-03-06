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
  const [newTime, setNewTime] = useState(25);
  const [type, setType] = useState('Work');
  // const [startSound, setStartSound] = useState();
  // const [stopSound, setStopSound] = useState();
  const { mins, secs } = getRemainingTime(remainingTime);

  // async function playStartSound() {
  //   const { startFx } = await Audio.Sound.createAsync(
  //     require('./assets/StartFx.mp3')
  //   );
  //   setStartSound(startFx);
  //   await startFx.playAsync();
  // }

  // async function playStopSound() {
  //   const { stopFx } = await Audio.Sound.createAsync(
  //     require('./assets/StopFx.mp3')
  //   );
  //   setStopSound(stopFx);
  //   await stopFx.playAsync();
  // }

  // função para iniciar o timer
  const toggle = () => {
    Vibrate();
    setIsActive(!isActive);
  }

  // função para zerar o timer
  const reset = () => {
    setRemainingTime(25);
    setIsActive(false);
    setType('Work');
  }

  // função para mudar o tipo do timer
  // async function switchBetweenWorkAndRelax() {
  function switchBetweenWorkAndRelax() {
    if (type === 'Work') {
      // await playStopSound();
      Vibrate();
      setType('Relax');
      setRemainingTime(parseInt(newTime/5));
      // await playStartSound();
    } else {
      // await playStopSound();
      Vibrate();
      setType('Work');
      setRemainingTime(newTime);
      // await playStartSound();
    }
  }

  // Hook para atualizar o tempo restante
  useEffect(() => {
    if (remainingTime === 0) {
      switchBetweenWorkAndRelax();
    }
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (remainingTime <= 0) {
          clearInterval(interval);
          switchBetweenWorkAndRelax();
          return;
        }
        setRemainingTime((remainingTime) => remainingTime - 1);
      }, 1000);
    } else if (!isActive && remainingTime >= 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingTime]);

  const keyboardHandler = () => {
    Keyboard.dismiss();
  }

  // //useEffect para o som de começo das atividades
  // useEffect(() => {
  //   return startSound
  //     ? () => {
  //       startSound.unloadAsync();
  //     }
  //     : undefined;
  // }, [startSound]);

  // //useEffect para o som de fim das atividades
  // useEffect(() => {
  //   return stopSound
  //     ? () => {
  //       stopSound.unloadAsync();
  //     }
  //     : undefined;
  // }, [stopSound]);

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
      <View style={{ display: isActive ? 'none' : 'flex', alignItems: "center" }}>
        <View style={styles.buttonView}>
          <Button onPress={() => { setRemainingTime(newTime * 60); keyboardHandler() }}>Mins</Button>
          <Button onPress={() => { setRemainingTime(newTime); keyboardHandler() }}>Secs</Button>
        </View>
        <View style={styles.timePickerContainer}>
          <TextInput style={styles.input} keyboardType="number-pad" onChangeText={value => setNewTime(parseInt(value))} />
        </View>
      </View>
      <Texto style={[styles.activity, { display: isActive ? 'flex' : 'none' }]}>{type}</Texto>
      <Texto style={styles.timer}>{`${mins}:${secs}`}</Texto>
      <View style={styles.buttonView}>
        <Button onPress={() => { toggle(); {/* isActive ? playStartSound() : playStopSound() */} }} style={{ color: isActive ? "#FF0000" : "#00FF00" }}>{isActive ? 'Pause' : 'Start'}</Button>
        <Button onPress={() => { reset(); {/* playStopSound() */}}}>Reset</Button>
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
    marginTop: 30,
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
