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

## Usage

Please refer to the latter half of the installation video above, as it covers basic usage.

An understanding of how trajectory sequences work is required for use of MeepMeep. Please refer to the [trajectory sequence page](/trajectory-sequence/) and familiarize yourself with the api.

MeepMeep runs in a different module, thus is not able to run code in your normal `TeamCode` SDK code. This generally does not affect trajectories. However, this will affect whatever goes inside the markers as it is generally code that interacts with the bot. It is recommended that you simply comment it out like so:

```java
public class MeepMeepTesting {
    public static void main(String[] args) {
        // Declare a MeepMeep instance
        // With a field size of 800 pixels
        MeepMeep mm = new MeepMeep(800)
                // Set field image
                .setBackground(MeepMeep.Background.FIELD_ULTIMATE_GOAL_DARK)
                // Set theme
                .setTheme(new ColorSchemeRedDark())
                // Background opacity from 0-1
                .setBackgroundAlpha(1f)
                // Set constraints: maxVel, maxAccel, maxAngVel, maxAngAccel, track width
                .setConstraints(60, 60, Math.toRadians(180), Math.toRadians(180), 15)
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
                )
                .start();
    }
}
```

:::tip
All development for the current version of MeepMeep has been deferred in favor of the MeepMeep Web editor. This will enable fancy drag and drop trajectory creation. Respectfully, please hold any feature requests (playback speed adjustment, drag and drop, etc.) until MeepMeep Web has been released.
:::
