# microbit-wire-comms

Experimental wire-based comms

Note: this repo is a WIP.

## Protocol

Protocol v1:
- start of text (0x02)
- content
- end of text (0x03)

+------+---------+------+
| 0x02 | content | 0x03 |
+------+---------+------+

<!-- Protocol v2:
- start of heading (0x01)
- content length
- start of text (0x02)
- content
- end of text (0x03)
- end of transmission (0x04)

+------+----------------+------+---------+------+------+
| 0x01 | content_length | 0x02 | content | 0x03 | 0x04 |
+------+----------------+------+---------+------+------+ -->

## Hardware

The BBC Micro:bit v2 has a Nordic nRF52833 Core variant	Arm Cortex-M4 32 bit processor with FPU at 64 MHz.

![Microbit v2](https://user-images.githubusercontent.com/1639527/201537450-9c39dbdb-c4e4-4cca-a10d-828d2061f5e1.png)

## Useful resources

[enums.d.ts](https://github.com/microsoft/pxt-microbit/blob/master/libs/core/enums.d.ts)

## Disclaimer

If you electrocute yourself, that's your own fault.
