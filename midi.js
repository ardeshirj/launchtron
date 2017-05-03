const Rx = require('rxjs/Rx');

const portIds = [];

const stream = Rx.Observable
  .fromPromise(navigator.requestMIDIAccess())
  .map(midi => midi.inputs)
  .map(inputs => {
    inputs.forEach(input => portIds.push(input.id));
    // For launchpad mini we only intreseted on first port
    return inputs.get(portIds[0]);
  })
  .flatMap(input => Rx.Observable.fromEvent(input, 'midimessage'))
  .map(messageEvent => messageEvent.data);
