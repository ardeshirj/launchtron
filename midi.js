var midi = null;

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  console.log('MIDI ready!');
  midi = midiAccess;

  listInputsAndOutputs();
  startLoggingMIDIInput();
}

function onMIDIFailure(msg) {
  console.log('Failed to get MIDI access - ' + msg);
}

function listInputsAndOutputs() {
  for (var entry of midi.inputs) {
    var input = entry[1];
    console.log("Input port [type:'" + input.type + "'] id:'" + input.id +
      "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
      "' version:'" + input.version + "'");
  }

  for (var entry of midi.outputs) {
    var output = entry[1];
    console.log("Output port [type:'" + output.type + "'] id:'" + output.id +
      "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
      "' version:'" + output.version + "'");
  }
}

function onMIDIMessage(event) {
  var str = 'MIDI message received at timestamp ' + event.timeStamp +
    '[' + event.data.length + ' bytes]: ';

  for (var i = 0; i < event.data.length; i++) {
    str += '0x' + event.data[i].toString(16) + ' ';
  }

  console.log(str);
}

function startLoggingMIDIInput() {
  midi.inputs.forEach(function (entry) {
    entry.onmidimessage = onMIDIMessage;
  });
}
