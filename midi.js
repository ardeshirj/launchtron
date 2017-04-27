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

  // subject.forEach(x => console.log(x));
}

function onMIDIFailure(error) {
  console.log('Midi Failed', error);
}
