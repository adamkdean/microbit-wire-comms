// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

enum Mode { Master, Slave }
enum Status { None, Ready, Busy, Error }

const p13eventSourceId = control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P13)
const pinEventRise = control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE)
const pinEventPulseHi = control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_PULSE_HI)

class WireComms {
  private sclk: DigitalPin
  private mosi: DigitalPin
  private miso: DigitalPin
  private mode: Mode
  private status: Status
  private clockSpeed: number = 1 // Hz

  constructor(sclk: DigitalPin, mosi: DigitalPin, miso: DigitalPin) {
    this.sclk = sclk
    this.mosi = mosi
    this.miso = miso
    this.status = Status.None
  }

  public getStatus(): Status {
    return this.status
  }

  public getMode(): Mode {
    return this.mode
  }

  public setMode(mode: Mode): void {
    if (this.status !== Status.None) return this.throwError('Cannot set mode once initialized')
    this.mode = mode
  }

  public initialize() {
    if (this.status !== Status.None) return this.throwError('Already initialized')
    if (this.mode === undefined) return this.throwError('WireComms: Mode not set')

    if (this.mode === Mode.Master) {
      this.log('Master mode enabled')
      basic.showString('M')
      this.initializeSerialClock()
    }

    if (this.mode === Mode.Slave) {
      this.log('Slave mode enabled')
      basic.showString('S')
      this.initializeSlaveListen()
    }

    // Debug
    serial.writeLine(`MOSI: ${this.mosi}`)
    serial.writeLine(`MISO: ${this.miso}`)
    serial.writeLine(`SCLK: ${this.sclk}`)

    this.status = Status.Ready
    this.log('Ready')
  }

  private initializeSerialClock(): void {
    const interval = (1000 / this.clockSpeed) - 1
    serial.writeLine(`Serial clock initialised @ ${interval} ms (${this.clockSpeed} Hz)`)
    loops.everyInterval(interval, () => {
      pins.digitalWritePin(this.sclk, 1)
      basic.pause(1)
      pins.digitalWritePin(this.sclk, 0)
    })
  }

  private initializeSlaveListen(): void {
    const pinRiseEvent = control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE)
    const sourceEventId = control.eventSourceId(EventBusSourceLookup[this.sclk])
    control.onEvent(sourceEventId, pinRiseEvent, () => this.onSclkRise())
    pins.setEvents(this.sclk, PinEventType.Edge)
    this.log('Slave listening for clock')
  }

  private onSclkRise(): void {
    this.log('SCLK rise')
  }

  private log(msg: string): void {
    serial.writeLine(`WireComms: ${msg}`)
  }

  private throwError(msg: string): void {
    this.status = Status.Error
    basic.showString('E')
    this.log(`Error: ${msg}`)
  }
}
