# Drive Velocity PID Tuning

<HideAyudeWrapper :skipIfDriveEncoders="true">
::: warning
This section should be skipped because you have chosen the option not to use drive encoders.
:::
</HideAyudeWrapper>

<figure align="center">
    <img src="./assets/you-are-here/YouAreHere-DriveVelocityPID-quarter.png" alt="You are on the drive velocity pid step">
    <figcaption class="mt-2 text-gray-600 text-center">You are here</figcaption>
</figure>

Tuning the Velocity PID can be one of the more frustrating parts of Road Runner. This is required for accurate path following. However, intuition on how a PID controller works and what to do will help alleviate that frustration and hopefully make this a smooth process.

## Tuning

1. The first step is to run the `DriveVelocityPIDTuner` opmode via the RC.

2. Then, connect to the RC phone's wifi network. The password to the network is located in the `Program and Manage` menu.

3. Navigate to `192.168.49.1:8080/dash` with a phone RC or `192.168.43.1:8080/dash` with a Control Hub.

Your page should look something like this:

<figure align="center">
    <div class="relative">
      <img src="./assets/drive-velocity-pid-tuning/example-dashboard-half.jpg" alt="Image depicting FTC Dashboard in the browser">
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none" style="box-shadow: inset 0 2px 6px 2px rgba(0, 0, 0, 0.06)"></div>
    </div>
    <figcaption class="mt-2 text-sm text-gray-600 text-center">Example dashboard</figcaption>
</figure>

4. Run the opmode. The graph and its options will not show up until you have started it.

If the graph doesn't show up, and instead shows a number of checkboxes, that's okay. Click the `targetVelocity` and `velocity0` checkbox. Ignore the others. This will make tuning easier.

5. Look for the `DriveVelocityPIDTuner` in the right sidebar. Open the dropdown. Then look for `VELO_PID`. Open that dropdown. You'll see the options: `DISTANCE`, `kD`, `kI`, and `kP`. You will be tuning these variables.

6. Ensure that the `DISTANCE` variable is big enough so the `targetVelocity` line has a plateau. If it resembles a series of triangles, increase the `DISTANCE`. There should be a decently straight/flat portion in the graph.

7. At this point, once you have run the opmode, the bot should be moving back and forth along the distance specified in the opmode file. The goal of the tuning process is to match `velocity0` to the `targetVelocity` line. Edit the values in the text boxes and press enter. They will live update and you should see the effects take place on the bot.

8. **Recommended tuning process**:
   1. Set all the values, `kP`, `kD`, and `kI` to 0. Keep `kV` as is.
   2. Increase `kV` a little so it gets closer to `targetVelocity`. We have found that increasing `kV` until it reaches the plateau isn't as optimal. Increasing `kV` so that your wheel velocity rests halfway between your original velocity and `targetVelocity` produces great results.
   3. Slowly increase `kP` to try and get the line to match the target.
   4. Increase `kD` to try and dampen the oscillations. Increasing `kD` too far will simply increase oscillations.
   5. Increase `kP` once again. Repeat the `kP` and `kD` increase until your graph starts to match the target velocity.
   6. You should not touch `kI`. `kI` tends to cause many problems and its use is technically incorrect.
   7. **Note:** The graph doesn't need to be perfect. Just "good enough." You can waste an infinite amount of time trying to perfect it. In addition to that, the FTC Motor Controller is a little odd and you will have a slight bump on deceleration that will be impossible to get rid of.
   8. The official Road Runner docs recommend that you should "prioritize eliminating phase lag even at the cost of some extra oscillations." However, I personally feel that it is better to try and minimize oscillations, especially towards the zero velocity. I found that eliminating phase lag, especially at high speeds, would cause very jittery motion, most likely due to the Rev Hub's odd motor control. Hit us up in the [FTC Discord](https://discord.gg/first-tech-challenge) if you are interested in further technical details. My personal advice would be to minimize oscillations and allow for the translational PID to fix any phase lag discrepancies.
   9. **Any adjustments in dashboard need to be copied over to the `DriveConstants.java` file under the equivalent variable name. Dashboard adjustments are temporary and will reset once you restart the opmode. Remember this!! It is very frustrating to get decent tunings and forgetting to save them in `DriveConstants.java`!**
   10. Check the tuning simulator to see how each gain affects the behavior.

::: tip
_"Velocity PID Controllers typically don't need `kD`"_ (Veness, Tyler. _Control Engineering in FRC_. pg. 17). However, it seems to be beneficial for FTC bots due to some feedforward and motor controller weirdness.

On a tangential note, you shouldn't need to use `kI`.

> "Adding an integral gain to the controller is an incorrect way to eliminate steady-state error. A better approach would be to tune it with an integrator added to the plant, but this requires a model. Since we are doing output-based rather than model-based control, our only option is to add an integrator to the controller."

If you feel the need to add `kI`, you should be increasing `kV`.
:::

## Common Errors

1. One of the velocity lines are going the opposite way and not following `targetVelocity`.

   - The polarity to the motors are reversed. The encoder is not reading the same direction as the motor is actually turning. Switch the black and red cable on your motor. Or, multiply the encoder readings in your `SampleMecanumDrive` by -1.

2. Uncommon error: StraightTest/DriveVelocityPID simply keeps overshooting and tweaking variables in `DriveConstants.java` just doesn't change anything. It has been found that lowering the max velocity in `BASE_CONSTRAINTS` does fix this issue. Quite odd but 🤷‍♂️.

## PID Tuning Simulator

<ClientOnly>
  <VeloPIDTuning-PIDTuningSimulator class="m-4" graphHeight="30rem" />
</ClientOnly>

Play around with the gains to see how each one affects the graph! Try and tune this simple example. This graph is very similar to what you will be doing while actually tuning the bot so having an understanding of how the process will go will be beneficial.

Tip: Press enter in the text input for your new gain to take effect (just like FTC-Dashboard!).

::: warning
This is a very very rudimentary "simulator." It is only meant to give you a basic high level understanding of how the gains affect the behavior of the graph. It is in no way trying to accurately simulate the Rev Hub's motor controller as that presents its own problems. This sim is based on a simple DC Motor model with arbitrary constants. The sim will not behave exactly like how your actual tuning will go but it is meant to give you a decent intuition of how it works. Also, I am very aware of the bugs it has. That's what the "reset" button is for :P
:::

::: tip
Here are two good videos explaining what each gain in a PID controller does if you are interested. Highly recommend watching these as an intuitive understanding of each gain will make tuning much easier.

[https://www.youtube.com/watch?v=6OH-wOsVVjg](https://www.youtube.com/watch?v=6OH-wOsVVjg)

[https://www.youtube.com/watch?v=0vqWyramGy8](https://www.youtube.com/watch?v=0vqWyramGy8)

This article is also pretty neat:

[https://blog.wesleyac.com/posts/intro-to-control-part-one-pid](https://blog.wesleyac.com/posts/intro-to-control-part-one-pid)

:::

# TODO

make a video explaining the basics on this and embed
