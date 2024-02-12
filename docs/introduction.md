# What is Road Runner?
Road Runner is a motion planning library, written for the [FTC robotics competition](https://www.firstinspires.org/robotics/ftc). Designed primarily for autonomous robotic movement, it allows for complex path following and generation while maintaining control of velocity and acceleration. This enables bots to have more accurate and advanced path following capabilities.

<div class="flex flex-col items-center justify-center">
    <VideoDisplay src="./assets/home/8393-half-compressed.mp4" width="360px" :controls="false"/> 
    <span class="text-sm text-center text-gray-600">Team 8393 performs an advanced spline path in their autonomous mode<br>(Ochoa Finals - 2018/19 Rover Ruckus)</span>
</div>

<ActionLink url="/before-you-start" margin="2em">Get Started →</ActionLink>

## Frequently Asked Questions

- [How is this different from Pure Pursuit?](#how-is-this-different-from-pure-pursuit)
- [What are dead wheels/odometry?](#what-are-dead-wheels-odometry)
- [What are spline paths?](#what-are-spline-paths)
- [Can I change the default units?](#can-i-change-the-default-units)

### How is this different from Pure Pursuit?

While often compared with each other, pure pursuit is very different from Road Runner and should not be contrasted. [Pure Pursuit](https://www.mathworks.com/help/robotics/ug/pure-pursuit-controller.html) is a path tracking and following algorithm that allows non-holonomic drive trains to follow multi-dimensional paths through the use of a look-ahead point. On the other hand, Road Runner includes multiple path following algorithms from [Ramsete](https://github.com/wpilibsuite/allwpilib/blob/master/wpilibj/src/main/java/edu/wpi/first/wpilibj/controller/RamseteController.java) to guided vector fields. The default pure pursuit algorithm lacks motion profiling, meaning it has no velocity or acceleration constraints. Because pure pursuit has no acceleration control, installing dead wheel odometry on your bot is a must. Both tools can be used to follow complex paths.

Tangentially related but the use of Pure Pursuit really isn't recommended for most FTC uses. The majority of FTC bots tend to be holonomic drive (mecanum). Pure Pursuit was designed for differential drive (tank). Even for differential drive, pure pursuit is inferior to a controller like Ramsete. It is really only justified in the event that you do not have and do not want to create a path generator. Please check out the [FTC Discord](https://discord.gg/first-tech-challenge) for further information on this topic.

### What are dead wheels/odometry?

Although in the FTC community dead wheels and odometry are often used synonymously, they are very different things. Odometry refers to the use of sensors to determine a robot's position. Dead wheels (sometimes referred to as odometry wheels or odometry pods) are unpowered omni wheels not connected to any motor. These wheels have rotary encoders to track distance traveled. This data is fed through a kinematic equation and integrated to calculate the relative position of the robot on the field. The advantage of using dead wheels over drive wheel odometry is that dead wheels experience very little slip compared to mecanum wheels. This improves the accuracy signifcantly when using a mecanum drive, especially in instances of high acceleration. Dead wheels are not necessary for a differential drive (tank drive) due to the little slip experienced (this is actually anecdotal data. I cannnot back this statement with anything objective).

**TL;DR** Dead wheels allow accurate positional tracking of mecanum drives at high speeds and accelerations. Check out [gm0's section on odometry](https://gm0.org/en/latest/docs/robot-design/dead-wheels.html) for more detailed information!

<figure align="center">
    <img src="https://cdn.statically.io/gh/NoahBres/LearnRoadRunner/1c0fe8d5/docs/assets/home/dead-wheel-example.jpg" class="rounded-lg" width="400" alt="Underside of a bot with dead wheels highlighted">
    <figcaption class="mt-2 text-sm text-center text-gray-600">An example of dead wheels</figcaption>
</figure>

### What is the difference between two and three wheel odometry?

**TL;DR** Three-wheel configuration reduces loop times resulting in less drift and higher accuracy.

As explained above, the standard dead wheel configuration involves the use of multiple, unpowered omni wheels connected to encoders. However, you can choose to either use two or three omni wheels. The two-wheel configuration uses two dead wheels, perpendicular to each other. One wheel is used to track displacement in the x (forward) direction and one in the y (strafe) direction. Heading is measured through a gryoscope, whether it be in the Rev Expansion/Control Hub IMU or an external sensor. The three-wheel configuration uses two parallel wheels and one perpendicular wheel. The two parallel wheels track both x (forward) movement and heading. Heading is calculated through the offset of the two parallel wheels. The perpendicular wheel tracks movement in the y (strafe) direction.

So you ask yourself, **why would I choose the three wheel configuration?** "That's another module that I have to make and increases cost by ~30%!" At the time of writing, the three-wheel configuration is the most accurate option. This is because the Rev Expansion/Control Hub utilizes a slow I2C implementation which results in about 7ms per I2C call. The BNO055 IMU onboard the Rev Expansion/Control Hub communicates via I2C. This will contribute a signficant amount of delay to your loop times which reduces integration accuracy (the 7ms is in addition to the 3ms call for all dead wheels assuming bulk reads, so 10ms). To calculate the heading with a two-wheel configuration, it must call on this slow IMU for heading. A three-wheel configuration calculates heading via the two parallel wheels, which eliminates the 7ms I2C call. Since all three of your dead wheels can be read in 3ms (assuming bulk reads and that all your encoders are on one Rev Expansion/Control Hub), the loop time is greatly reduced. This has been seen to improve accuracy and reduce drift significantly. The upcoming Control Hubs, which perform the I/O at a 3x faster rate than the Expansion Hub, may reduce this difference between the two set-ups.

_Note: Some teams, such as 8802 Negative Resistance, have utilized the two-wheel configuration with great success._

### How do I make dead wheels?

Hit up the [FTC Discord](https://discord.gg/first-tech-challenge) for further details. There are many intricacies and options into building dead wheel modules. There are very few resources to creating dead wheels module at the time of writing. You can expect each module to cost $30+. Thus, you can expect a three-wheel configuration to cost upwards of $100.

Good open source design for a dead wheel design: [https://openodometry.weebly.com/](https://openodometry.weebly.com/)

### What are spline paths?

Spline paths are trajectories generated using [spline curves](<https://www.wikiwand.com/en/Spline_(mathematics)>). Spline curves are piecewise polynomials that connect multiple points in a continuous (smooth) fashion. These benefit autonomous trajectories because it allows an object to follow a path while changing heading without making a point turn. Spline curves are ideal for non-holonomic drive trains. For Road Runner you will find that spline paths will be utilized frequently as it allows for continuous paths (connecting straight lines will break path continuity, we'll worry about that later 😉).

### Can I change the default units?

From the [official Road Runner FAQ](https://acme-robotics.gitbook.io/road-runner/quickstart/faq):

> Inches are strongly recommended. If you really want to use other units, write your own adapters/wrappers for the Road Runner interfaces. Many important defaults are set with inches in mind, and it's difficult to change some from the high-level API.
