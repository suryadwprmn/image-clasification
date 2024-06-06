//Check Image
function readURL(input) {
    if (input.files && input.files[0]) {
        $('#check').prop('disabled', false);

        let reader = new FileReader();

        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function () {
    $('#check').prop('disabled', true);
});

function check() {
    const element = document.getElementById("result");
    element.innerHTML = "Detecting...";

    let dots = 0;
    detectingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        element.innerHTML = "Detecting" + ".".repeat(dots);
    }, 500);
    $("#result").addClass("border");


    const classifier = ml5.imageClassifier('MobileNet', () => {
        const img = document.getElementById("image");
        classifier.classify(img, gotResult);
    });

    function gotResult(error, results) {
        clearInterval(detectingInterval);
        if (error) {
            element.innerHTML = error;
        } else {
            let num = results[0].confidence * 100;
            element.innerHTML = "<h5>" + results[0].label + "</h5> Kemiripan: <b>" + num.toFixed(2) + "%</b>";
        }
    }
}

