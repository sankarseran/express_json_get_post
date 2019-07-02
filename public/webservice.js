

function getMotorAPI(deviceID) {
    $.ajax({
    url: "http://localhost:3000/" + deviceID,
    contentType: "application/json",
        dataType: 'json',
        success: function(result){
            console.log(result);
            $(document).ready(function () {
                $('#powerStatuslbl').html('Power Status :' + result.status);
                $('#lblAMS').html('AMS Value :' + result.data.Currentvalue);
                $('#lblVOL').html('Voltage Value :' + result.data.Voltagevalue);
                document.getElementById("amsMeter").setAttribute("value", result.data.Currentvalue);
                document.getElementById("volMeter").setAttribute("value", result.data.Voltagevalue);
           });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 500) {
                alert('Internal error: ' + jqXHR.responseText);
            } else {
                alert('Unexpected error.');
            }
        }
 });
}

