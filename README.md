# Pinhole Camera Exposure Calculator

This web application calculates the exposure time for a pinhole camera using reference light meter settings and metered exposure time. Additionally, it calculates the view angle based on the film format and focal length. The application includes user prompts for metered exposure time, metered aperture, metered ISO, pinhole diameter, focal length, film format, and ISO of the film.

This README includes sections on getting started, usage, project structure, how to contribute to the project, and more.

TODO: Include reciprocity calculations for specific film stocks

## Features

- User-friendly form for inputting required parameters.
- Real-time calculation of pinhole f-number, exposure time, and view angle.
- Responsive design with basic styling.
- "Recalculate" button to refresh the browser and allow for new calculations.

## Technologies Used

- HTML
- CSS
- TypeScript
- JavaScript

## Getting Started

### Prerequisites

Ensure you have Node.js and TypeScript installed on your system.

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/pinhole-camera-exposure-calculator.git
    ```

2. Navigate to the project directory:

    ```sh
    cd pinhole-camera-exposure-calculator
    ```

3. Compile the TypeScript file to JavaScript:

    ```sh
    tsc script.ts
    ```

### Running the Application

1. Ensure all files (`index.html`, `styles.css`, `script.js`) are in the same directory.
2. Open `index.html` in a web browser to use the application.

## Usage

1. Open the application in a web browser.
2. Fill out the form with the required parameters:
    - Metered Exposure Time (in seconds)
    - Metered Aperture (f-number)
    - Metered ISO
    - Pinhole Diameter (in mm)
    - Focal Length (in mm)
    - Film Format (35mm, 120mm, 4x5 sheet film, 5x7 sheet film, 8x10 sheet film)
    - ISO of the Film
3. Click the "Calculate" button.
4. The calculated pinhole f-number, exposure time, and view angle will be displayed.
5. To perform another calculation, click the "Recalculate" button to refresh the browser.

## Project Structure

```sh
pinhole-camera-exposure-calculator/
├── index.html : The main HTML file for the application.
├── styles.css : The CSS file for styling the application.
├── script.ts : The TypeScript file containing the logic for the application.
├── script.js : The compiled JavaScript file from the TypeScript source.
└── README.md : This README file

## Contributing
I encourage the community to improve the tool for greater usability.
Contributions are very welcome, just keep me in the loop, please.
Please fork the repository and submit a pull request for any improvments or bug fixes.

1. Fork the Project
2. Create your Feature Branch ('git checkout -b feature/MyNewFeature')
3. Commit your changes ("git commit -m 'Added a great new feature!'")
4. Push to the Branch ('git push origin feature/MyNewFeature')
5. Open a pull request

## License
This project is licensed under the MIT License.

## Acknowledgements
This project was inspired by my own need for accurate exposure calculations for pinhole photography. I hope that it 
also serves the needs of the pinhole camear enthusiast community.
In the spirit of open discourse I will include constructive criticism with attribution here.
I will also include data for your pinhole camera if you wish!
