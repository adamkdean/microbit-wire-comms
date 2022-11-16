// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

enum Mode { Master, Slave }
enum Status { None, Ready, Busy, Error }

const message = `This is a long message. It uses at most 125 bytes, which is the maximum length of a message due BBC MB to memory constraints.`

class WireComms {
  private sclk: DigitalPin
  private mosi: DigitalPin
  private miso: DigitalPin
  private mode: Mode
  private status: Status
  private clockSpeed: number = 8 // Hz

  // Writing buffers
  private writeBitBuffer: number[] = []

  // Reading buffers
  private readBitBuffer: number[] = []
  private readByteBuffer: number[] = []
  // private readStreamSynchronized: boolean = false
  private readTransmissionActive: boolean = false

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
      this.sendString('TEST')
    })

    input.onButtonPressed(Button.B, () => {
      this.sendString(message)
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
    const bit = this.writeBitBuffer.shift()

    // Set SCLK high
    pins.digitalWritePin(this.sclk, 1)

    // Set MOSI to bit value (if defined)
    if (bit !== undefined) {
      if (bit) pins.digitalWritePin(this.mosi, 1)
      // this.log(`TX: ${bit ? 1 : 0}`)
      // music.playTone(800, 5)
    }

    // Wait, then reset SCLK & MOSI
    basic.pause(1)
    pins.digitalWritePin(this.sclk, 0)
    pins.digitalWritePin(this.mosi, 0)
  }

  private onSclkRecv(): void {
    const bit = pins.digitalReadPin(this.mosi)
    this.readBitBuffer.push(bit)

    // If transmission isn't active, check for start of transmission
    if (!this.readTransmissionActive && this.readBitBuffer.length === 8) {
      const byte = this.getByteFromBuffer(this.readBitBuffer)
      if (byte === AsciiControlCodes.START_OF_TEXT) {
        this.log('Transmission started')
        this.readTransmissionActive = true
        this.readByteBuffer = []
        this.readBitBuffer = []
        music.playTone(400, 10)
      } else {
        // Otherwise, shift a bit from the buffer to make space for the next bit
        // until eventually, the START_OF_TEXT byte is received
        this.readBitBuffer.shift()
      }
    }

    // If transmission is active and we have a full byte, process it
    else if (this.readTransmissionActive) {
      if (this.readBitBuffer.length === 8) {
        const byte = this.getByteFromBuffer(this.readBitBuffer)
        this.onByteReceived(byte)
        this.readBitBuffer = []
      } else {
        music.playTone(50, 5)
      }
    }
  }

  private onByteReceived(byte: number): void {
    this.log(`Byte received: ${byte}`)

    if (this.readTransmissionActive) {
      if (byte === AsciiControlCodes.END_OF_TEXT) {
        const str = this.readByteBuffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '')
        this.readTransmissionActive = false
        this.readByteBuffer = []
        this.log(`> ${str} (${str.length} bytes)`)
        this.log('Transmission ended')
        music.playTone(200, 10)
      } else {
        this.readByteBuffer.push(byte)
        music.playTone(300, 5)
      }
    }
  }

  private getByteFromBuffer(buffer: number[]): number {
    return buffer.reduce((acc, bit, i) => acc + (bit << i), 0)
  }

  private sendString(str: string): void {
    if (str.length * 8 > 1000) return this.throwError('String too long')

    this.sendByte(AsciiControlCodes.START_OF_TEXT)
    for (let i = 0; i < str.length; i++) {
      this.sendByte(str.charCodeAt(i))
    }
    this.sendByte(AsciiControlCodes.END_OF_TEXT)
  }

  private sendByte(byte: number): void {
    const bits = []
    for (let i = 0; i < 8; i++) {
      const bit = (byte >> i) & 1
      this.writeBitBuffer.push(bit)
      bits.push(bit)
    }
    this.log(`Byte queued ${byte} ${String.fromCharCode(byte)} ${bits.join('')}`)
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
