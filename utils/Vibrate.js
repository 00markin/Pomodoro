import { Vibration } from 'react-native'

export default function Vibrate() {
    Vibration.vibrate([500, 500, 500])
}