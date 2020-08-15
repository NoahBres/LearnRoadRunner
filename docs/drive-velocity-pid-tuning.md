# Drive Velocity PID Tuning

<HideAyudeWrapper :skipIfDriveEncoders="true">
::: warning
This section should be skipped because you have chosen the option not to use drive encoders.
:::
</HideAyudeWrapper>

Tuning the Velocity PID can be one of the more frustrating parts of Road Runner. This is required for accurate path following. However, intuition on how a PID controller works and what to do will help alleviate that frustration and hopefully make this a smooth process.

## Telemetry Packet

The first step will be to replace `telemetry` with `TelemetryPacket`. This enables us to update the graph faster for higher resolution.

Either just copy the entire opmode from [my custom quickstart fork](https://github.com/NoahBres/road-runner-quickstart/blob/master/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/opmode/DriveVelocityPIDTuner.java) and replace yours with it or do the following:

1. Find lines 171-177:

```java
/* Lines 171-177 in DriveVelocityPIDTuner.java */

// update telemetry
telemetry.addData("targetVelocity", motionState.getV());
for (int i = 0; i < velocities.size(); i++) {
  telemetry.addData("velocity" + i, velocities.get(i));
  telemetry.addData("error" + i, motionState.getV() - velocities.get(i));
}
telemetry.update();
```

2. Replace those lines with the following:

```java
TelemetryPacket packet = new TelemetryPacket();

// update telemetry
packet.put("targetVelocity", motionState.getV());
for (int i = 0; i < velocities.size(); i++) {
  packet.put("velocity" + i, velocities.get(i));
  packet.put("error" + i, motionState.getV() - velocities.get(i));
}
dashboard.sendTelemetryPacket(packet);
```

Voilà! High resolution graphs.

**Now to begin tuning.**

## Tuning

1. The first step is to run the `DriveVelocityPIDTuner` opmode via the RC.

2. Then, connect to the RC phone's wifi network. The password to the network is located in the `Program and Manage` menu.

3. Navigate to `192.168.49.1:8080/dash` with a phone RC or `192.168.43.1:8080/dash` with a Control Hub.

Your page should look something like this:

<figure align="center">
    <div class="relative">
      <img src="./assets/drive-velocity-pid-tuning/example-dashboard-half.jpg">
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none" style="box-shadow: inset 0 2px 6px 2px rgba(0, 0, 0, 0.06)"></div>
    </div>
    <figcaption style="marginTop: 1em;">Example dashboard</figcaption>
</figure>

If the graph doesn't show up, and instead shows a number of checkboxes, that's okay. Click the `targetVelocity` and `velocity0` checkbox. Ignore the others. This will make tuning easier.

4. Look for the `DriveVelocityPIDTuner` in the right sidebar. Open the dropdown. You'll see the options: `DISTANCE`, `kD`, `kI`, and `kP`.

5. Ensure that the `DISTANCE` variable is big enough so the `targetVelocity` line has a plateau. If it resembles a series of triangles, increase the `DISTANCE`.

6. You're going to tune these values. The goal of the tuning process is to match `velocity0` to the `targetVelocity` line. Edit the values in the text boxes and press enter. They will live update and you should see the effects take place on the bot.

7. **Recommended tuning process**:
   1. Set all the values, `kP`, `kD`, and `kI` to 0. Keep `kV` as is.
   2. Increase `kV` until you start to match the `targetVelocity`. Once the plateaus start touching you can stop increasing.
   3. Slowly increase `kP` to try and get the line to match the target.
   4. Increase `kD` to try and dampen the oscillations. Increasing `kD` too far will simply increase oscillations.
   5. Increase `kP` once again. Repeat the `kP` and `kD` increase until your graph starts to match the target velocity.
   6. You should not touch `kI`. `kI` tends to cause many problems and its use is technically incorrect.
   7. The graph doesn't need to be perfect. Just "good enough." You can waste an infinite amount of time trying to perfect it. Once the graph is overlapping for the majority
   8. Check the tuning simulator to see how each gain affects the behavior.

::: tip
_"Velocity PID Controllers typically don't need `kD`"_ (Veness, Tyler. _Control Engineering in FRC_. pg. 17). However, it seems to be beneficial for FTC bots due to some feed forward and motor controller weirdness.

On a tangential note, you shouldn't need to use `kI`.

> "Adding an integral gain to the controller is an incorrect way to eliminate steady-state error. A better approach would be to tune it with an integrator added to the plant, but this requires a model. Since we are doing output-based rather than model-based control, our only option is to add an integrator to the controller."

If you feel the need to add `kI`, you should be increasing `kV`.
:::

## Common Errors

1. One of the velocity lines are going the opposite way and not following `targetVelocity`.
   - The polarity to the motors are reversed. The encoder is not reading the same direction as the motor is actually turning. Switch the black and red cable on your motor. Or, multiply the encoder readings in your `SampleMecanumDrive` by -1.

## PID Tuning simulator

<ClientOnly>
  <VeloPIDTuning-TuningSimulator class="m-4" graphHeight="30rem" />
</ClientOnly>

Play around with the gains to see how each one affects the graph! This graph is very similar to what you will be doing while actually tuning the bot so having an understanding of how the process will go.

Tip: Press enter in the text input for your new gain to take effect.

::: tip
Here are two good videos explaining what each gain in a PID controller does if you are interested. Highly recommend watching these as an intuitive understanding of each gain will make tuning much easier.

[https://www.youtube.com/watch?v=6OH-wOsVVjg](https://www.youtube.com/watch?v=6OH-wOsVVjg)

[https://www.youtube.com/watch?v=0vqWyramGy8](https://www.youtube.com/watch?v=0vqWyramGy8)

:::

# TODO

make a video explaining the basics on this and embed
