# What is Road Runner?

Road Runner is a motion planning library, written for the [FTC robotics competition](https://www.firstinspires.org/robotics/ftc). Designed primarily for autonomous robotic movement, it allows for complex path following and generation while maintaining control of velocity and acceleration. This enables bots to have more accurate and advanced path following capabilities.

<figure align="center">
    <img src="./assets/8393-worlds.gif">
    <figcaption style="marginTop: 1em;">Team 8393 performs an advanced spline path in their autonomous mode</figcaption>
</figure>

<ActionLink url="/before-you-start" margin="2em">Get Started →</ActionLink>

## Frequently Asked Questions

- [How is this different from Pure Pursuit?](#how-is-this-different-from-pure-pursuit)
- [What are dead wheels/odometry?](#what-are-dead-wheels-odometry)
- [What are spline paths?](#what-are-spline-paths)

### How is this different from Pure Pursuit?

While often compared with each other, pure pursuit is very different from Road Runner and should not be contrasted. [Pure pursuit](https://www.mathworks.com/help/robotics/ug/pure-pursuit-controller.html) is a path tracking and following algorithm that allows non-holonomic drive trains to follow multi-dimensional paths through the use of a look-ahead point. On the other hand, Road Runner includes multiple path following algorithms from [Ramsete](https://github.com/wpilibsuite/allwpilib/blob/master/wpilibj/src/main/java/edu/wpi/first/wpilibj/controller/RamseteController.java) to guided vector fields. The default pure pursuit algorithm lacks motion profiling, meaning it has no velocity or acceleration constraints. Because pure pursuit has no acceleration control, installing dead wheel odometry on your bot is a must. Both tools can be used to follow complex paths.

### What are dead wheels/odometry?

Although in the FTC community dead wheels and odometry are often used synonymously, they are very different things. Odometry refers to the use of sensors to determine a robot's position. Dead wheels (sometimes referred to as odometry wheels or odometry pods) are unpowered wheels not connected to any motor. These wheels have rotary encoders to track distance traveled.

<figure align="center">
    <img src="./assets/dead-wheel-small.jpg">
    <figcaption style="marginTop: 1em;">An example of dead wheels</figcaption>
</figure>

### What are spline paths?

Spline paths are trajectories generated using [spline curves](<https://www.wikiwand.com/en/Spline_(mathematics)>). Spline curves are piecewise polynomials that connect multiple points in a smooth fashion. These benefit autonomous trajectories because it allows an object to follow a path while changing heading without making a point turn. Spline curves are ideal for non-holonomic drive trains. However, for holonomic drive trains (mecanum, etc), straight lines are optimal as holonomic drive trains can strafe and turn simultaneously.
