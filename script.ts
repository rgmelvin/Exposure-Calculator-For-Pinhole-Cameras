/**
 * Calculate the f-number for a pinhole camera.
 * 
 * @param {number} pinholeDiameter - Diameter of the pinhole in mm.
 * @param {number} focalLength - Focal length in mm.
 * @returns {number} - Calculated f-number (aperture).
 */
function calculatePinholeFNumber(pinholeDiameter: number, focalLength: number): number {
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
function calculatePinholeExposure(referenceExposureTime: number, referenceAperture: number, pinholeAperture: number, referenceISO: number, pinholeISO: number): number {
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
function calculateDiagonalViewAngle(focalLength: number, width: number, height: number): number {
    const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const viewAngleRadians = 2 * Math.atan(0.5 * diagonal / focalLength);
    return viewAngleRadians * (180 / Math.PI); // Convert to degrees
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('exposureForm') as HTMLFormElement;
    const recalculateButton = document.getElementById('recalculateButton') as HTMLButtonElement;
    const refreshMessage = document.getElementById('refreshMessage') as HTMLParagraphElement;

    form.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault();

        let refExposureTime = (document.getElementById('refExposureTime') as HTMLInputElement).value;
        const refAperture = parseFloat((document.getElementById('refAperture') as HTMLSelectElement).value);
        const refISO = parseInt((document.getElementById('refISO') as HTMLInputElement).value, 10);
        const pinholeDiameter = parseFloat((document.getElementById('pinholeDiameter') as HTMLInputElement).value);
        const focalLength = parseFloat((document.getElementById('focalLength') as HTMLInputElement).value);
        const filmFormat = (document.getElementById('filmFormat') as HTMLSelectElement).value;
        const pinholeISO = parseInt((document.getElementById('iso') as HTMLInputElement).value, 10);

        // Convert shutter speed string to numerical value in seconds
        if (refExposureTime.includes('/')) {
            const parts = refExposureTime.split('/');
            refExposureTime = (parseFloat(parts[0]) / parseFloat(parts[1])).toString();
        }
        const refExposureTimeNum = parseFloat(refExposureTime);

        const pinholeAperture = calculatePinholeFNumber(pinholeDiameter, focalLength);
        const pinholeExposureTime = calculatePinholeExposure(refExposureTimeNum, refAperture, pinholeAperture, refISO, pinholeISO);

        let width = 0;
        let height = 0;

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

        const viewAngle = calculateDiagonalViewAngle(focalLength, width, height);

        (document.getElementById('pinholeFNumber') as HTMLParagraphElement).innerText = `Pinhole f-number: f/${pinholeAperture.toFixed(2)}`;
        (document.getElementById('pinholeExposureTime') as HTMLParagraphElement).innerText = `Pinhole exposure time: ${pinholeExposureTime.toFixed(2)} seconds`;
        (document.getElementById('viewAngle') as HTMLParagraphElement).innerText = `View angle: ${viewAngle.toFixed(2)} degrees`;

        // Show the recalculate button and refresh message
        recalculateButton.style.display = 'block';
        refreshMessage.style.display = 'block';
    });

    recalculateButton.addEventListener('click', () => {
        location.reload();
    });
});
