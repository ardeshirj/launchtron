# Launchtron

Playing around with electron and Launchpad Novation

## To run
``` shel
npm install
npm run 1s
```

## Midi Message
The format for launchpad midi message is:

`[note-type(on/off), key(0xRowCol), velocity(color)]`

- note-type(on/off)
  - Off: 0x80 = 10000000
  - On:  0x90 = 10010000


- key(0xColRow)
  - Row: 0-7
  - Col: 0-8 (Including circle keys)


- Velocity format: 00XXYYZZ]
  - XX: Green brightness
  - YY: Copy/Clear bits
  - ZZ: Red brightness

For example [0x90, 0x70, 0x3C] is a message to
- turn on (0x90)
- the first column and last row key (0x70)
- full brightness in green (00111100 = 0x3C)

### LED Flashing
One of the ways to make the LEDs flash:
- Enable flashing mode in launchpad by sending `[0xB0, 0x00, 0x28]` message
- Set `clear` and unset `copy` bits in velocity

Note:
You can disable the flashing mode by sending `[0xB0, 0x00, 0x20]` message
