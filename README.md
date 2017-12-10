# Reactron

Playing around with Electron + ReactiveX+ Launchpad Novation

## Getting Started
``` shel
yarn install
yarn start
```

## Midi Message
The format for launchpad midi message is:

`[note-type(on/off), key(0xRowCol), velocity(color)]`

- note-type(on/off)
  - Off: 0x80 = 128 (NOTE: Velocity byte will be ignored)
  - On:  0x90 = 144

- key(0xColRow)
  - Row: 0-7
  - Col: 0-8 (Including circle keys)

- Velocity format: 00XXY2Y1ZZ]
  - XX:   Green brightness bits
  - Y2Y1: Copy(Y1) & Clear(Y2) bits
  - ZZ:   Red brightness bits

NOTE: Input messages will send velocity as
  - 0x7F = 127 when button is pressed
  - 0x00 = 0   when button is released

For example [0x90, 0x70, 0x3C] is a message to
- turn on (0x90)
- the first column and last row key (0x70)
- full brightness in green (00111100 = 0x3C)

### LED Flashing
One of the ways to make the LEDs flash:
- Enable flashing mode in launchpad by sending `[0xB0, 0x00, 0x28]` message
- Unset `copy` and set `clear` bits in velocity

Example: [0x90, 0x70, **0x0B**] where 0x0B = 0000**10**11

You can disable the flashing mode by sending `[0xB0, 0x00, 0x20]` message
