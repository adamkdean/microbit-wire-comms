// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

const wireComms = new WireComms(DigitalPin.P13, DigitalPin.P15, DigitalPin.P14)

// Write start-up message to serial
serial.writeLine('')
serial.writeLine('+--------------------+')
serial.writeLine('|  WireComms v1.0.0  |')
serial.writeLine('+--------------------+')

// On start, show a waiting ellipsis
led.plot(1, 2)
led.plot(2, 2)
led.plot(3, 2)

// On A: If not already initialized, initialize as master
input.onButtonPressed(Button.A, () => {
  if (wireComms.getStatus() === Status.None) {
    wireComms.setMode(Mode.Master)
    wireComms.initialize()
  } else {
    music.playTone(262, music.beat(BeatFraction.Whole))
  }
})

// On B: If not already initialized, initialize as slave
input.onButtonPressed(Button.B, () => {
  if (wireComms.getStatus() === Status.None) {
    wireComms.setMode(Mode.Slave)
    wireComms.initialize()
  } else {
    music.playTone(262, music.beat(BeatFraction.Whole))
  }
})
