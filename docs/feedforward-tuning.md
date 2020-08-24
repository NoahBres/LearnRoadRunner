# Feedforward Tuning

<HideAyudeWrapper :skipIfDriveEncoders="false">
::: warning
This section should be skipped because you have chosen the option to use drive encoders.
:::
</HideAyudeWrapper>

<figure align="center">
    <img src="./assets/you-are-here/YouAreHere-FFTuning-quarter.png">
    <figcaption class="mt-2 text-gray-600">You are here</figcaption>
</figure>

Tuning the feedforward controller for accurate following is necessary for for accurate path following. Poor tuning of the feedforward controller will result in errors later along the line. Although the Road Runner quickstart comes with both an automatic tuner and a manual tuner, many find that the automatic tuner does not provide optimal results. The automatic tuner isn't able to properly calculate `kA`. However, you are free to try and run it and use the gains it produces. However, I would recommend manually tuning those results afterwards.

## Tuning

1. The first step is to run the `ManualFeedforwardTuner` opmode via the RC.

2. Then, connect to the RC phone's wifi network. The password to the network is located in the `Program and Manage` menu.

3. Navigate to `192.168.49.1:8080/dash` with a phone RC or `192.168.43.1:8080/dash` with a Control Hub.

Your page should look something like this:

<figure align="center">
    <div class="relative">
      <img src="./assets/feedforward-tuning/example-dashboard-half.jpg">
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none" style="box-shadow: inset 0 2px 6px 2px rgba(0, 0, 0, 0.06)"></div>
    </div>
    <figcaption class="mt-2 text-sm text-gray-600">Example dashboard</figcaption>
</figure>

4. Run the opmode. The graph will not show up until you have started it.

5. Look for the `DriveConstants` in the right sidebar. Open the dropdown. Then look for `BASE_CONSTRAINTS`. Open that dropdown. You'll see the options specified in the `DriveConstants` file.

6. Ensure that the `kV`, `kA`, and `kStatic` options are there. You will be tuning these variables.

7. At this point, once you have run the opmode, the bot should be moving back and forth along the distance specified in the opmode file. The goal is for the `poseVelocity` line to match the `targetVelocity` line.

8. **Recommended tuning process**:

   1. `kV` should initially be set to `1 / max velocity`. The `poseVelocity` line should be touching the top of the `targetVelocity` plateau. If not, increase `kV`.
   2. Increase `kA`to try and get the slope of the `poseVelocity` line to match `targetVelocity`.
   3. Here is a reference to visualize what these gains should be doing.

      <figure align="center">
        <div class="relative">
          <img src="./assets/feedforward-tuning/dawgma-tuning-guide.jpg">
          <div class="absolute top-0 left-0 w-full h-full pointer-events-none" style="box-shadow: inset 0 2px 6px 2px rgba(0, 0, 0, 0.06)"></div>
        </div>
        <figcaption class="mt-2 text-sm text-gray-600">Tuning Tips</figcaption>
      </figure>

      These tips come from FRC Team 1712's [Adaptive Pure Pursuit paper](https://www.chiefdelphi.com/t/paper-implementation-of-the-adaptive-pure-pursuit-controller/166552)

   4. That should be it! An example of a decently tuned feedforward controller can be found below.
   5. **Any adjustments in dashboard need to be copied over to the `DriveConstants.java` file under the equivalent variable name. Dashboard adjustments are temporary and will reset once you restart the opmode.**
   6. Check the tuning simultor to see how each gain affects the behavior.

Decently tuned feedforward controller courtesy of Deetz from Team 14320:

<figure align="center">
  <div class="relative">
    <img src="./assets/feedforward-tuning/deetz-tuning-half.jpg">
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none" style="box-shadow: inset 0 2px 6px 2px rgba(0, 0, 0, 0.06)"></div>
    </div>
  <figcaption class="mt-2 text-sm text-gray-600">Tuned Feedforward Controller</figcaption>
</figure>

You may notice the asymmetry in the acceleration. Unfortunately, perfect velocity control is not yet achievable with a stock motor control model due to this asymmetry. Notice that the acceleration does not track well when decelerating. We suspect that this is due to weird Rev Hub's unique motor controller. For more details, or if you have a solution to this problem, please hit up the [FTC Discord](https://discord.gg/first-tech-challenge).

## Feedforward Tuning Simulator

<ClientOnly>
  <FeedForwardTuning-FFTuningSimulator class="m-4" graphHeight="30rem" />
</ClientOnly>

Play around with the gains to see how each one affects the graph! Try and tune this simple example. This graph is very similar to what you will be doing while actually tuning the bot so having an understanding of how the process will go will be beneficial.

Tip: Press enter in the text input for your new gain to take effect (just like FTC-Dashboard!).
