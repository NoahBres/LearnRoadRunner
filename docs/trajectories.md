# Trajectories Overview

## Trajectories vs Paths

Just as a clarification, Road Runner has two types of data structures for constructing your routes: paths and trajectories. Paths are what one would expect them to be. They simply hold the entire route built by the waypoints you define. These routes can be simple straight lines or smooth splines. Trajectories are paths with motion profiling. This means that they also map at what velocity your bot should be throughout the entire route. This allows one to control the acceleration, velocity, angular acceleration, etc. As it is right now, Road Runner does not package a path follower for holonomic drive. It does include Ramsete path following for tank drive. The addition of a holonomic guided vector field follower will allow for path following with holonomic drives. Check out the [FTC Discord](https://discord.gg/first-tech-challenge) for further details on that. Road Runner does include PIDVA trajectory followers for both holonomic and tank drive. This is what the quickstart utilizes by default.

## Vectors and Poses

Because you will be utilizing them quite a bit, we're going to define the two Road Runner classes used to represent position.

### Vector2d

Represents a 2d vector: an X and Y coordinate.

```java
// Create a vector at coordinate (10, -5)
Vector2d myVector = new Vector2d(10, -5);
```

### Pose2d

Represents a 2d robot pose: and X and Y coordinate, and a heading.

Generally, this represents the robot's position and direction it faces.
Remember that increasing the angle goes counter-clockwise, just like any unit circle you've learned about in trigonometry.
Keep this in mind as the turn function will go counter-clockwise.

```java
// Create a pose at coordinate (10, -5) facing 90 degrees
Pose2d myPose = new Pose2d(10, -5, Math.toDegrees(90));
```

## Building a Trajectory

## Going Backwards

## Path Continuity Exception
