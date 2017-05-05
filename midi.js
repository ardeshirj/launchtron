const Rx = require('rxjs/Rx');

const midi = Rx.Observable
  .fromPromise(navigator.requestMIDIAccess())
  .catch(error => console.log(error));

const state = midi
  .flatMap(midi => Rx.Observable.fromEvent(midi, 'statechange'))

const input = midi
  .map(midi => midi.inputs)
  .map(inputs => {
    const portIds = [];
    inputs.forEach(input => portIds.push(input.id));
    // For launchpad mini we only intreseted on first port
    return inputs.get(portIds[0]);
  })
  .flatMap(input => Rx.Observable.fromEvent(input, 'midimessage'))
  .map(messageEvent => messageEvent.data);
