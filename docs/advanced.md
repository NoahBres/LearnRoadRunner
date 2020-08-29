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
