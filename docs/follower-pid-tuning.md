# Follower PID Tuning

This is the last tuning step. Here, you will tune the closed loop feedback controller. This should improve your path following dramatically.

The official Road Runner guide recommends that you run the `FollowerPIDTuner` opmode to tune the follower PID's. However, I personally prefer to first tune it with a simple opmode that goes back and forth. However, using either opmode follows the same process. I prefer the back and forth opmode because it is really simple to see your errors accumulate. The `FollowerPIDTuner` will go in a large square. Thus, if your heading is off your entire square is destroyed and you have to keep resetting the bot. It's quite arduous. I would recommend using the `BackAndForth` opmode and then further fine tuning with `FollowerPIDTuner`.

If you'd prefer to to use the simple `BackAndForth` opmode first, copy over [this file](https://github.com/NoahBres/road-runner-quickstart/blob/master/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/opmode/BackAndForth.java) into your project.

1. Run the `BackAndForth` opdmode via the RC.

2. Then, connect to the RC phone's wifi network. The password to the network is located in the `Program and Manage` menu.

3. Navigate to `192.168.49.1:8080/dash` with a phone RC or `192.168.43.1:8080/dash` with a Control Hub.

4. Ensure that you have the `Field` view selected in the top right.

5. You should see two lines and two circles being drawn: <span style="background: #4CAF50;" class="px-2 py-1 pb-2 text-black rounded">green</span> for the target position and <span style="background: #3F51B5;" class="px-2 py-1 text-white rounded">blue</span> for your bot's actual position.

6. Look for the `SampleMecanumDrive` in the right sidebar. Open that dropdown. You should be seeing two options: `HEADING_PID` and `TRANSLATION_PID`. Both options are located in the `SampleMecanumDrive` file.

7. Open up `HEADING_PID` first. Just keep increasing `kP` until the robot starts to keep an accurate heading. This was around 8 in my experience, although your mileage may vary. You should not need to adjust `kD` and `kI`.

8. Open up `TRANSLATION_PID` next. Once again, keep increasing `kP` until the robot starts to adjust itself and follows the path. This was also around 8 in my experience, although your mileage may vary. You should not need to adjust `kD` and `kI`.

9. Once that's tuned, you should be done! Remember that any changes in Dashboard must be reflected in the appropriate file. So, you should copy-paste your numbers into the PID object in `SampleMecanumDrive.java`.

10. Feel free to run the same tuning process with `FollowerPIDTuner`. This is encouraged for further accuracy.

11. You should be done! Go on to the `SplineTest` to ensure that your following is accurate.
