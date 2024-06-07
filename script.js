/**
 * Calculate the f-number for a pinhole camera.
 *
 * @param {number} pinholeDiameter - Diameter of the pinhole in mm.
 * @param {number} focalLength - Focal length in mm.
 * @returns {number} - Calculated f-number (aperture).
 */
function calculatePinholeFNumber(pinholeDiameter, focalLength) {
    return focalLength / pinholeDiameter;
}
/**
 * Calculate exposure time for a pinhole camera using reference light meter settings.
 *
 * @param {number} referenceExposureTime - Reference exposure time in seconds.
 * @param {number} referenceAperture - Reference aperture (f-number).
 * @param {number} pinholeAperture - Pinhole camera aperture (f-number).
 * @param {number} referenceISO - Reference ISO value.
 * @param {number} pinholeISO - ISO sensitivity of the pinhole camera film.
 * @returns {number} - Calculated exposure time for the pinhole camera in seconds.
 */
function calculatePinholeExposure(referenceExposureTime, referenceAperture, pinholeAperture, referenceISO, pinholeISO) {
    return (Math.pow(pinholeAperture, 2) * referenceExposureTime * referenceISO) / (Math.pow(referenceAperture, 2) * pinholeISO);
}
/**
 * Calculate the diagonal angle of view of the pinhole camera.
 *
 * @param {number} focalLength - Focal length in mm.
 * @param {number} width - Width of the film in mm.
 * @param {number} height - Height of the film in mm.
 * @returns {number} - Diagonal angle of view in degrees.
 */
function calculateDiagonalViewAngle(focalLength, width, height) {
    var diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    var viewAngleRadians = 2 * Math.atan(0.5 * diagonal / focalLength);
    return viewAngleRadians * (180 / Math.PI); // Convert to degrees
}
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('exposureForm');
    var recalculateButton = document.getElementById('recalculateButton');
    var refreshMessage = document.getElementById('refreshMessage');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var refExposureTime = document.getElementById('refExposureTime').value;
        var refAperture = parseFloat(document.getElementById('refAperture').value);
        var refISO = parseInt(document.getElementById('refISO').value, 10);
        var pinholeDiameter = parseFloat(document.getElementById('pinholeDiameter').value);
        var focalLength = parseFloat(document.getElementById('focalLength').value);
        var filmFormat = document.getElementById('filmFormat').value;
        var pinholeISO = parseInt(document.getElementById('iso').value, 10);
        // Convert shutter speed string to numerical value in seconds
        if (refExposureTime.includes('/')) {
            var parts = refExposureTime.split('/');
            refExposureTime = (parseFloat(parts[0]) / parseFloat(parts[1])).toString();
        }
        var refExposureTimeNum = parseFloat(refExposureTime);
        var pinholeAperture = calculatePinholeFNumber(pinholeDiameter, focalLength);
        var pinholeExposureTime = calculatePinholeExposure(refExposureTimeNum, refAperture, pinholeAperture, refISO, pinholeISO);
        var width = 0;
        var height = 0;
        // Determine width and height based on film format
        switch (filmFormat) {
            case '24': // 35mm
                width = 36;
                height = 24;
                break;
            case '56': // 120mm
                width = 56;
                height = 56;
                break;
            case '95': // 4x5 sheet film
                width = 127;
                height = 102;
                break;
            case '120': // 5x7 sheet film
                width = 178;
                height = 127;
                break;
            case '203': // 8x10 sheet film
                width = 254;
                height = 203;
                break;
        }
        var viewAngle = calculateDiagonalViewAngle(focalLength, width, height);
        document.getElementById('pinholeFNumber').innerText = "Pinhole f-number: f/".concat(pinholeAperture.toFixed(2));
        document.getElementById('pinholeExposureTime').innerText = "Pinhole exposure time: ".concat(pinholeExposureTime.toFixed(2), " seconds");
        document.getElementById('viewAngle').innerText = "View angle: ".concat(viewAngle.toFixed(2), " degrees");
        // Show the recalculate button and refresh message
        recalculateButton.style.display = 'block';
        refreshMessage.style.display = 'block';
    });
    recalculateButton.addEventListener('click', function () {
        location.reload();
    });
});
