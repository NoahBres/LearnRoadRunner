# Advanced Tips

Advanced code samples can be found on the `advanced-examples` branch on my quickstart branch.
[https://github.com/NoahBres/road-runner-quickstart/tree/advanced-examples](https://github.com/NoahBres/road-runner-quickstart/tree/advanced-examples)

## Using Road Runner in Teleop

There are a number of reason why you'd want to use Road Runner in teleop. Perhaps you want to do some fancy teleop automation. I personally don't recommend this and believe that investing time into drive practice is worth a lot more but you are free to knock yourself out. The primary reason would be to reuse the localization features so you are able to know your pose in teleop. This can be used for certain drive augmentations such as auto adjusting the ring shooter velocity in the 2020-21 Ultimate Goal game.

> When I say that I don't recommend automating teleop, I am only referring to having your bot drive somewhere and perform tasks automatically in teleop. Generally a good human driver will be able to do this much faster with practice (although there are few exceptions: e.g. GF 11115 RR2 automation). I do however highly recommend automating certain physical mechanisms like intaking or lifts.

There are two ways to use Road Runner in teleop (assuming you're using the quickstart). Both are pretty easy.

### Just the Localizer

If you just need the localizer to read the pose, I would recommend simple initializing whatever localizer you're using just so you aren't calling extraneous code.

To do so, simply add the following in your opmode:

```java
public class MyTeleopOpmode extends LinearOpMode {
    public void runOpMode() {
        // Insert whatever initialization your own code does

        // This is assuming you're using StandardTrackingWheelLocalizer.java
        // Switch this class to something else (Like TwoWheeTrackingLocalizer.java) if your configuration is different
        StandardTrackingWheelLocalizer myLocalizer = new StandardTrackingWheelLocalizer(hardwareMap);

        // Set your initial pose to x: 10, y: 10, facing 90 degrees
        myLocalizer.setPoseEstimate(new Pose2d(10, 10, Math.toRadians(90)));

        waitForStart();

        while(opModeIsActive()) {
            // Make sure to call myLocalizer.update() on *every* loop
            // Increasing loop time by utilizing bulk reads and minimizing writes will increase your odometry accuracy
            myLocalizer.update();

            // Retrieve your pose
            Pose2d myPose = myLocalizer.getPoseEstimate();

            telemetry.addData("x", myPose.getX());
            telemetry.addData("y", myPose.getY());
            telemetry.addData("heading", myPose.getHeading());

            // Insert whatever teleop code you're using
        }
    }
}
```

Full sample opmode can be found [here](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/TeleOpJustLocalizer.java). This sample includes the static field data persistence described below.

### SampleMecanumDrive

If you don't need any features from `SampleMecanumDrive.java`, I would recommend simply using the Localizer object by itself to calculate your pose. However, if you are looking to use features from it (perhaps drive automation in teleop, or simply having your bot be drawn onto dashboard), then feel free to use `SampleMecanumDrive`.

To use `SampleMecanumDrive` in your teleop, add the following in your opmode:

```java
public class MyTeleopOpmode extends LinearOpMode {
    public void runOpMode() {
        // Insert whatever initialization your own code does

        // Assuming you're using StandardTrackingWheelLocalizer.java
        // Switch this class to something else (Like TwoWheeTrackingLocalizer.java) if your configuration is different
        SampleMecanumDrive drive = new SampleMecanumDrive(hardwareMap);

        // Set your initial pose to x: 10, y: 10, facing 90 degrees
        drive.setPoseEstimate(new Pose2d(10, 10, Math.toRadians(90)));

        waitForStart();

        while(opModeIsActive()) {
            // Make sure to call drive.update() on *every* loop
            // Increasing loop time by utilizing bulk reads and minimizing writes will increase your odometry accuracy
            drive.update();

            // Retrieve your pose
            Pose2d myPose = drive.getPoseEstimate();

            telemetry.addData("x", myPose.getX());
            telemetry.addData("y", myPose.getY());
            telemetry.addData("heading", myPose.getHeading());

            // Insert whatever teleop code you're using
        }
    }
}
```

If you do plan to utilize any of the `SampleMecanumDrive` functions (`followTrajectory()` or `turn()`), I would recommend using the async following options.

Full sample opmode can be found [here](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/TeleOpDrive.java). This sample includes the static field data persistence (described below) and using `SampleMecanumDrive` to control the bot via the gamepad, if you wanted to use this method in teleop.

## Transferring Pose Between Opmodes

If you wish to read your localizer's pose during teleop, you need to know where your initial pose is. If an initial pose is not set, the program will assume you start at x: 0, y: 0, and heading: 0, which is most likely not what you want. So, to know where you are teleop, you must know where you ended in auto. You must transfer the pose data from where you ended in auto to your teleop. How do we go about doing this? Via [Java static fields](https://beginnersbook.com/2013/04/java-static-class-block-methods-variables/). Java static variables are shared among all objects at the class level. They're essentially global variables. Thus, static variables persist between opmodes. We can take advantage of this to pass data between autonomous opmodes and teleop.

First, create your static field that stores a `Pose2d` object. We do so with a really simple `PoseStorage` class

```java
/* Lines 10-12 in PoseStorage.java */
public class PoseStorage {
    // See this static keyword? That's what lets us share the data between opmodes.
    public static Pose2d currentPose = new Pose2d();
}
```

That's pretty much the gist of it. Now every class can write and read to this object. At the end of your autonomous mode, set `PoseStorage.currentPose` to the latest pose estimate. Like so:

```java
/* Line 66 in AutoTransferPose.java */
PoseStorage.currentPose = drive.getPoseEstimate();
```

If you want to use the pose in teleop, simply read from this static field.

```java
/* Line 31 in TeleOpJustLocalizer.java */
myLocalizer.setPoseEstimate(PoseStorage.currentPose);
```

Full samples can be found in the following files:

- [teamcode/drive/advanced/TeleOpJustLocalizer.java](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/TeleOpJustLocalizer.java)
- [teamcode/drive/advanced/AutoTransferPose.java](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/AutoTransferPose.java)
- [teamcode/drive/advanced/PoseStorage.java](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/PoseStorage.java)

There are a few caveats with this method. The most obvious one being that your data is cleared if you close the app. This means that if your app were to suddenly crash during auto, your teleop would not know where it is. This isn't a huge issue as your app should not be regularly crashing in the first place. However, this edge case can be solved by writing the pose to disk or Android's provided database. I wouldn't bother implementing this though.

Another downside is that this sample only sends the pose to `PoseStorage` at the end of the opmode. If your bot is pushed or the opmode crashes (just the opmode, not the whole app. so you're still able to start teleop), then the opmode never sends the pose to `PoseStorage`. To fix this issue, you may want to send your pose estimate to `PoseStorage` on every update. This requires asynchronous following. See the example below, or [Finite State Machine Following](#finite-state-machine-following) for a full opmode sample.

### Field Centric Drive

Implementing field centric drive on top of the standard drive code is quite simple. You simply take your desired vector and rotate it by the bot's current heading. Here's a quick example:

```java
// Read pose
Pose2d poseEstimate = drive.getPoseEstimate();

// Create a vector from the gamepad x/y inputs
// Then, rotate that vector by the inverse of that heading
Vector2d input = new Vector2d(
        -gamepad1.left_stick_y,
        -gamepad1.left_stick_x
).rotated(-poseEstimate.getHeading());

// Pass in the rotated input + right stick value for rotation
// Rotation is not part of the rotated input thus must be passed in separately
drive.setWeightedDrivePower(
        new Pose2d(
                input.getX(),
                input.getY(),
                -gamepad1.right_stick_x
        )
);
```

A full sample can be found [here](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/TeleOpFieldCentric.java).

### Align To Point

This is a really cool demo that doesn't necessarily depend on Road Runner's core functionality (motion profiling, etc.) but it does make heavy use of Road Runner utilities. It would be fairly trivial to port this to one's own code without any Road Runner dependencies.

The demo allows a driver to enter a "align to point" mode which switches into field centric mode and then the opmode takes over heading control and independently controls heading to align the bot to a specified point.

Check out the opmode [here](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/TeleOpAlignWithPoint.java).

## Async Following

The default `followTrajectory()` functions in the quickstart are synchronous. This means that the code will halt at that function and will not move on to the next line until the entire trajectory is finished. The default synchronous method works well in a Linear Opmode.

But what if you wanted to run something like a PID controller in the background to keep your lift at a certain height? You would use an iterative opmode and run all your code through a single loop function. You could not achieve this behavior with `followTrajectory()` as it is blocking.

Here is a simple example on how to achieve this behavior in an iterative opmode.

```java
public void init() {
  // Call the async follow method
  drive.followTrajectoryAsync(trajectory);
}

public void loop() {
  // Call drive.update() and this will handle all the path following logic
  drive.update();

  // Update some lift PID controller or whatever
  lift.update();
}
```

## Chaining Async Trajectories

(Tbh you shouldn't be doing this but it's an easy hack. Check the following sample for the proper, albeit more complicated, method)

If you want to follow multiple trajectories while following the async method, I would recommend simply chaining them through an inline displacement marker.

```java
Trajectory trajectory1;
Trajectory trajectory2;
Trajectory trajectory3;

public void init() {
  trajectory1 = drive.trajectoryBuilder(new Pose2d())
    .lineTo(new Vector2d())
    .addDisplacementMarker(() -> drive.followTrajectoryAsync(trajectory2))
    // Basically just tells RR to follow the next trajectory at the end of this one
    .build();

  trajectory2 = drive.trajectoryBuilder(trajectory1.end())
    .lineTo(new Vector2d())
    .addDisplacementMarker(() -> drive.followTrajectoryAsync(trajectory3))
    .build();

  trajectory3 = drive.trajectoryBuilder(trajectory2.end())
    .lineTo(new Vector2d())
    .build();

  // Be sure to set the drive to follow the first trajectory in init
  drive.followTrajectoryAsync(trajectory1);
}

public void loop() {
  drive.update();
  lift.update(); // Update some lift pid in the background or whatever
}
```

There are a few downsides with this method. The follower by default has half a second after the motion profile is finished to correct the pose using the translational and heading PID. Chaining the trajectories like this will skip that end correction, although this is probably not useful in such a situation anyways.

In addition to that, you cannot add delays or turns with this method. For a proper implementation of this behavior, you will want to orchestrate your movements via a finite state machine. See the following example for further deatils on that.

## Finite State Machine Following

Finited state machines are a very simple but incredibly powerful pattern that makes it very easy for us to orchestrate complex behaviors. For further information on finite state machines, check out [gm0's page on them](https://gm0.copperforge.cc/en/stable/docs/software/finite-state-machines.html). There is also a [fairly old but very informative video](https://www.youtube.com/watch?v=Pu7PMN5NGkQ) made specifically in the context of FTC. Highly recommend you check it out.

This [sample opmode](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/AsyncFollowingFSM.java), located in the advanced examples branch, demonstrates how one would create a rudimentary FSM to follow multiple trajectories, wait between trajectories, and turn between trajectories, all while updating everything asynchronously. The asynchronous nature of state machines allows one to run multiple state machines in parallel for complex subsystems or simply one's own logic in the background. The example also demonstrates sending the pose to `PoseStorage` on every loop, solving the issue previously described at the end of [Transferring Pose Between Opmodes](#transferring-pose-between-opmodes).

## Admissible Error and Timeout

Motion profiles, thus Road Runner trajectories, are fundamentally time based. This means that Road Runner will decide when it finishes following the path based on an internal timer. If your following isn't perfect (it will not be), we cannot ensure that a time based exit condition is sufficient.

However, Road Runner's default follower, adds an admissible error and timeout condition by default. This means that once the motion profile is exhausted, Road Runner will provide an additional `x` seconds or wait until an "admissible error" is met, to finish the following for the trajectory. During this time, the follower PIDs are the only controllers acting upon the bot.

By default, the follower provides a `0.5` second timeout and an admissible error pose of `0.5in` in the x/y direction and `5 deg` of heading. This means that the trajectory allows for half an inch of position error and 5 degrees of heading error by default. If you wish to increase accuracy, try increasing the timeout and decreasing the admissible error pose. These can be found in `SampleMecanumDrive` where [follower is initialized](https://github.com/acmerobotics/road-runner-quickstart/blob/72200c7b0ab983a4e610977b46151c5d54b55b9c/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/SampleMecanumDrive.java#L121). The second to last parameter is admissible error and the last parameter is the timeout.

```java
/* Lines 120-121 in SampleMecanumDrive.java */
follower = new HolonomicPIDVAFollower(TRANSLATIONAL_PID, TRANSLATIONAL_PID, HEADING_PID,
    new Pose2d(0.5, 0.5, Math.toRadians(5.0)), 0.5);
//   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   ^^^
//            Admissible Error Pose          Timeout (seconds)
```

<div class="flex justify-center w-full py-10 align-center">
  <img src="/assets/advanced/termination-flow.svg" width="500px" class="p-12 border border-blue-200 rounded-md" style="box-shadow: inset 0 2px 9px 0px rgb(0 0 0 / 6%)">
</div>

## 180° Turn Direction

When you turn 180° using the `drive.turn(angle)` function, how do you specify which direction the bot should turn? For every other angle, we can assume that it will turn using the shortest angle. However, a 180° turn is ambiguous. If you want to specify which direction the bot should turn, you add or substract an infinitesimal value from 180°. Like so:

```java
// Turns counter clockwise
drive.turn(Math.toRadians(180) + 1e-6);

// Turns clockwise
drive.turn(Math.toRadians(180) - 1e-6);
```

This seems quite hacky but it is the blessed method.

## Gain Scheduling

**TODO: Come back and write this**

## Interrupting a Live Trajectory

There may be an instance where you want to arbitrarily break out of a trajectory. The only reason that this should be applicable in is the example below. This behavior requires one to edit the `SampleMecanumDrive` class and implement a function that forces the `mode` into `IDLE`.

This [sample opmode](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/AutoBreakTrajectory.java) along with the following modified classes:

- [`SampleMecanumDriveCancelable`](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/SampleMecanumDriveCancelable.java)
- [`TrajectorySequenceRunnerCancelable`](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/TrajectorySequenceRunnerCancelable.java)

These modified classes simply implement a `breakFollowing()` function that breaks out of following. Copy these into your project.

This will be used in the next sample.

## Automatic Driving in Teleop

**WARNING: THIS IS A DEMONSTRATION OF ROAD RUNNER'S CAPABILITIES. I DO NOT RECOMMEND DOING THIS IN GAME**

This [sample opmode](https://github.com/NoahBres/road-runner-quickstart/blob/advanced-examples/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/advanced/TeleOpAugmentedDriving.java) demonstrates how one can augment driver control by following
arbitrary Road Runner trajectories at any time during teleop. This really isn't recommended at
all. This is not what Trajectories are meant for. A path follower is more suited for this
scenario. This sample primarily serves as a demo showcasing Road Runner's capabilities. However, it is a cool demo and demonstrates how one can combine the "Finite State Machine" sample along with the "Interrupting a Live Trajectory" sample to create complex behaviors.

Further details on what the demo does can be found in the comments of the opmode.

## OmniWheels ##

OmniWheels arranged with one wheel on each side of a four-sided robot work just like Mecanum wheels arranged in the standard GoBilda manner.  Conceptually, the front of the robot will be halfway between two of the OmniWheels.  When oriented with the corner of the robot to the front, the OmniWheels will correspond with the Mecanum wheels.
