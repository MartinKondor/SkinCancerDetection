'use strict';
let MODEL = null;
const basicPredictionMsg = 'Hypothetically:';
const screenWidth = 224;
const screenHeight = 224;
let imgShape = [224, 224];
let fileReader = new FileReader();


(async () => {
    if (confirm(`
    Loading and using the page can be really hard on your computer since it runs a neural network.
    
    Do you really want to load the page?
    `)) {
        MODEL = await tf.loadLayersModel('https://raw.githubusercontent.com/MartinKondor/SkinCancerDetection/master/trained/model.json');
    }

    // Notify the end of loading
    let e = document.getElementById('loading');
    e.style.display = 'none';

    // Show the input fields after loading
    e = document.getElementById('inputs');
    e.style.display = 'block';
})();       


// Event handler
async function processInput(input) {
    if (!input.files || !input.files[0]) return null;
    
    let predictionElement = document.getElementById('prediction');
    let dataLoadingElement = document.getElementById('loading-data');
    dataLoadingElement.style.display = 'block';

    // Read in the file
    fileReader.onload = function (e) {
        let array = new Uint8Array(this.result);
        let _dim = Math.round(array.length ** 0.5);
        let shape = [_dim, _dim];
        let new_array = [];
        let row = [];
        let channel = [];

        // Convert 1D array to 3D
        for (let i = 0; i < array.length; i++) {
            channel.push(array[i]);
            
            if (channel.length == 3) {
                row.push(channel);
                channel = [];
            }
           
            if (row.length >= _dim) {
                new_array.push(row);
                row = [];
            }
        }

        // Convert array to tensor
        let tensor = tf.tensor([new_array]);
        tensor = tf.image.resizeBilinear(tensor, imgShape);
        tensor = tf.cast(tensor, 'float32');

        // Starting prediction
        MODEL.predict(tensor).data().then(function (x) {
            dataLoadingElement.style.display = 'none';
            
            /*
            malignant - 1
            benign - 0
            */
            if (x[0] != 1) {
                predictionElement.innerHTML = basicPredictionMsg + '<span class="text-danger"> Malignant</span>';
            }
            else {
                predictionElement.innerHTML = basicPredictionMsg + '<span class="text-success"> Benign</span>';
            }
        });
    }
    
    // fileReader.readAsDataURL(input.files[0]);
    fileReader.readAsArrayBuffer(input.files[0]);
}
