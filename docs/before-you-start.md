# Before You Start!

::: warning
Please make sure to take note of the following before continuing!
:::

::: tip

**1.** This tutorial assumes that you are familiar with the Java programming language and the FTC SDK. Experience in both comes with both time and practice. Don't worry. Even if you think you don't know much right now, you'll be great after pumping out some more code 👊.
:::

::: tip

**2.** These concepts are hard and can be difficult to navigate. This tutorial tries to make it as easy as possible to navigate but it's not everyone's cup of tea. If you ever need help, there are a ton of lovely people on the [FTC Discord](https://discord.gg/first-tech-challenge)! I highly recommend you join as they are wonderful, very smart, and many are experienced in Road Runner!
:::

::: tip

**3.** This tutorial attempts to cover installation, usage, and tips and tricks. It does not go into the hardcore inner workings of Road Runner. A deeper understanding of how PID control and motion profiles work will make the learning process much faster. I highly recommend you check Road Runner's [original quickstart documentation](https://acme-robotics.gitbook.io/road-runner/quickstart/introduction) as it explains the inner workings.
:::

::: warning
It is highly recommended to have ample room during the tuning process. This will allow for more accuracy. I personally recommend having a clear stretch of up to 90 inches for your robot to drive on. You should have a minimum of an entire field width (72 inches) to tune on.
:::

<div class="flex justify-center mb-8 mt-8">
That's all! Navigate to the next page and we'll get started!
</div>

## Terms to Know

Seeing a bunch of jargon thrown around and don't quite understand? Don't sweat it. We gotchu.

If you see some recurring jargon that doesn't show up on this page, hit me up on Discord (Noah#5396) and I'll be sure to add it! Or feel free to make a GitHub pull request!

### Localization

You'll see the term localization thrown around throughout higher level FTC teams. Localization essentially just means the ability for your bot to know where you are at any point in time. Trying to get somewhere without knowing where you are is a difficult task (this is essentially the difference between closed and open loop control). Localization is generally done through odometry but can also take form in more exotic methods such as VSLAM (see the Intel Realsense T265 which can be found on some FTC bots). Using some form of odometry (drive encoders or external dead wheels) and feeding it into their respective kinematic equations then integrating allows one to determine the relative pose (x, y, heading) of the bot.

### Motion Profile

A motion profile is essentially just a graph of the behavior that something must follow to reach a certain state. In Road Runner's primary case, motion profiles are generated describing the velocity of the bot to reach a defined pose (although motion profiles can be generated for different components, like an elevator). But what we're concerned with is the bot's velocity graph. Motion profiling essentially maps out the entire movement that you need to take to get to a certain point. You can modify/control this graph by defining max velocity, max acceleration, etc. For a better explanation of motion profiling, check out [this link](https://www.motioncontroltips.com/what-is-a-motion-profile/). FRC Team 254 also has a [great conference talk](https://www.youtube.com/watch?v=8319J1BEHwM) on this.

### Open vs Closed Loop Control

The difference between open and closed loop control is essentially just a matter of whether you have feedback or not. If you have feedback, you can "close the loop." What does feedback mean?

Let's take the FTC example of wanting to control the velocity of your motor. Let's start with open-loop control. Open-loop essentially means you're "guestimating" the value you need. You have an existing mathematical model of some components. And then you shove your value through that equation and hope that value works. So going back to our velocity control. Let's say you have a goBILDA 13.7:1 435 RPM motor. You want the motor to spin at 217.5 RPM. That's 50% speed. What you do is send 50% of the voltage to the motor right? So do a `motor.setPower(0.5)` which sends 6v (technically, not really. The motor speed is controlled with PWM but let's just pretend here) to the motor. However, this is the real world. That motor isn't going to go exactly 217.5 RPM. Due to physical tolerances, electrical noise, magic dust, etc, that motor will have a ±10% tolerance (according to goBILDA's own specs. Source: @ethand on the discord). Meaning, we send 6v to the motor but in reality that motor can be spinning anywhere from 174 to 261 RPM. Quite a big range! But this is the best open-loop control can give us. We just send a value and hope it works. We never actually know if it's running at the speed we desire.

What if we want to be more accurate? Say if you want a consistent velocity for your 2020-21 Ultimate Goal disc shooter. Or accurate motion profiling. Well, most FTC motors will have encoders built-in. This allows you to measure the position of the shaft. But, velocity can also be derived. We can use this velocity data to actively correct our voltage output. This is what is meant by "closing the loop." Having feedback from the encoder allows us to slightly tweak the voltage we output and lower it if the motor is going too fast or raise it if the motor is going too slow. This is often done through a PID controller, although fancier methods such as LQR do exist.

### Vector2d

Represents a 2d vector: an X and Y coordinate.

```java
// Create a vector at coordinates (x: 10, y: -5)
Vector2d myVector = new Vector2d(10, -5);
```

### Pose2d

Represents a 2d robot pose: an X and Y coordinate, and a heading.

Generally, this represents the robot's position and the direction it faces. Remember that increasing the angle goes counter-clockwise, just like any unit circle you've learned about in trigonometry.
Keep this in mind as the turn function will go counter-clockwise.
Also, remember that any representation of an angle should be in radians. This is why we use the `Math.toRadians()` function to convert from degrees to radians.

```java
// Create a pose at coordinates (x: 10, y: -5) facing 90 degrees
Pose2d myPose = new Pose2d(10, -5, Math.toRadians(90));
```
