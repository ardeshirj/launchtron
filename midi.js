const Rx = require('rxjs/Rx');

let midi = null;

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  console.log('MIDI ready!', midiAccess);
  midi = midiAccess;

  const subject = new Rx.Subject();
  midi.inputs.forEach(input => {
    input.onmidimessage = (event) => {
      // console.log(event);
      subject.next(event.data);
    }
  });

  subject.forEach(input => {
    midi.outputs.forEach(output => {
      // console.log(input, output);
      // Launchpad 3 index in data is presenting press/relaese
      // via decimal numbers (127 for on & 0 for off)
      // Set color zero on release...
      if (input[2] === 0) {
        output.send([input[0], input[1], 0x00]);
      } else {
        output.send([input[0], input[1], 0x3C]);
      }
    });
  });
}

function onMIDIFailure(error) {
  console.log('Midi Failed', error);
}
