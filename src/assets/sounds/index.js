import {Howl} from 'howler'
import correctSoundEffect from './audioblocks-shine-collect-grab-pick-up-item-8_SYwznyMU0P8_NWM.mp3'
import errorSoundEffect from './audioblocks-access-denied-4_Ht3MQlzLAP8_NWM.mp3'
import keyStrokeSound from './Mechanical-Keyboard-single-button-presses-1-www.FesliyanStudios.com.mp3'
import gameOverSoundEffect from './audioblocks-fail-error-mistake-out-of-time-sound-3_HtAZ4Jf8CD8_NWM.mp3'

export const errorSound = new Howl({
    src:[errorSoundEffect]
})

export const correctSound = new Howl({
    src:[correctSoundEffect]
})

export const sound = new Howl({
    src:[
        keyStrokeSound
    ]
})

export const gameOverSound = new Howl({
    src:[gameOverSoundEffect]
})