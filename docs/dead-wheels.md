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

## Two-Wheel Odometry

If you opt for the two wheel configuration, you will be using a gyroscope of your choice as the source for your heading. By default, you will be using the REV Hub's internal BNO055 gyroscope.

Feel free to use your own gyroscope. Simply declare it in `SampleMecanumDrive.java` and override the `getRawExternalHeading()` function.

Download [this file](https://github.com/NoahBres/road-runner-quickstart/blob/master/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/TwoWheelTrackingLocalizer.java) and stick it in your `TeamCode` folder, preferably next to the `StandardTrackingWheelLocalizer.java` file just for organizational purposes.

Open the `TwoWheelTrackingLocalizer.java` file to edit

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

## Tuning
