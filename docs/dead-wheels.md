---
meta:
  - description: Configure and tune your dead wheels
---

# Dead Wheels

::: warning
If you are not using dead wheels, skip this section.
:::

<figure align="center">
    <img src="./assets/dead-wheels/YouAreHere-dead-wheels-quarter.png">
</figure>

Your configuration will depend on whether you have two or three dead-wheels. Don't know the difference? Check [the FAQ](/#what-is-the-difference-between-two-and-three-wheel-odometry).

If you're using a two-wheel setup, read only the [two-wheel odometry section](#two-wheel-odometry).

If you're using a three-wheel setup, read only the [three-wheel odometry section](#three-wheel-odometry).

## Two-Wheel Odometry

If you opt for the two wheel configuration, you will be using a gyroscope of your choice as the source for your heading. By default, you will be using the REV Hub's internal BNO055 gyroscope.

Feel free to use your own gyroscope. Simply declare it in `SampleMecanumDrive.java` and override the `getRawExternalHeading()` function.

Download [this file](https://github.com/NoahBres/road-runner-quickstart/blob/master/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/TwoWheelTrackingLocalizer.java) and stick it in your `TeamCode` folder, preferably next to the `StandardTrackingWheelLocalizer.java` file just for organizational purposes.

Open the `TwoWheelTrackingLocalizer.java` file (that you just downloaded) to edit.

### Ticks Per Rev/Wheel Radius/Gear Ratio

```java
/* Lines 33-35 in TwoWheelTrackingLocalizer.java */
public static double TICKS_PER_REV = 0;
public static double WHEEL_RADIUS = 2; // in
public static double GEAR_RATIO = 1; // output (wheel) speed / input (encoder) speed
```

**`TICKS_PER_REV`** is the number of "ticks" the encoders will count per revolution. You will find the specs of your encoders on your manufacturer's site. Be sure to find the `Counts Per Revolution` or `CPR`. The REV Through Bore Encoder has a `TICKS_PER_REV` of `8192`.

**`WHEEL_RADIUS`** is the radius of the dead wheel. Make sure this is the radius, not diameter.

**`GEAR_RATIO`** is the ratio of the output (wheel) speed to input (encoder) speed. If you are not gearing you encoders, leave this at 1.

### Parallel/Perpendicular X/Y

```java
/* Lines 33-35 in TwoWheelTrackingLocalizer.java */
public static double PARALLEL_X = 0; // X is the forward and back direction
public static double PARALLEL_Y = 0; // Y is the strafe direction

public static double PERPENDICULAR_X = 0; // X is the forward and back direction
public static double PERPENDICULAR_Y = 0; // Y is the strafe direction
```

Put in the X/Y coordinates of your perpendicular and parallel wheels. Remember that the X axis is the forward/back direction and the Y axis is the left/right direction. This is fairly standard for robotics/aviation/etc.

<figure align="center">
    <img src="./assets/dead-wheels/andrew-bot-wheel-location-quarter.jpg">
    <figcaption style="marginTop: 1em;">17508 Rising Tau's 2019/20 Skystone Bot</figcaption>
</figure>

### Hardware ID's

```java
/* Lines 56-57 in TwoWheelTrackingLocalizer.java */
parallelEncoder = hardwareMap.dcMotor.get("parallelEncoder");
perpendicularEncoder = hardwareMap.dcMotor.get("perpendicularEncoder");
```

Ensure that these ID's match up with your Rev Hub config ID's.

### IMU

```java
/* Lines 108-111 in SampleMecanumDrive.java */
imu = hardwareMap.get(BNO055IMU.class, "imu");
BNO055IMU.Parameters parameters = new BNO055IMU.Parameters();
parameters.angleUnit = BNO055IMU.AngleUnit.RADIANS;
imu.initialize(parameters);
```

Ensure that the IMU is initialitzed in the `SampleMecanumDrive.java` class. You shouldn't need to change anything if you downloaded the quickstart.

### Set Localizer in SampleMecanumDrive

After you've configured your localizer, go back to the `SampleMecanumDrive.java` file.

Look at about line 143. You should find a comment stating "`// TODO: if desired, use setLocalizer() to change the localization method`"

Under this comment, add the following line:

```java
/* About line 143 in SampleMecanumDrive.java */

// TODO: if desired, use setLocalizer() to change the localization method
// for instance, setLocalizer(new ThreeTrackingWheelLocalizer(...));

setLocalizer(new TwoWheelTrackingLocalizer(hardwareMap));
```

You have set the localizer!

## Three-Wheel Odometry

If you opt for the three wheel configuration, you will be using the two parallel wheels as the source for your heading.

Open up the `StandardTrackingWHeelLocalizer.java` file.

### Ticks Per Rev/Wheel Radius/Gear Ratio

```java
/* Lines 29-30 in StandardTrackingWheelLocalizer.java */
public static double TICKS_PER_REV = 0;
public static double WHEEL_RADIUS = 2; // in
public static double GEAR_RATIO = 1; // output (wheel) speed / input (encoder) speed
```

**`TICKS_PER_REV`** is the number of "ticks" the encoders will count per revolution. You will find the specs of your encoders on your manufacturer's site. Be sure to find the `Counts Per Revolution` or `CPR`. The REV Through Bore Encoder has a `TICKS_PER_REV` of `8192`.

**`WHEEL_RADIUS`** is the radius of the dead wheel. Make sure this is the radius, not diameter.

**`GEAR_RATIO`** is the ratio of the output (wheel) speed to input (encoder) speed. If you are not gearing you encoders, leave this at 1.

### Lateral Distance/Forward Offset

```java
/* Lines 33-34 in StandardTrackingWheelLocalizer.java */
public static double LATERAL_DISTANCE = 10; // in; distance between the left and right wheels
public static double FORWARD_OFFSET = 4; // in; offset of the lateral wheel
```

`LATERAL_DISTANCE` is the distance from the left and right wheels.

`FORWARD_OFFSET` is the distance from the lateral wheel to the middle wheel. The `FORWARD_OFFSET` is positive when in front of the wheels and negative when behind the wheels (closer to the back).

<figure align="center">
    <img src="./assets/dead-wheels/andrew-bot-forward-offset-quarter.jpg">
    <figcaption style="marginTop: 1em;">17508 Rising Tau's 2019/20 Skystone Bot</figcaption>
</figure>

### Set Localizer in SampleMecanumDrive

After you've configured your localizer, go back to the `SampleMecanumDrive.java` file.

Look at about line 143. You should find a comment stating "`// TODO: if desired, use setLocalizer() to change the localization method`"

Under this comment, add the following line:

```java
/* About line 143 in SampleMecanumDrive.java */

// TODO: if desired, use setLocalizer() to change the localization method
// for instance, setLocalizer(new ThreeTrackingWheelLocalizer(...));

setLocalizer(new StandardTrackingWheelLocalizer(hardwareMap));
```

You have set the localizer!

## Tuning - Two-Wheel

Tuning your dead wheels is one of the most important steps along the entire tuning process. This is not constrained to Road Runner. Any time you choose to use Dead Wheels, whether it be in Road Runner, FTCLib, or your own home brew path following, your localization should be as accurate as possible.

### Adjusting the wheel radius

This isn't quite necessary for everyone. You may choose to skip over this section. However, I did find that this process would increase localization accuracy by an additional 1% or so. 1% may not sound like much but over 100 inches that is an entire inch. During the FTC Skystone (2019-2020) season, a 4-5 stone autonomous programmed traveled well over 100 inches and an entire inch of extra accuracy may have made a big difference.

1. First, open up the `TwoWheelTrackingLocalizer.java`
2. Declare two variables, `X_MULTIPLIER` and `Y_MULTIPLIER`, in your class:

```java
/* Lines 42-43 in TwoWheelTrackingLocalizer.java */
public static double X_MULTIPLIER = 1; // Multiplier in the X direction
public static double Y_MULTIPLIER = 1; // Multiplier in the Y direction
```

A finished example of where these go may be found [here](https://gist.github.com/NoahBres/02e83f8317f34d7b627170c2031b2ebf).

3. Add these mulitpliers to the `getWheelPositions()` function like so:

```java
/* Lines 71-76 in TwoWheelTrackingLocalizer.java */
@Override
public List<Double> getWheelPositions() {
    return Arrays.asList(
            encoderTicksToInches(parallelEncoder.getCurrentPosition()) * X_MULTIPLIER,
            encoderTicksToInches(perpendicularEncoder.getCurrentPosition()) * Y_MULTIPLIER
    );
}
```

4. You will begin the physical tuning process. Clear a straight line for your bot to travel in. I used a 90in stretch of field tiles.

5. Set your bot at the beginning of this stretch, facing forward.

6. Run the `LocalizationTest` opmode. Do not touch the controller.

7. Slowly drag your bot along this stretch. Keep the bot as straight as possible. I set a measuring tape below the entire stretch and kept the wheels as parallel as possible to this measuring tape.

8. Once you reach the end of your stretch, stop. Measure the distance traveled. Then look at the distance reported on the telemetry on the RC.

9. Your multiplier will be the `Measured Distance` / `Telemetry Distance Traveled` . For example, if your telemetry reports 89 inches but your tape measure reports 90 inches, your multiplier will be `1.01123596`.

10. I repeated this process 3 times for the forward direction to get the average multiplier. Then, set the `X_MULTIPLIER` to this value.

11. Repeat the same process but in the strafing direction.

12. Set `Y_MULTIPLIER` to the calculated strafe multiplier.

### Double Checking

## Tuning - Three-Wheel

Tuning your dead wheels is one of the most important steps along the entire tuning process. This is not constrained to Road Runner. Any time you choose to use Dead Wheels, whether it be in Road Runner, FTCLib, or your own home brew path following, your localization should be as accurate as possible.

### Adjusting the wheel radius

This isn't quite necessary for everyone. You may choose to skip over this section. However, I did find that this process would increase localization accuracy by an additional 1% or so. 1% may not sound like much but over 100 inches that is an entire inch. During the FTC Skystone (2019-2020) season, a 4-5 stone autonomous programmed traveled well over 100 inches and an entire inch of extra accuracy may have made a big difference.

1. First, open up the `TwoWheelTrackingLocalizer.java`
2. Declare two variables, `X_MULTIPLIER` and `Y_MULTIPLIER`, in your class:

```java
/* Lines 36-37 in StandardTrackingWheelLocalizer.java */
public static double X_MULTIPLIER = 1; // Multiplier in the X direction
public static double Y_MULTIPLIER = 1; // Multiplier in the Y direction
```

A finished example of where these go may be found [here](https://gist.github.com/NoahBres/9b9710eaa9f9fd23efa30a16de0f610e).

3. Add these mulitpliers to the `getWheelPositions()` function like so:

```java
/* Lines 58-65 in StandardTrackingWheelLocalizer.java */
@Override
public List<Double> getWheelPositions() {
    return Arrays.asList(
            encoderTicksToInches(leftEncoder.getCurrentPosition()) * X_MULTIPLIER,
            encoderTicksToInches(rightEncoder.getCurrentPosition()) * X_MULTIPLIER,
            encoderTicksToInches(frontEncoder.getCurrentPosition()) * Y_MULTIPLIER
    );
}
```

4. You will begin the physical tuning process. Clear a straight line for your bot to travel in. I used a 90in stretch of field tiles.

5. Set your bot at the beginning of this stretch, facing forward.

6. Run the `LocalizationTest` opmode. Do not touch the controller.

7. Slowly drag your bot along this stretch. Keep the bot as straight as possible. I set a measuring tape below the entire stretch and kept the wheels as parallel as possible to this measuring tape.

8. Once you reach the end of your stretch, stop. Measure the distance traveled. Then look at the distance reported on the telemetry on the RC.

9. Your multiplier will be the `Measured Distance` / `Telemetry Distance Traveled` . For example, if your telemetry reports 89 inches but your tape measure reports 90 inches, your multiplier will be `1.01123596`.

10. I repeated this process 3 times for the forward direction to get the average multiplier. Then, set the `X_MULTIPLIER` to this value.

11. Repeat the same process but in the strafing direction.

12. Set `Y_MULTIPLIER` to the calculated strafe multiplier.

### Double Checking
