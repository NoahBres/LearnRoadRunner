# Advanced Tips

## Async Following

The default `followTrajectory()` functions in the quickstart are synchronous. This means that the code will halt at that function and will not move on to the next line until the entire trajectory is finished. The default synchronous method works well in a Linear Opmode.

But what if you wanted to run something like a PID controller in the background to keep your lift at a certain height. You would use an iterative opmode and run all your code through a single loop function. You could not achieve this behavior with `followTrajectory()` as it is blocking.

Here is a simple example on how to achieve this behavior in an iterative opmode.

```java
public void init() {
  // Call the async follow method
  drive.followTrajectoryAsync(trajectory);
}

public void update() {
  // Call drive.update() and this will handle all the path following logic
  drive.update();

  // Update some lift PID controller or whatever
  lift.update();
}
```

### Chaining Async Trajectories

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
    .build()

  trajectory2 = drive.trajectoryBuilder(trajectory1.end())
    .lineTo(new Vector2d())
    .addDisplacementMarker(() -> drive.followTrajectoryAsync(trajectory3))
    .build()

  trajectory3 = drive.trajectoryBuilder(trajectory2.end())
    .lineTo(new Vector2d())
    .build()

  // Be sure to set the drive to follow the first trajectory in init
  drive.followTrajectoryAsync(trajectory1);
}

public void loop() {
  drive.update();
  lift.update(); // Update some lift pid in the background or whatever
}
```

There are a few downsides with this method. The follower by default has half a second after the motion profile is finished to correct the pose using the translational and heading PID. Chaining the trajectories like this will skip that end correction, although this is probably not useful in such a situation anyways.

In addition to that, you cannot add delays with this method. If you'd like to do something more complex, I would recommend orchestrating your trajectories using [Finite State Machines](https://gm0.copperforge.cc/en/stable/docs/software/fundamental-concepts.html?highlight=finest%20state%20machine).

## Overloading Constraints

**TODO: Come back and write this**

## Gain Scheduling

**TODO: Come back and write this**

## Interrupting a Live Trajectory

**TODO: Come back and write this**

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
        myLocalizer.setPoseEstimate(new Pose2d(10, 10, Math.toRadian(90)));

        waitForStart();

        while(opModeIsActive()) {
            // Make sure to call myLocalizer.update() on *every* loop
            // Increasing loop time by utilizing bulk reads and minimizing writes will increase your odometry accuracy
            myLocalizer.update();

            // Retrieve your pose
            Pose2d myPose = myLocalizer.getPoseEstimate();

            telemetry.addData("x", myPose.getX())
            telemetry.addData("y", myPose.getY())
            telemetry.addData("heading", myPose.getHeading())

            // Insert whatever teleop code you're using
        }
    }
}
```

### SampleMecanumDrive

If you don't need any features from `SampleMecanumDrive.java`, I would recommend simply using the Localizer object by itself to calculate your pose. However, if you are looking to use features from it (perhaps drive automation in teleop, or simply having your bot be drawn onto dashboard), then feel free to use `SampleMecanumDrive`. Be aware that `SampleMecanumDrive.java` sends it's own telemetry packets to dashboard so if you send your own telemetry to dashboard in your own opmode, it will conflict with these.

To use `SampleMecanumDrive` in your teleop, add the following in your opmode:

```java
public class MyTeleopOpmode extends LinearOpMode {
    public void runOpMode() {
        // Insert whatever initialization your own code does

        // Assuming you're using StandardTrackingWheelLocalizer.java
        // Switch this class to something else (Like TwoWheeTrackingLocalizer.java) if your configuration is different
        SampleMecanumDrive drive = new SampleMecanumDrive(hardwareMap);

        // Set your initial pose to x: 10, y: 10, facing 90 degrees
        drive.setPoseEstimate(new Pose2d(10, 10, Math.toRadian(90)));

        waitForStart();

        while(opModeIsActive()) {
            // Make sure to call myLocalizer.update() on *every* loop
            // Increasing loop time by utilizing bulk reads and minimizing writes will increase your odometry accuracy
            drive.update();

            // Retrieve your pose
            Pose2d myPose = drive.getPoseEstimate();

            telemetry.addData("x", myPose.getX())
            telemetry.addData("y", myPose.getY())
            telemetry.addData("heading", myPose.getHeading())

            // Insert whatever teleop code you're using
        }
    }
}
```

If you do plan to utilize any of the `SampleMecanumDrive` functions (`followTrajectory()` or `turn()`), I would recommend using the async following options.

### Note on `setPoseEstimate()`

If you run an auto before teleop, you most likely won't know your exact start position for teleop without odometry. Thus, you won't know what to set your initial pose estimate to. To ameliorate this issue, I would recommend tracking your pose in autonomous mode and write it to a variable in a static class. This static class should persist between opmodes. This is an easy way to transfer data between opmodes. Feel free to hit up the [FTC Discord](https://discord.gg/first-tech-challenge) if you need help implementing this.

(Or remind me and I will eventually write an example on how to do this)
