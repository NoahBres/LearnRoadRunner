---
meta:
  - description: Configure your RoadRunner Drive Constants file
---

# Drive Constants

::: tip
Here is the drive constants file you will be editing.

[DriveConstants.java](https://github.com/acmerobotics/road-runner-quickstart/blob/master/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/DriveConstants.java)

If you haven't copied the file over to your own project yet, please do so!

Try out the configurator to have your constants class auto configured!
:::

<ModalWrapper>
  <template v-slot:button="buttonSlotProps">
    <button class="action-button block m-auto" @click="buttonSlotProps.openModal">Configure Me!</button>
  </template>
  <template v-slot:modal="modalSlotProps">
    <Modal :isOpen="modalSlotProps.isOpen" :closeModal="modalSlotProps.closeModal">
      <DriveConstants-ConfigurationModal />
    </Modal>
  </template>
</ModalWrapper>

If you want to quickly get a constants file up and running, I recommend clicking the configurator button above to automatically generate your drive constants file. We will be going through what each constant means one by one below.

<figure align="center">
    <img src="./assets/drive-constants/YouAreHere-DriveConstants-quarter.png">
    <figcaption style="marginTop: 1em;">You are here</figcaption>
</figure>

## Ticks Per Rev & Max RPM

```java
/* Lines 24-25 in DriveConstants.java */
public static final double TICKS_PER_REV = 1;
public static final double MAX_RPM = 1;
```

**`TICKS_PER_REV`** is the number of "ticks" the motors' encoders will count per revolution. You will find the specs of your drive train motors on the manufacturer's site. For goBILDA's 5202 motors, be sure to use the `Encoder Countable Events Per Revolution (Output Shaft)` number listed on each motor's page. For a few of the non-goBILDA motors, a list of revelant specs are listed below because they do not make them obviously accessible on the site. Thank you goBILDA for being awesome.

<div class="flex justify-center">

| Motor                       | Ticks Per Rev | Max RPM |
| --------------------------- | :-----------: | ------: |
| REV HD Hex 40:1 Spur        |     1120      |     150 |
| REV HD Hex 20:1 Spur        |      560      |     300 |
| REV HD Hex 20:1 Planetary\* |     537.6     |   312.5 |
| NeveRest Classic 60         |     1680      |     105 |
| NeveRest Classic 40         |     1120      |     160 |
| NeveRest Orbital 20\*       |     537.6     |     349 |
| NeveRest Orbital 3.7        |     103.6     |    1780 |
| TETRIX TorqueNADO 60:1      |     1440      |     100 |
| TETRIX TorqueNADO 40:1      |      960      |     150 |
| TETRIX TorqueNADO 20:1      |      480      |     480 |

</div>

**`MAX_RPM`** is the maximum RPM that the motor can reach at the recommended voltage (12v). The maximum RPM specced on the manufacturer's website will be optimistic (wrong) and your motor most likely will not reach these speeds. Vex has performed [comprehensive tests on various bare motors](https://motors.vex.com/#testing). It would be optimal to test the max RPM of your motors and use that instead of the listed specs. However, you'll get by without doing anything fancy. Just a small optimization tip if you want to strive for absolute peak performance.

\*Although these motors are labeled as having a 20:1 ratio they actually have a 19.2:1 ratio because they are planetary gears, thus the difference in speeds/ticks compared to the 20:1 spur motors.

## Run Using Encoder & Motor Velo PID

```java
/* Lines 31-32 in DriveConstants.java */
public static final boolean RUN_USING_ENCODER = true;
public static final PIDCoefficients MOTOR_VELO_PID = null;
```

**`RUN_USING_ENCODER`** indicates whether or not you want to utilize the `RUN_USING_ENCODER` [RunMode](https://ftc-tricks.com/dc-motors/) built into the FTC SDK. This makes use of the onboard velocity PID, allowing you to control the motor via velocity rather than "power" (voltage). Setting this value to true will automatically set all the motors to use this velocity controlled mode. `RUN_USING_ENCODER` can only be utilized if you are using drive train encoders. Set this value to `false` if you are not using drive encoders.

**`MOTOR_VELO_PID`** will store the PID values you will use. The default PID values are tuned based on the motors free-spinning without any load. The default values will be too low for a drive train. Leave this at `null` for now. We will set these values later.

<HideAyudeWrapper :skipIfDriveEncoders="true">
::: warning
Earlier you indicated that you are not utilizing drive encoders. Set `RUN_USING_ENCODER` to `false` and `MOTOR_VELO_PID` to `null`
:::
</HideAyudeWrapper>

## Wheel Radius/Gear Ratio/TrackWidth

```java
/* Lines 42-44 in DriveConstants.java */
public static double WHEEL_RADIUS = 2; // in
public static double GEAR_RATIO = 1; // output (wheel) speed / input (motor) speed
public static double TRACK_WIDTH = 1; // in
```

**`WHEEL_RADIUS`** is the radius of the wheels on your drive train. Make sure this is the radius, not diameter.

**`GEAR_RATIO`** is the ratio of the output (wheel) speed to input (motor) speed. If you are using direct drive—no gears/belts—`GEAR_RATIO` should be `1`. A gear ratio more than 1 will indicate that your wheel spins faster than your motor. A gear ratio less than one will indicate that your wheel spins slower than your motor. For example, the goBILDA strafer kit includes a set of 1:2 bevel gears, reducing your output speed by half. So your gear ratio will be `1/2` or `0.5`.

**`TRACK_WIDTH`** is the distance from the center of one wheel to the center of its parallel wheel. This number only need be an estimate. You will empirically tune this later.

<figure align="center">
    <img src="./assets/drive-constants/wes-bot-edit-half.jpg">
    <figcaption style="marginTop: 1em;">3658 Bosons's 2019/20 Skystone Bot</figcaption>
</figure>

## kV/kA/kStatic

```java
/* Lines 52-54 in DriveConstants.java */
public static double kV = 1.0 / rpmToVelocity(MAX_RPM);
public static double kA = 0;
public static double kStatic = 0;
```

These are your feedforward gains used to model your drive motors. These will be tuned later if you opt for the feedforward method. Leave these variables as is.

**`kV`** Volts \* Seconds / Meters. The theoretical value of `kV` is 12 volts divided by the theoretical free speed of your drive train motors. Leave this as is.

**`kA`** Volts \* Seconds^2 / Meters.

**`kStatic`** Volts.

Further details on the motor model can be found in [_Controls Engineering in FRC_ by Tyler Veness](https://file.tavsys.net/control/controls-engineering-in-frc.pdf). The effects of these constants will be explained later.

<HideAyudeWrapper :skipIfDriveEncoders="false">
::: warning
Earlier you indicated that you are using drive encoders. You will not be touching this section.
:::
</HideAyudeWrapper>

## Base Constraints

```java
/* Lines 64-67 in DriveConstants.java */
public static DriveConstraints BASE_CONSTRAINTS = new DriveConstraints(
  30.0, 30.0, 0.0,
  Math.toRadians(180.0), Math.toRadians(180.0), 0.0
);
```

The parameters Drive Constraints take are:

<code class="inline-block">DriveConstraints(<span class="bg-red-300 text-gray-800 rounded" style="padding: 0.15rem 0.4rem;">maxVelo</span>, <span class="bg-blue-300 text-gray-800 rounded" style="padding: 0.15rem 0.4rem;">maxAccel</span>, <span class="bg-green-300 text-gray-800 rounded" style="padding: 0.15rem 0.4rem;">maxJerk</span>, <span class="bg-orange-300 text-gray-800 rounded" style="padding: 0.15rem 0.4rem;">maxAngVelo</span>, <span class="bg-purple-300 text-gray-800 rounded" style="padding: 0.15rem 0.4rem;">maxAngAccel</span>, <span class="bg-yellow-300 text-gray-800 rounded" style="padding: 0.15rem 0.4rem;">maxAngJerk</span>)</code>

<div class="w-1 h-4"></div>

<span class="bg-red-300 text-gray-800 rounded" style="padding: 0.25rem 0.5rem;">maxVelo</span> defines the maximum velocity that the robot can go. This is the fastest speed that the robot can ramp up to. The default value is `30in/s`. You can calculate the maximum velocity for your bot using the following equation:

<figure align="center" class="py-10">
  <img src="./assets/drive-constants/max-vel-latex-half.png" />
  <figcaption style="marginTop: 1em;">Max Velocity Equation (per second)</figcaption>
</figure>

It is recommended that you keep your maximum velocity constraint not exceed 80% of the motors' max velocity. Your bot will most likely not be able to follow at 100% of the theoretical velocity due to a number of reasons: voltage dropping as your battery dies, weight, etc. You may push this limit closer to 100% but your trajectory following will suffer if your bot is not able to reach the given velocity.

<span class="bg-blue-300 text-gray-800 rounded" style="padding: 0.25rem 0.5rem;">maxAccel</span> defines the maximum acceleration that the robot will undergo. This is the speed at which the velocity ramps up. The default value is `30in/s^2`. The recommendation is to just initially keep this value the same number as your max velocity value, although this is quite arbitrary. The only way to find your max acceleration is through experimentation. Keep raising the max acceleration until your path following starts to suffer. Do this after tuning just to make things easier. You may need to retune your PID values if you change this.

<span class="bg-green-300 text-gray-800 rounded" style="padding: 0.25rem 0.5rem;">maxJerk</span> defines the maximum jerk that the robot can undergo. [Jerk](<https://www.wikiwand.com/en/Jerk_(physics)>) is the derivative of acceleration. Leave this at zero unless you know what you're doing.

<span class="bg-orange-300 text-gray-800 rounded" style="padding: 0.25rem 0.5rem;">maxAngVelo</span> defines the maximum angular velocity that the robot can go. This is the fastest speed that the robot can turn. The default value is `180°/s`. You can calculate the maximum angular velocity by dividing the maximum tangential velocity (max velo) by your track width. However, you should probably just leave this as is.

<span class="bg-purple-300 text-gray-800 rounded" style="padding: 0.25rem 0.5rem;">maxAngAccel</span> defines the maximum angular acceleration that the robot can undergo. This is the fastest that the robot's angular velocity can ramp up. The default value is `180°/s^2`. This can only be found through tuning. However, it is a bit difficult to empirically determine this so just leave this as is.

<span class="bg-yellow-300 text-gray-800 rounded" style="padding: 0.25rem 0.5rem;">maxAngJerk</span> defines the maximum angular jerk that the robot can undergo. [Jerk](<https://www.wikiwand.com/en/Jerk_(physics)>) is the derivative of acceleration. Leave this at zero unless you know what you're doing.

## SampleMecanumDrive - Hardware ID's

Open your `SampleMecanumDrive.java` file.

```java
/* Lines 117-120 in SampleMecanumDrive.java */
leftFront = hardwareMap.get(DcMotorEx.class, "leftFront");
leftRear = hardwareMap.get(DcMotorEx.class, "leftRear");
rightRear = hardwareMap.get(DcMotorEx.class, "rightRear");
rightFront = hardwareMap.get(DcMotorEx.class, "rightFront");
```

Ensure that these motor ID's match up with your Rev Hub config ID's.

## SampleMecanumDrive - Motor Direction

Then, look at line 140. There should be a comment stating "`// TODO: reverse any motors using DcMotor.setDirection()`".
Under that comment, you will reverse the directions of the motors on one side of your bot. If your bot spins in circles during straight test, come back here to fix it. If your bot turns the opposite way, come back here to fix this.

```java
/* About line 140-143 in SampleMecanumDrive.java */

// TODO: reverse any motors using DcMotor.setDirection()
leftFront.setDirection(DcMotorSimple.Direction.REVERSE);
leftRear.setDirection(DcMotorSimple.Direction.REVERSE);
```
