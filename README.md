# Launchtron

Playing around with electron and Launchpad Novation

## To run
``` shel
npm install
npm run 1s
```

## Midi Message
The format for launchpad midi message is:

`[note-type(on/off), key(0xColRow), velocity(color)]`

- note-type(on/off)
  - Off: 0x80 = 10000000
  - On:  0x90 = 10010000


- key(0xColRow)
  - Col: 0-7
  - Row: 0-8 (Including circle keys)


- Velocity format: 00XXYYZZ]
  - XX: Green brightness
  - YY: Copy/Clear bits
  - ZZ: Red brightness
