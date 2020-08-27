# Tools

## Road Runner GUI

<figure align="center">
    <img src="./assets/tools/rr-gui-half-compressed.jpg">
    <figcaption class="mt-2 text-gray-600">Road Runner Official GUI</figcaption>
</figure>

Road Runner comes with an official GUI plugin for designing trajectories. It is able to export trajectories to a yaml file which can be read by the Road Runner library.
However, the GUI can only build spline paths. It does not utilize `lineTo` or the relative movements (`strafe()`, `forward()`, etc). Because it is exported to a yaml file, it does not support markers.
If you do choose to use the official GUI, I would recommend using the trajectory builder and translating that to Java code yourself.

Check the [Road Runner GUI page](/tool/road-runner-gui) for further details on installation and use.

## David's RRPathVisualizer

<figure align="center">
    <img src="./assets/tools/rrpathviz-half-compressed.jpg">
    <figcaption class="mt-2 text-gray-600">David's RRPathVisualizer</figcaption>
</figure>

RRPathVisualizer was written by David, Recharged Green 7236's lead programmer. It is a path "visualizer" in that you write your trajectories as you would for your bot and you stick them in a custom Kotlin project. If you run the program it will display a window and animate the bot along your specified trajectories. I personally prefer this workflow as you can simply copy-paste the trajectories you made in RRPathVisualizer into your own FTC project.

Check the [RRPathVisualizer page](/tool/rrpathvisualizer) for further details on installation and use.

## MeepMeep (in development)

<figure align="center">
    <img src="./assets/tools/meepmeep-half-compressed.jpg">
    <figcaption class="mt-2 text-gray-600">MeepMeep</figcaption>
</figure>

MeepMeep is currently in development but can be found [here](https://github.com/NoahBres/MeepMeep).

All the screenshots and gifs in LearnRoadRunner were generated using MeepMeep.

MeepMeep's cool features:

- Marker visualization
- Timeline scrubbing
- `TrajectorySequence` support (in development)
- Customizable gui
  - Can change field image, color schemes, etc.
  - Drag and drop trajectory builder (in development)
  - Supports dark mode!!
- Runs in Android Studio. Co-located with your existing season code
- Sane field coordinates

Hit me up on the [FTC Discord](https://discord.gg/first-tech-challenge) for installation instructions (Noah#5396). It is in early development so I do not recommend trying to install it.

### Note:

David's RRPathVisualizer and the official Road Runner GUI both utilize a rotated field coordinate system. Their entire field is rotated 90 degrees to match the audience's perspective. Because of this, the Y axis is horizontal and the X axis is vertical. The Y axis increases to the left and the X axis increases vertically. Just to clear any confusion when using both applications.

MeepMeep does not use a rotated field. Although the field is no longer displayed through the audience's perspective, the X and Y axis follow a typical cartesian coordinate map. Please see the [coordinate system specification](/trajectories.html#coordinate-system) for more details.
