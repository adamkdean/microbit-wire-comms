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
  private clockSpeed: number = 8 // Hz

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
    }

    if (this.mode === Mode.Slave) {
      this.log('Slave mode enabled')
      basic.showString('S')
    }

    this.status = Status.Ready
    this.log('Ready')
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
