# Track Width Tuning

<figure align="center">
    <img src="./assets/you-are-here/YouAreHere-TrackWidthTuner-quarter.png" alt="You are on the track width tuning step">
    <figcaption class="mt-2 text-gray-600 text-center">You are here</figcaption>
</figure>

::: warning
Your localizer's heading measurements should be accurate prior to tuning this. If you're using a 3-wheel localizer, this means tuning the lateral distance. Otherwise, the heading should come directly from the IMU.
:::

::: tip
A long clarification because this can get slightly confusion.
Just to clarify, there are two types of track width that you may see. Track width is the center-to-center distance from two parallel wheels.

The track width in your `DriveConstants.java` refers to the track width of the drive train.
The track used in any context involving odometry is the center-to-center distance of the two parallel wheels. This only applies to three-wheel odometry. The track width for three-wheel odometry refers to the same thing as `lateralDistance`.
Thus, any references to track width on this page will refer to the drive train track width.

The track width for the **drive train** is used for the forward kinematics for feedforward following.

The track width for **three-wheel odometry** (aka `lateralDistance`) is used for localization.

You should have already tuned localization. Right now, you will be tuning the drive train.
:::

1. Run the `TrackWidthTuner` opmode via the RC.
2. Your bot should turn 180 degrees 5 times.
3. Don't touch the bot during the tuning process.
4. At the end of the tuning, the RC's telemetry should print an "effective track width".
5. If this number sounds reasonable (close to the actual physical track width), stick this number in your `DriveConstants.java` file under `TRACK_WIDTH`.
6. The bot should be turning close to 180 degrees every time once tuned.
7. If you bot runs into the following issues, you will have to tune manually:
   - It does not turn 180 degrees each time, even with tuning
   - The effective track width given does not print something reasonable (most likely a low number like 3)
     - This most likely caused by failing to put an initial estimate in the drive constants file. It's all good if you didn't.
8. To tune the track width manually, simply keep raising the track width yourself until it turns 180 degrees. If it overshoots, lower the track width.

<figure align="center">
    <img class="rounded-lg" src="./assets/drive-constants/wes-bot-edit-half.jpg" alt="Track width is the distance from the center of one wheel to the center of its parallel wheel">
    <figcaption class="mt-2 text-sm text-gray-600 text-center">3658 Bosons's 2019/20 Skystone Bot</figcaption>
</figure>
