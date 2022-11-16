// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

// ASCII control codes
// See: https://en.wikipedia.org/wiki/C0_and_C1_control_codes

enum AsciiControlCodes {
  NULL = 0x00,
  START_OF_HEADING = 0x01,
  START_OF_TEXT = 0x02,
  END_OF_TEXT = 0x03,
  END_OF_TRANSMISSION = 0x04,
  ENQUIRY = 0x05,
  ACKNOWLEDGE = 0x06,
  BELL = 0x07,
  BACKSPACE = 0x08,
  HORIZONTAL_TABULATION = 0x09,
  LINE_FEED = 0x0A,
  VERTICAL_TABULATION = 0x0B,
  FORM_FEED = 0x0C,
  CARRIAGE_RETURN = 0x0D,
  SHIFT_OUT = 0x0E,
  SHIFT_IN = 0x0F,
  DATA_LINK_ESCAPE = 0x10,
  DEVICE_CONTROL_ONE = 0x11,
  DEVICE_CONTROL_TWO = 0x12,
  DEVICE_CONTROL_THREE = 0x13,
  DEVICE_CONTROL_FOUR = 0x14,
  NEGATIVE_ACKNOWLEDGE = 0x15,
  SYNCHRONOUS_IDLE = 0x16,
  END_OF_TRANSMISSION_BLOCK = 0x17,
  CANCEL = 0x18,
  END_OF_MEDIUM = 0x19,
  SUBSTITUTE = 0x1A,
  ESCAPE = 0x1B,
  FILE_SEPARATOR = 0x1C,
  GROUP_SEPARATOR = 0x1D,
  RECORD_SEPARATOR = 0x1E,
  UNIT_SEPARATOR = 0x1F,
  DELETE = 0x7F
}
