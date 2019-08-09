'use strict';
let MODEL = null;
const screenWidth = 224;
const screenHeight = 224;
let imgShape = [224, 224, 3];
let fileReader = new FileReader();


(async () => {
    // MODEL = await tf.loadLayersModel('https://raw.githubusercontent.com/MartinKondor/SkinCancerDetection/master/trained/model.json');

    // Notify the end of loading
    let e = document.getElementById('loading');
    e.style.display = 'none';

    // Show the input fields after loading
    e = document.getElementById('inputs');
    e.style.display = 'block';
})();


// Event handler
function processInput(input) {
    if (!input.files || !input.files[0]) return null;
    let print = console.log;

    // Read in the file
    fileReader.onload = function (e) {
        let array = new Uint8Array(this.result);
        let _dim = Math.round(array.length ** 0.5);
        let shape = [_dim, _dim];
        let new_array = [];
        let row = [];

        // console.log(shape, array.length);

        for (let i = 0; i < array.length; i++) {
            row.push(array[i]);

            if (row.length >= _dim[0]) {
                new_array.push(row);
                row = [];
            }
        }

        console.log(new_array);

        /*
        let tensor = tf.tensor(Array.from(new Uint8Array(this.result)));

        // tensor = tf.image.resizeBilinear(tensor, imgShape);
        // tensor = tf.cast(tensor, 'float32');
        // tensor = tensor.reshape(imgShape);

        console.log(tensor);
        */
    }
    // fileReader.readAsDataURL(input.files[0]);
    fileReader.readAsArrayBuffer(input.files[0]);
}
