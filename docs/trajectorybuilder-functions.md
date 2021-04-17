# TrajectoryBuilder Function List

## `.forward(distance: Double)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/forward.mp4" width="400px" :controls="false"/>
</div>

```java{4}
// Drives forward 40 inches

new TrajectoryBuilder(new Pose2d())
  .forward(40)
  .build()
```

<div class="h-5"></div>

## `.back(distance: Double)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/back.mp4" width="400px" :controls="false"/>
</div>

```java{4}
// Drives backward 40 inches

new TrajectoryBuilder(new Pose2d())
  .back(40)
  .build()
```

<div class="h-5"></div>

## `.strafeLeft(distance: Double)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/strafe-left.mp4" width="400px" :controls="false"/>
</div>

```java{4}
// Strafes left 40 inches

new TrajectoryBuilder(new Pose2d())
  .strafeLeft(40)
  .build()
```

<div class="h-5"></div>

## `.strafeRight(distance: Double)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/strafe-right.mp4" width="400px" :controls="false"/>
</div>

```java{4}
// Strafes right 40 inches

new TrajectoryBuilder(new Pose2d())
  .strafeRight(40)
  .build()
```

<div class="h-5"></div>

## `.strafeTo(endPosition: Vector2d)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/line-to.mp4" width="400px" :controls="false"/>
</div>

```java{8}
// Robot moves to the specified coordinates.
// The robot maintains the heading it starts at throughout the trajectory
// So, if you start at a 90 degree angle, it will keep that angle the entire path.

// strafeTo() is simply a shorthand for lineToConstantHeading()

new TrajectoryBuilder(new Pose2d())
  .strafeTo(new Vector2d(40, 40))
  .build()
```

## `.lineTo(endPosition: Vector2d)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/line-to.mp4" width="400px" :controls="false"/>
</div>

```java{8}
// Robot moves to the specified coordinates.
// The robot maintains the heading it starts at throughout the trajectory
// So, if you start at a 90 degree angle, it will keep that angle the entire path.

// Functionally the same as strafeTo()

new TrajectoryBuilder(new Pose2d())
  .lineTo(new Vector2d(40, 40))
  .build()
```

<div class="h-5"></div>

## `.lineToConstantHeading(endPosition: Vector2d)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/line-to.mp4" width="400px" :controls="false"/>
</div>

```java{8}
// Robot moves to the specified coordinates.
// The robot maintains the heading it starts at throughout the trajectory
// So, if you start at a 90 degree angle, it will keep that angle the entire path.

// Functionally the same as strafeTo()/lineTo()

new TrajectoryBuilder(new Pose2d())
  .lineToConstantHeading(new Vector2d(40, 40))
  .build()
```

<div class="h-5"></div>

## `.lineToLinearHeading(endPose: Pose2d)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/line-to-linear-heading.mp4" width="400px" :controls="false"/>
</div>

```java{5}
// Robot moves to the specified coordinates while linearly
// interpolating between the start heading and a specified end heading.

new TrajectoryBuilder(new Pose2d())
  .lineToLinearHeading(new Pose2d(40, 40, Math.toRadians(90)))
  .build()
```

<div class="h-5"></div>

## `.lineToSplineHeading(endPose: Pose2d)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/line-to-spline-heading.mp4" width="400px" :controls="false"/>
</div>

```java{5}
// Robot moves to the specified coordinates while spline
// interpolating between the start heading and a specified end heading.

new TrajectoryBuilder(new Pose2d())
  .lineToSplineHeading(new Pose2d(40, 40, Math.toRadians(90)))
  .build()
```

<div class="h-5"></div>

## `.splineTo(endPosition: Vector2d, endTangent: Double)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/spline-to.mp4" width="400px" :controls="false"/>
</div>

```java{5}
// Robot moves to the specified coordinates in a spline path
// while following a tangent heading interpolator.

new TrajectoryBuilder(new Pose2d())
  .splineTo(new Vector2d(40, 40), Math.toRadians(0))
  .build()
```

<div class="h-5"></div>

## `.splineToConstantHeading(endPosition: Vector2d, endTangent: Double)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/spline-to-constant-heading.mp4" width="400px" :controls="false"/>
</div>

```java{7}
// Robot moves to the specified coordinates in a spline path
// while keeping the heading constant.
// The robot maintains the heading it starts at throughout the trajectory
// However, setting the `endTangent` does affect the spline shape.

new TrajectoryBuilder(new Pose2d())
  .splineToConstantHeading(new Vector2d(40, 40), Math.toRadians(0))
  .build()
```

<div class="h-5"></div>

## `.splineToLinearHeading(endPose: Pose2d, endTangent: Double)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/spline-to-linear-heading.mp4" width="400px" :controls="false"/>
</div>

```java{14}
// Robot moves to the specified coordinates in a spline path
// while separately linearly interpolating the heading
//
// The heading interpolates to the heading specified in `endPose`.
// Setting `endTangent` affects the shape of the spline path itself.
//
// Due to the holonomic nature of mecanum drives, the bot is able
// to make such a movement while independently controlling heading.

// 🚨  Will cause PathContinuityException's!! 🚨
// Use splineToSplineHeading() if you are chaining these calls

new TrajectoryBuilder(new Pose2d())
  .splineToLinearHeading(new Pose2d(40, 40, Math.toRadians(90)), Math.toRadians(0))
  .build()
```

<div class="h-5"></div>

## `.splineToSplineHeading(endPose: Pose2d, endTangent: Double)`

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/trajectorybuilder-functions/spline-to-spline-heading.mp4" width="400px" :controls="false"/>
</div>

```java{11}
// Robot moves to the specified coordinates in a spline path
// while separately spline interpolating the heading
//
// The heading interpolates to the heading specified in `endPose`.
// Setting `endTangent` affects the shape of the spline path itself.
//
// Due to the holonomic nature of mecanum drives, the bot is able
// to make such a movement while independently controlling heading.

new TrajectoryBuilder(new Pose2d())
  .splineToSplineHeading(new Pose2d(40, 40, Math.toRadians(90)), Math.toRadians(0))
  .build()
```

<div class="h-5"></div>
