# Official Road Runner GUI

## Installation

1. Navigate to the [Road Runner releases page on github](https://github.com/acmerobotics/road-runner/releases)
2. Scroll down to the assets dropdown and find `road-runner-gui-0.5.x.jar`

   Or just click this [download link](https://github.com/acmerobotics/road-runner/releases/download/v0.5.1/road-runner-gui-0.5.1.jar)

3. Run the .jar file you just downloaded

## Usage

1. Run the .jar file you downloaded
2. It will popup a small window that asks you to "select the location for your project"
3. Click the browser button and navigate to the folder with your FTC code
4. You should see the following window:

<figure align="center">
    <img src="../assets/road-runner-gui/step-4-half-compressed.jpg">
    <figcaption class="mt-2 text-gray-600">Main Window</figcaption>
</figure>

5. Click the add button (top left) and give your trajectory a name
6. Now, click the add button near the button right, this will add more waypoints
   - Edit the coordinates in your waypoints
7. Play around!

   - The interp dropdown allows you to change the heading interpolating type on each waypoint
   - The config tab allows you to change the physical properties and constraints of the bot

8. Hover over the field to see your bot animate through the trajectory
9. The save button will export your trajectory to a yaml file
