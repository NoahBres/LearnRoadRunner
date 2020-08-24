# Straight Test Tuning

Once you've got your velocity controller tuned, you should run a quick straight test just to make sure everything is working properly.

1. Run the `StraightTest` opmode via the RC.
2. Measure the distance the bot traveled.
3. The distance traveled should be 60 inches by default.
   - You can change this distance in Dashboard or through the opmode directly
     - If you'd like to change it in Dashboard, look for the config sidebar and find the `StraightTest` dropdown. Change the `DISTANCE` value.
     - If you'd like to change it directly in the opmode, open the `StraightTest.java` file and change the `DISTANCE` variable on line 17.
4. Run the `StraightTest` opmode like 2 or 3 times to ensure that the distance traveled is consistent within an inch or two. If not, your velocity controller requires more tuning. It does not need to hit the _exact_ spot each time as you will later enable closed loop feedback using localization.
5. If everything works great, move on to the next step!

## Tuning Lateral Multiplier

::: tip
This isn't absolutely necessary. However, due to the nature of mecanum kinematics, a mecanum drive does exhibit less torque while strafing. Thus, the motion profiling may require some slight compensation. If you skip this step, the translational PID will most likely pick up any discrepancy and you may not notice it at all. However, if you do see some undershooting while strafing, you will be interested in applying a lateral multiplier.

See [this paper](https://www.chiefdelphi.com/t/paper-mecanum-and-omni-kinematic-and-force-analysis/106153) for more details on the strafing inefficiency.
:::

1. Run the `StrafeTest` opmode via the RC.
2. This opmode will strafe right at the specified distance. You are free to change the code to strafe left.
3. The distance traveled should be 60 inches by default. However, it may undershoot. If so, measure the distance traveled.
4. Take your target distance (60 inches by default) and divide it by the actual distance traveled.
5. Set your `LATERAL_MULTIPLIER` in `SampleMecanumDrive.java` (line 57) to this value.
6. Run the `StrafeTest` opmode again and now it should go the correct distance.

### Does your straight test go backwards or turn in a circle?

Reverse your motor directions. Instructions on where to do this can be found [here](/drive-constants.html#samplemecanumdrive-motor-direction).

### **Is your straight test consistent but it doesn't travel the specified distance?**

Check your `DriveConstants.java` file. Something went wrong in here. One of these constants may be directly related to the problem:

- `TICKS_PER_REV` - check the encoder ticks and make sure that it corresponds with the spec sheet

- `MAX_RPM` - check the max rpm and make sure that it corresponds with your motor's specced rpm

- `WHEEL_RADIUS` - this should match your drive train's wheel radius. Make sure this isn't diameter

- `GEAR_RATIO` - if this is 1:1 dont worry about it. Make sure your ratio is output:input instead of reversed

If you still can't figure out the problem, just scale the `WHEEL_RADIUS` to adjust the distance.
