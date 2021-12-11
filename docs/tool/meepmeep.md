# MeepMeep

MeepMeep is a trajectory visualizer designed specifically for the new (as of May 6, 2021) Road Runner trajectory sequence API. More information on trajectory sequences can be found [here](/trajectory-sequence/).

All the screenshots and gifs in LearnRoadRunner were generated using MeepMeep.

MeepMeep's current features:

- Marker visualization
- Timeline scrubbing
- Play/pause (press space)
- `TrajectorySequence` support
- Customizable gui
  - Can change field image, color schemes, etc.
  - Dark mode color schemes!!
- Runs in Android Studio. Co-located with your existing season code
- Sane field coordinates

The GitHub repo for MeepMeep can be found [here](https://github.com/NoahBres/MeepMeep)

## Installation

Please refer to the installation video provided as the steps aren't inherently obvious or intuitive without knowledge of Android app development and gradle modules.

<div class="flex justify-center my-8">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/vdn1v404go8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

Please note that the code described in the latter half of the video is no longer valid as of MeepMeep 2.x.x, due to an API change. This API change allows for better handling of multi-bot support.

## Usage

Please refer to the latter half of the installation video above, as it covers basic usage.

An understanding of how trajectory sequences work is required for use of MeepMeep. Please refer to the [trajectory sequence page](/trajectory-sequence/) and familiarize yourself with the api.

MeepMeep runs in a different module, thus is not able to run code in your normal `TeamCode` SDK code. This generally does not affect trajectories. However, this will affect whatever goes inside the markers as it is generally code that interacts with the bot. It is recommended that you simply comment it out like so:

```java
public class MeepMeepTesting {
    public static void main(String[] args) {
        // Declare a MeepMeep instance
        // With a field size of 800 pixels
        MeepMeep meepMeep = new MeepMeep(800);

        RoadRunnerBotEntity myBot = new DefaultBotBuilder(meepMeep)
                // Required: Set bot constraints: maxVel, maxAccel, maxAngVel, maxAngAccel, track width
                .setConstraints(60, 60, Math.toRadians(180), Math.toRadians(180), 15)
                // Option: Set theme. Default = ColorSchemeRedDark()
                .setColorScheme(new ColorSchemeRedDark())
                .followTrajectorySequence(drive ->
                        drive.trajectorySequenceBuilder(new Pose2d(0, 0, 0))
                                .forward(30)
                                .turn(Math.toRadians(90))
                                .forward(30)
                                .addDisplacementMarker(() -> {
                                  /* Everything in the marker callback should be commented out */

                                  // bot.shooter.shoot()
                                  // bot.wobbleArm.lower()
                                })
                                .turn(Math.toRadians(90))
                                .splineTo(new Vector2d(10, 15), 0)
                                .turn(Math.toRadians(90))
                                .build()
                );

        // Set field image
        meepMeep.setBackground(MeepMeep.Background.FIELD_FREIGHTFRENZY_ADI_DARK)
                .setDarkMode(true)
                // Background opacity from 0-1
                .setBackgroundAlpha(0.95f)
                .addEntity(myBot)
                .start();
    }
}
```

## Adding Multiple Bots

MeepMeepMeep version 2.x introduces a new API and updated entity handling, allowing one to run and coordinate multiple trajectories. Declare a new `RoadRunnerBotEntity` and add it via `MeepMeep#addEntity(Entity)`.

```java
public class MeepMeepTesting {
    public static void main(String[] args) {
        MeepMeep meepMeep = new MeepMeep(800);

        // Declare our first bot
        RoadRunnerBotEntity myFirstBot = new DefaultBotBuilder(meepMeep)
                // We set this bot to be blue
                .setColorScheme(new ColorSchemeBlueDark())
                .setConstraints(60, 60, Math.toRadians(180), Math.toRadians(180), 15)
                .followTrajectorySequence(drive ->
                        drive.trajectorySequenceBuilder(new Pose2d(0, 0, 0))
                                .forward(30)
                                .turn(Math.toRadians(90))
                                .forward(30)
                                .turn(Math.toRadians(90))
                                .forward(30)
                                .turn(Math.toRadians(90))
                                .forward(30)
                                .turn(Math.toRadians(90))
                                .build()
                );

        // Declare out second bot
        RoadRunnerBotEntity mySecondBot = new DefaultBotBuilder(meepMeep)
                // We set this bot to be red
                .setColorScheme(new ColorSchemeRedDark())
                .setConstraints(60, 60, Math.toRadians(180), Math.toRadians(180), 15)
                .followTrajectorySequence(drive ->
                        drive.trajectorySequenceBuilder(new Pose2d(30, 30, Math.toRadians(180)))
                                .forward(30)
                                .turn(Math.toRadians(90))
                                .forward(30)
                                .turn(Math.toRadians(90))
                                .forward(30)
                                .turn(Math.toRadians(90))
                                .forward(30)
                                .turn(Math.toRadians(90))
                                .build()
                );

        meepMeep.setBackground(MeepMeep.Background.FIELD_FREIGHTFRENZY_ADI_DARK)
                .setDarkMode(true)
                .setBackgroundAlpha(0.95f)

                // Add both of our declared bot entities
                .addEntity(myFirstBot)
                .addEntity(mySecondBot)
                .start();
    }
}
```

## Available Field Images

_🚧 TODO 🚧_

See [the GitHub folder for available images](https://github.com/NoahBres/MeepMeep/tree/master/src/main/resources/background) and [the `Background` class for the class names](https://github.com/NoahBres/MeepMeep/blob/72034792df9d3221e73923447ccade94bcb38ca8/src/main/kotlin/com/noahbres/meepmeep/MeepMeep.kt#L434).

## Making Your Own Color Scheme

_🚧 TODO 🚧_

See: [the provided color schemes as an example](https://github.com/NoahBres/MeepMeep/blob/master/src/main/kotlin/com/noahbres/meepmeep/core/colorscheme/scheme/ColorSchemeRedLight.kt).

## Adding Custom Entities

_🚧 TODO: Ask Heno for improved ring entity sample 🚧_

Alternatively, see [here](https://gist.github.com/NoahBres/4136d6617e2870b9e76c5d965f923afd).
