# Spline Test

<figure align="center">
    <img src="./assets/you-are-here/YouAreHere-SplineTest-quarter.png">
    <figcaption class="mt-2 text-gray-600">You are here</figcaption>
</figure>

1. Once your `TRANSLATION` and `HEADING` PID's are tuned, you should run the spline test to make sure everything is in order.
2. Open dashboard to make sure that it's following correctly. The bot should follow an S-shaped path and Dashboard should follow the path properly.
3. If something goes wrong, try and go back to diagnose the problem. Hit up the [FTC Discord](https://discord.gg/first-tech-challenge) if you're stuck.

<ClientOnly>
  <div class="flex items-center justify-center">
    <HoverConfetti>🎊🎉🎊🎉 Congrats you're done! 🎊🎉🎊🎉</HoverConfetti>
  </div>
</ClientOnly>

## Hiding the tuning opmodes

The Road Runner quickstart comes with many tuning opmodes. They can clutter up the RC's opmode list quite a bit, especially when you start adding many of your own opmodes. If you are finished with your tuning process, you can hide these opmodes using the `@Disabled` annotation on your opmodes.

Do so by inserting the following above any of the opmode class declarations:

```java{2}
@Config
@Disabled
@Autonomous(group = "drive")
public class DriveVelocityPIDTuner extends LinearOpMode {
    public static double DISTANCE = 72; // in
```
