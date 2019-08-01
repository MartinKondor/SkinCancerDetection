'use strict';
print = console.log;

const model = new KerasJS.Model({
  filepath: 'trained/model.bin',
  gpu: true
});


