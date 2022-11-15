// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

enum Mode { Master, Slave }
enum Status { None, Ready, Busy, Error }

class WireComms {
  private sclk: DigitalPin
  private mosi: DigitalPin
  private miso: DigitalPin
  private mode: Mode
  private status: Status
  private clockSpeed: number = 16 // Hz
  private buffer: boolean[] = []

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

    this.log(`Initializing with pins SCLK: ${this.sclk}, MOSI: ${this.mosi}, MISO: ${this.miso}`)

    if (this.mode === Mode.Master) {
      this.log('Master mode enabled')
      basic.showString('M')
      this.initializeMaster()
    }

    if (this.mode === Mode.Slave) {
      this.log('Slave mode enabled')
      basic.showString('S')
      this.initializeSlave()
    }

    this.status = Status.Ready
    this.log('Ready')
  }

  private initializeMaster(): void {
    this.initializeSerialClock()

    input.onButtonPressed(Button.A, () => {
      this.sendByte(0x55)
    })
  }

  private initializeSlave(): void {
    const pinRiseEvent = control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE)
    const sourceEventId = control.eventSourceId(EventBusSourceLookup[this.sclk])
    control.onEvent(sourceEventId, pinRiseEvent, () => this.onSclkRecv())
    pins.setEvents(this.sclk, PinEventType.Edge)
    this.log('Slave listening for clock')
  }

  private initializeSerialClock(): void {
    const interval = (1000 / this.clockSpeed) - 1
    serial.writeLine(`Serial clock initialised @ ${interval} ms (${this.clockSpeed} Hz)`)
    loops.everyInterval(interval, () => this.onSclkSend())
  }

  private onSclkSend(): void {
    // Only enable clock if we have data to send
    if (this.buffer.length === 0) return

    const bit = this.buffer.shift()
    this.log(`Sending bit: ${bit ? 1 : 0}`)

    // Set SCLK high
    pins.digitalWritePin(this.sclk, 1)
    if (bit) pins.digitalWritePin(this.mosi, 1)
    else pins.digitalWritePin(this.mosi, 0)

    // Wait, then reset SCLK & MOSI
    basic.pause(1)
    pins.digitalWritePin(this.sclk, 0)
    pins.digitalWritePin(this.mosi, 0)
  }

  private onSclkRecv(): void {
    // TODO: more
    const bit = pins.digitalReadPin(this.mosi)
    this.log(`Received bit: ${bit}`)
    music.playTone(200, 1)
  }

  private sendByte(byte: number): void {
    const bits = []
    for (let i = 0; i < 8; i++) {
      const bit = (byte >> i) & 1
      this.buffer.push(bit === 1)
      bits.push(bit)
    }
    this.log(`Byte queued ${byte} [${bits.join(',')}]`)
  }

  private log(msg: string): void {
    serial.writeLine(msg)
  }

  private throwError(msg: string): void {
    this.status = Status.Error
    basic.showString('E')
    this.log(`Error: ${msg}`)
  }
}
