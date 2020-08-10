---
meta:
  - description: Learn how to tune the velocity PID
---

# Drive Velocity PID Tuning

<HideAyudeWrapper :skipIfDriveEncoders="true">
::: warning
This section should be skipped because you have chosen the option not to use drive encoders.
:::
</HideAyudeWrapper>

Tuning the Velocity PID can be one of the more frustrating parts of Road Runner. This is required for accurate path following. However, intuition on how a PID controller works and what to do will help alleviate that frustration and hopefully make this a smooth process.

## Telemetry Packet

The first step will be to replace `telemetry` with `TelemetryPacket`. This enables us to update the graph faster for higher resolution.

Either just copy the entire opmode from [my custom quickstart fork](https://github.com/NoahBres/road-runner-quickstart/blob/master/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/drive/opmode/DriveVelocityPIDTuner.java) and replace yours with it or do the following:

1. Find lines 171-177:

```java
/* Lines 171-177 in DriveVelocityPIDTuner.java */

// update telemetry
telemetry.addData("targetVelocity", motionState.getV());
for (int i = 0; i < velocities.size(); i++) {
  telemetry.addData("velocity" + i, velocities.get(i));
  telemetry.addData("error" + i, motionState.getV() - velocities.get(i));
}
telemetry.update();
```

2. Replace those lines with the following:

```java

TelemetryPacket packet = new TelemetryPacket();

// update telemetry
packet.put("targetVelocity", motionState.getV());
for (int i = 0; i < velocities.size(); i++) {
  packet.put("velocity" + i, velocities.get(i));
  packet.put("error" + i, motionState.getV() - velocities.get(i));
}
dashboard.sendTelemetryPacket(packet);
```

Voilà! High resolution graphs.

**Now to begin tuning.**

## Tuning

## Tuning simulator
