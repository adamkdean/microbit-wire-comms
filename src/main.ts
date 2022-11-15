// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

const wireComms = new WireComms(DigitalPin.P13, DigitalPin.P15, DigitalPin.P14)
const serialNumber = control.deviceSerialNumber()

// Write start-up message to serial
serial.writeLine('')
serial.writeLine('+--------------------+')
serial.writeLine('|  WireComms v1.0.0  |')
serial.writeLine('+--------------------+')
serial.writeLine(`S/N: ${serialNumber}`)

// If not already initialized, initialize as master
const setMaster = () => {
  if (wireComms.getStatus() === Status.None) {
    wireComms.setMode(Mode.Master)
    wireComms.initialize()
  } else {
    music.playTone(262, music.beat(BeatFraction.Whole))
  }
}

// If not already initialized, initialize as slave
const setSlave = () => {
  if (wireComms.getStatus() === Status.None) {
    wireComms.setMode(Mode.Slave)
    wireComms.initialize()
  } else {
    music.playTone(262, music.beat(BeatFraction.Whole))
  }
}

// Auto-initialize if known boards are detected, otherwise wait for user input
if (serialNumber === 1375019273) {
  serial.writeLine('Master board detected, auto-initializing as master')
  setMaster()
} else if (serialNumber === 1290202077) {
  serial.writeLine('Slave board detected, auto-initializing as slave')
  setSlave()
} else {
  serial.writeLine('Unknown board detected, waiting for user input')
  basic.showString('...')
  input.onButtonPressed(Button.A, setMaster)
  input.onButtonPressed(Button.B, setSlave)
}
