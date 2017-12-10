const Rx = require('rxjs/Rx');

const midiObs = Rx.Observable
  .fromPromise(navigator.requestMIDIAccess())
  .catch(error => console.log(error));

const stateObs = midiObs
  .flatMap(midi => Rx.Observable.fromEvent(midi, 'statechange'));

const inputObs = midiObs
  .map(midi => midi.inputs)
  .map(inputs => {
    const portIds = [];
    inputs.forEach(input => portIds.push(input.id));
    // For launchpad mini we only intreseted on first port
    return inputs.get(portIds[0]);
  })
  .flatMap(input => Rx.Observable.fromEvent(input, 'midimessage'))
  .map(messageEvent => messageEvent.data);

const outputObs = midiObs
  .map(midi => midi.outputs)
  .map(outputs => {
    const portIds = [];
    outputs.forEach(output => portIds.push(output.id));
    // For launchpad mini we only intreseted on first port
    return outputs.get(portIds[0]);
  });

const outputSub = inputObs
  .combineLatest(outputObs, (input, output) => {
    if (input[2] === 0) {
      // Turn off the led on release (velocity === 0)
      output.send([0x80, input[1], 0x00]);
      return `Sent output: ${[0x80, input[1], 0x00]}`;
    } else {
      // Turn on the led with green color on press
      output.send([input[0], input[1], 0x3C]);
      return `Sent output: ${[input[0], input[1], 0x3C]}`;
    }
  })
  .subscribe(sent => console.log(sent));
