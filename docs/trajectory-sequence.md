# Trajectory Sequence

As of May 6, 2021, the [Road Runner quickstart](https://github.com/acmerobotics/road-runner-quickstart/tree/quickstart1) includes a utility referred to as "trajectory sequences." Trajectory sequences essentially splice trajectories together, automatically handling [path continuity exceptions](/trajectories.html#path-continuity-exception). In addition, it transforms turns and waits into "first-class" actions (within the quickstart, at least). This allows you to run your entire auto path in a single trajectory sequence, rather than splitting them into many different trajectories. Markers can now be embedded into any of these actions: trajectories, waits, and turns. This allows you to run actions _during_ wait and turn actions without the need for async, concurrent code. However, this is only recommended for simple actions. More complex actions should still be handled via methods like [concurrent finite state machines](/advanced.html#async-following). As a bonus, trajectory sequences also allow for more advanced dashboard field drawings!

Here's a contrived example of the improvements that come with trajectory sequences.

**Before** Trajectory Sequence:

```java
public class WorldChampionshipAuto extends LinearOpMode {
    @Override
    public void runOpMode() throws InterruptedException {
        SampleMecanumDrive drive = new SampleMecanumDrive(hardwareMap);

        Pose2d startPose = new Pose2d(0, 0, 0);
        ElapsedTime timer = new ElapsedTime();

        drive.setPoseEstimate(startPose);

        Trajectory traj1 = drive.trajectoryBuilder(startPose)
                .splineTo(new Vector2d(10, 10), 0)
                .build();

        Trajectory traj2 = drive.trajectoryBuilder(startPose)
                .splineTo(new Vector2d(25, -15), 0)
                .build();

        Trajectory traj3 = drive.trajectoryBuilder(startPose)
                .forward(10)
                .build();

        // strafeRight(10) cannot be included in traj3 as it throws a PathContinuityException
        Trajectory traj4 = drive.trajectoryBuilder(startPose)
                .strafeRight(5)
                .build();

        Trajectory traj5 = drive.trajectoryBuilder(startPose)
                .strafeRight(5)
                .build();

        Trajectory traj6 = drive.trajectoryBuilder(startPose)
                .splineToLinearHeading(new Pose2d(-10, -10, Math.toRadians(45)), 0)
                .build();

        waitForStart();

        if (isStopRequested())
          return;

        drive.followTrajectory(traj1);
        drive.turn(Math.toRadians(90));
        drive.followTrajectory(traj2);

        timer.reset();
        while(timer.seconds() < 3) drive.update();

        drive.turn(Math.toRadians(45));
        drive.followTrajectory(traj3);
        drive.followTrajectory(traj4);
        drive.turn(Math.toRadians(90))
        drive.followTrajectory(traj5);

        timer.reset();
        while(timer.seconds() < 1) drive.update();

        drive.followTrajectory(traj6);
    }
}
```

**After** Trajectory Sequence:

```java
public class WorldChampionshipAuto extends LinearOpMode {
    @Override
    public void runOpMode() throws InterruptedException {
        SampleMecanumDrive drive = new SampleMecanumDrive(hardwareMap);

        Pose2d startPose = new Pose2d(0, 0, 0);

        drive.setPoseEstimate(startPose);

        TrajectorySequence trajSeq = drive.trajectorySequenceBuilder(startPose)
                .splineTo(new Vector2d(10, 10), 0)
                .turn(Math.toRadians(90))
                .splineTo(new Vector2d(25, -15), 0)
                .waitSeconds(3)
                .turn(Math.toRadians(45))
                .forward(10)
                .strafeRight(5)
                .turn(Math.toRadians(90))
                .strafeLeft(5)
                .waitSeconds(1)
                .splineToLinearHeading(new Pose2d(-10, -10, Math.toRadians(45)), 0)
                .build();

        waitForStart();

        if (!isStopRequested())
          drive.followTrajectorySequence(trajSeq);
    }
}
```

## Overview

Let's quickly go over how trajectory sequences work internally. The foundation is actually quite simple. The `TrajectorySequenceBuilder` will continually build trajectories and swallow any `PathContinuityException`s. It creates a new segment and starts building from the latest one. This does not solve any of your continuity exception woes. Trajectories will still decelerate if they are not continuous. You should still be mindful of how this works. Check out the brief overview [here](/trajectories.html#path-continuity-exception) if you need a quick refresher. The base level trajectory splicing is simply syntactic sugar for chaining trajectories. This can be replicated with a simple queue like so:

```java
Queue<Trajectory> trajectoryQueue;

trajectoryQueue.add(trajectory1);
trajectoryQueue.add(trajectory2);
trajectoryQueue.add(trajectory3);
trajectoryQueue.add(trajectory4);

while(!trajectoryQueue.isEmpty()) {
    drive.followTrajectory(trajectoryQueue.poll());
}
```

That's it! You've made your own trajectory sequence. What does this lack though? All the cool features! It doesn't have automatic splicing, waits, turns, and embedded markers inside those actions! Let's check those out.

<div class="flex justify-center my-8">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/BF_C4szJ4vU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

Once you're familiar with `TrajectorySequence`, check out [MeepMeep](/tool/meepmeep.html#meepmeep) to build and visualize your trajectories!

## Everything from the TrajectoryBuilder list

`TrajectorySequenceBuilder` mirrors the entire `TrajectoryBuilder` api. Please refer to the [TrajectoryBuilder](/trajectorybuilder-functions.html) function list for further details and visualizations.

## `.turn(radians)`

`TrajectorySequenceBuilder` uses the generic Road Runner turn function. This is found in the `TrajectorySequenceRunner` file. See [lines 140-164](https://github.com/NoahBres/road-runner-quickstart/blob/d7d3c43715770c71bba43c45082a74803751928e/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/trajectorysequence/TrajectorySequenceRunner.java#L140) for implementation details. This does not differ from the prior implementation, previously found in `SampleMecanumDrive`. This turn function is quite a naive implementation and users may feel the need to supplement it with additional logic such as a timeout or a static feedforward. These improvements have not been standardized and merged into the quickstart. If you feel that you have a solid implementation, feel free to pull request the quickstart. Moreover, all the logic is on the quickstart side and entirely user-edittable. Users are encouraged to make their own improvements if need-be.

**Turn example usage:**

```java
TrajectorySequence ts = drive.trajectorySequenceBuilder(startPose)
  .turn(Math.toRadians(45)) // Turns 45 degrees counter-clockwise
  .build();

drive.followTrajectorySequence(ts);
```

## `.waitSeconds(seconds)`

`TrajectorySequenceBuilder` allows for simple wait segments. Not much to it. This is useful for running actions in between trajectories. Markers can be run during wait segments.

```java
TrajectorySequence ts = drive.trajectorySequenceBuilder(startPose)
  .waitSeconds(3) // Waits 3 seconds
  .build();
```

::: warning
Ensure that you are using `waitSeconds()` and not `wait()`. All Java objects have a `wait()` function which causes the current thread to wait until another thread invokes a `notify()` or `notifyAll()` method. See further details in the [Oracle JavaDoc](<https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#wait()>). We don't care for this function but it does show up in intellisense. Make sure you are using the `waitSeconds()` function instead of `wait()`
:::

### SequenceBuilder Specific Markers

`TrajectorySequenceBuilder` comes with all the standard markers found in normal trajectories. Check those out [here](/markers.html) if you need a quick refresher on that. However, `TrajectorySequenceBuilder` also comes with a few of its own, making markers very powerful and flexible.

## `.addTemporalMarker(MarkerCallback)`

The `addTemporalMarker(MarkerCallback)` function without a double parameter does not actually exist in `TrajectoryBuilder`. This is becaues in normal trajectories, the functionality would be identical to `.addDisplacementMarker(MarkerCallback)`. However, in `TrajectorySequence`, displacement and duration actually differ. `addTemporalMarker(MarkerCallback)` is preferred over `addDisplacementMarker(MarkerCallback)` to avoid any confusion between displacement and duration. The difference is that turns and waits do not increase displacement while they do add to duration. So, the behavior will differ and if you do not understand this difference as it works internally, it will result in confusion. Check out [this video](https://www.youtube.com/watch?v=BF_C4szJ4vU) for a visual explanation of this behavior.

## `.UNSTABLE_addTemporalMarkerOffset(offset, MarkerCallback)`

This function allows you to set a marker at the current duration plus the offset. This differs from `.addTemporalMarker(double, MarkerCallback)` because the double in that function runs `x` seconds relative to the _ENTIRE_ trajectory while `.UNSTABLE_addTemporalMarkerOffset(offset, MarkerCallback)` runs `x` seconds relative to where it was called. The `.UNSTABLE_addTemporalMarkerOffset(offset, MarkerCallback)` with an offset of zero is equivalent in functionality to `.addTemporalMarker(MarkerCallback)`

```java{5,14}
// Example 1
// .addTemporalMarker(double, MarkerCallback)
drive.trajectorySequenceBuilder(startPose)
    .splineTo(new Vector2d(10, 10), 0)
    .addTemporalMarker(3, () -> {})
    .strafeRight(15)
    .turn(Math.toRadians(90))
    .build();

// Example 2
// .UNSTABLE_addTemporalMarkerOffset(double, MarkerCallback)
drive.trajectorySequenceBuilder(startPose)
    .splineTo(new Vector2d(10, 10), 0)
    .UNSTABLE_addTemporalMarkerOffset(3, () -> {})
    .strafeRight(15)
    .turn(Math.toRadians(90))
    .build();
```

In example 1, the marker will run 3 seconds into the _ENTIRE_ trajectory. The placement of the marker has no effect on when the marker will run. In example 2, the marker will run at whatever time _AFTER_ the first `splineTo()` PLUS 3 seconds. So this marker will run during the `strafeRight()` trajectory. This offset can be adjusted for fine-tuning. This means that the placement of this marker does matter.

::: warning
This method is marked `UNSTABLE` as it is subject to change in any future release.
:::

## `.UNSTABLE_addDisplacementMarkerOffset(offset, MarkerCallback)`

This function allows you to set a marker at the current displacement plus the offset. This differs from `.addDisplacementMarker(double, MarkerCallback)` because the double in that function runs `x` displacement relative to the _ENTIRE_ trajectory while `.UNSTABLE_addDisplacementMarkerOffset(offset, MarkerCallback)` runs `x` displacement relative to where it was called. The `.UNSTABLE_addDisplacementMarkerOffset(offset, MarkerCallback)` with an offset of zero is equivalent in functionality to `.addDisplacementMarker(MarkerCallback)`

```java{5,14}
// Example 1
// .addDisplacementMarker(double, MarkerCallback)
drive.trajectorySequenceBuilder(startPose)
    .splineTo(new Vector2d(10, 10), 0)
    .addDisplacementMarker(3, () -> {})
    .strafeRight(15)
    .turn(Math.toRadians(90))
    .build();

// Example 2
// .UNSTABLE_addDisplacementMarkerOffset(double, MarkerCallback)
drive.trajectorySequenceBuilder(startPose)
    .splineTo(new Vector2d(10, 10), 0)
    .UNSTABLE_addDisplacementMarkerOffset(3, () -> {})
    .strafeRight(15)
    .turn(Math.toRadians(90))
    .build();
```

In example 1, the marker will run 3 inches into the _ENTIRE_ trajectory. The placement of the marker has no effect on when the marker will run. In example 2, the marker will run at whatever time _AFTER_ the first `splineTo()` PLUS 3 inches. So this marker will run during the `strafeRight()` trajectory. This offset can be adjusted for fine-tuning. This means that the placement of this marker does matter.

::: warning
This method is marked `UNSTABLE` as it is subject to change in any future release.
:::

## Marker Use Examples

The ability to implement relative offsets is a powerful feature that allows us to embed our entire auto logic within a trajectory sequence. In conventional trajectories, your mechanism logic was entirely divorced and had to be handled outside of following entirely. Alternatively, for more complex behaviors, one had to run some form of concurrent scheduling—State Machines being the popular choice for FTC code. The latter is still preferred for complex behaviors, but Trajectory Sequence will make calling those much easier. Let's take a look at some basic sample code.

Say we want to have a basic auto where we go forward, lower servo, wait, raise the servo, and then strafe.
Here's how that would be accomplished.

```java
TrajectorySequence trajSeq = drive.trajectorySequenceBuilder(startPose)
    .forward(10)
    .addTemporalMarker(() -> servo.setPosition(0)) // Lower servo
    .waitSeconds(3)
    .addTemporalMarker(() -> servo.setPosition(1)) // Raise servo
    .strafeRight(5)
    .build();
```

Easy as that! But that wasn't difficult with the previous non-TrajectorySequence code. It was definitely less clean but the implementation wasn't that difficult.

Let's look at something a little more complex.

Say we have the same auto where we go forward, lower the servo, wait, raise the servo, and then strafe. But, we want to start lowering the servo before we finish our trajectory and we want to raise the servo a little bit before the wait ends so the servo is already raised when we start our strafe.

```java
TrajectorySequence trajSeq = drive.trajectorySequenceBuilder(startPose)
    .forward(10)
    .UNSTABLE_addTemporalMarkerOffset(-0.5, () -> servo.setPosition(0)) // Lower servo
    .waitSeconds(3)
    .UNSTABLE_addTemporalMarkerOffset(-0.3, () -> servo.setPosition(1)) // Raise servo
    .strafeRight(5)
    .build();
```

The code above runs the first marker 0.5 seconds before the end of the `forward()` trajectory. If we wanted to run the servo action 0.5 seconds into the `waitSeconds()` segment, we flip the sign so the offset is `0.5`. The second marker runs 0.3 seconds before the `waitSeconds()` is over. This way, the servo will have already finished moving when the `strafeRight()` starts.

Let's look at another scenario. Say we want to move forward, wait, and then strafe right. But, we want to fire two shots during our wait. We need 4 servo actions for this. Move out, move in, move out, move in.

```java
TrajectorySequence trajSeq = drive.trajectorySequenceBuilder(startPose)
    .forward(10)
    .UNSTABLE_addTemporalMarkerOffset(0, () -> servo.setPosition(0))   // Push servo out
    .UNSTABLE_addTemporalMarkerOffset(0.5, () -> servo.setPosition(1)) // Bring servo in
    .UNSTABLE_addTemporalMarkerOffset(1, () -> servo.setPosition(0))   // Push servo out
    .UNSTABLE_addTemporalMarkerOffset(1.5, () -> servo.setPosition(1)) // Bring servo in
    .waitSeconds(2) // Markers must be placed before waitSeconds()
    .strafeRight(5)
    .build();
```

The first marker will run as `waitSeconds()` starts, the second marker will run `0.5` seconds into `waitSeconds()`, the third marker will run `1` second into `waitSeconds()`, and then the fourth marker will run `1.5` seconds into `waitSeconds()`.

Notice how the markers are declared _before_ `waitSeconds()`. This is important as it sets the relative position of the markers at the beginning of `waitSeconds()`. Moving the markers _after_ `waitSeconds()` will cause the markers to be run during the `strafeRight`. Alternatively, one could use negative offsets to accomplish equivalent functionality. The following code will run the same as the code above.

```java
double waitTime = 2;

TrajectorySequence trajSeq = drive.trajectorySequenceBuilder(startPose)
    .forward(10)
    .waitSeconds(waitTime) // Markers are now placed after waitSeconds()
    .UNSTABLE_addTemporalMarkerOffset(-waitTime, () -> servo.setPosition(0))       // Push servo out
    .UNSTABLE_addTemporalMarkerOffset(-waitTime + 0.5, () -> servo.setPosition(1)) // Bring servo in
    .UNSTABLE_addTemporalMarkerOffset(-waitTime + 1, () -> servo.setPosition(0))   // Push servo out
    .UNSTABLE_addTemporalMarkerOffset(-waitTime + 1.5, () -> servo.setPosition(1)) // Bring servo in
    .strafeRight(5)
    .build();
```

::: warning
It is still recommended that any complex sequential code be handled in its own state machine or alternative concurrent code
:::

## `.setTangent(double)`

`.setTangent(double)` allows you to set a heading tangent on a trajectory, allowing you to follow a trajectory at arbitrary heading tangents.

This is equivalent to specifying a custom tangent in the `TrajectoryBuilder()` constructor

## `.setReversed(boolean)`

`.setReversed(true/false)` allows you set run your trajectory with the bot facing backwards.

## `.setConstraints(TrajectoryVelocityConstraint, TrajectoryAccelerationConstraint)`

`.setConstraints(TrajectoryVelocityConstraint, TrajectoryAccelerationConstraint)` allows you to temporary override the constraints to specify slower/faster portions in a trajectory or segment.

## `.resetConstraints()`

`.resetConstraints()` clears any temporary constraints set by `setConstraints()`. This uses the base constraints specified in the `TrajectorySequenceBuilder()` constructor.

## `.setVelConstraint(TrajectoryVelocityConstraint)`

`.setVelConstraint(TrajectoryVelocityConstraint)` temporarily sets only the velocity constraint.

## `.resetVelConstraint()`

`.resetVelConstrain()` clears any temporary velocity constraints set by `setConstraints()` or `setVelConstraint()`. This uses the base velocity constraint specified in the `TrajectorySequenceBuilder()` constructor.

## `.setAccelConstraint(TrajectoryAccelerationConstraint)`

`.setAccelConstraint(TrajectoryAccelerationConstraint)` temporarily sets only the acceleration constraint.

## `.resetAccelConstraint()`

`.resetAccelConstrain()` clears any temporary velocity constraints set by `setConstraints()` or `setAccelConstraint()`. This uses the base acceleration constraint specified in the `TrajectorySequenceBuilder()` constructor.

## `.setTurnConstraint(maxAngVel, maxAngAccel)`

`.setTurnConstraint(maxAngVel, maxAngAccel)` temporarily sets the turn constraints, used only in the turn function.

## `.resetTurnConstraint()`

`.resetTurnConstraint()` clears any temporary turn constraints, set by `setTurnConstraint()`

## `.addTrajectory(Trajectory)`

`.addTrajectory(Trajectory)` pushes a new `Trajectory` segment onto the sequence.
