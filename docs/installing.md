# Installing

There are two methods to installing the Road Runner library. [Method #1](#method-1-downloading-the-quickstart), the simpler option, is to simply download [the quickstart repo](https://github.com/acmerobotics/road-runner-quickstart). The quickstart repo is an empty FTC season repo. It includes everything you'll need to get Road Runner up and running. However, this does not work if you already have an existing codebase. [Method #2](#method-2-installing-rr-on-your-project) will go through installing Road Runner via gradle and copying over the necessary files from the quickstart repo into your existing team project.

Afterwards, it is highly recommended to upgrade your Rev Expansion Hub or Control Hub Firmware. Directions can be found [below](#upgrading-firmware).

## Method 1: Downloading the Quickstart

1. Navigate to [https://github.com/acmerobotics/road-runner-quickstart](https://github.com/acmerobotics/road-runner-quickstart)
2. Click the big green download button

<VideoDisplay src="./assets/installing/github-download-btn.mp4"/>

3. Unzip/extract the folder into your directory of choice
4. Open up the folder in Android studio.
5. Voila! You now have everything you need to get Road Runner up and going.

## Method 2: Installing RR on Your Project

1. We are are going to assume you have the same file structure as the standard FTC provided project. This can be found [here](https://github.com/FIRST-Tech-Challenge/SkyStone).
2. Look for the `TeamCode/build.release.gradle` file. Specifically the one in the `TeamCode` folder.

<!-- prettier-ignore -->
::: vue
<span class="folder">ftc_app</span>
├── <span class="folder">.github</span>
├── <span class="folder">FtcRobotController</span>
├── <span class="folder">TeamCode</span>
│  ├── <span class="folder">src/main</span>
│  ├── <span class="file">build.gradle</span>
│  └── <span class="file">`build.release.gradle` _(**This one**)_</span>
├── <span class="folder">doc</span>
├── <span class="folder">gradle/wrapper</span>
├── <span class="folder">libs</span>
├── <span class="file">.gitignore</span>
├── <span class="file">README.md</span>
├── <span class="file">build.common.gradle</span>
├── <span class="file">build.gradle</span>
├── <span class="file">gradelw</span>
├── <span class="file">gradlew.bat</span>
└── <span class="file">settings.gradle</span>
:::

3. In `TeamCode/build.release.gradle`, add the following two dependencies: `implementation 'com.acmerobotics.roadrunner:core:0.5.1'` and `implementation 'com.acmerobotics.dashboard:dashboard:0.3.8'`

```groovy{10,11}
dependencies {
    implementation project(':FtcRobotController')
    implementation (name: 'RobotCore-release', ext: 'aar')
    implementation (name: 'Hardware-release', ext: 'aar')
    implementation (name: 'FtcCommon-release', ext: 'aar')
    implementation (name: 'WirelessP2p-release', ext: 'aar')
    implementation (name: 'tfod-release', ext: 'aar')
    implementation (name: 'tensorflow-lite-0.0.0-nightly', ext: 'aar')

    implementation 'com.acmerobotics.roadrunner:core:0.5.1'
    implementation 'com.acmerobotics.dashboard:dashboard:0.3.8'
}
```

4. Then, locate the `build.common.gradle` file in the root folder.

<!-- prettier-ignore -->
::: vue
<span class="folder">ftc_app</span>
├── <span class="folder">.github</span>
├── <span class="folder">FtcRobotController</span>
├── <span class="folder">TeamCode</span>
├── <span class="folder">doc</span>
├── <span class="folder">gradle/wrapper</span>
├── <span class="folder">libs</span>
├── <span class="file">.gitignore</span>
├── <span class="file">README.md</span>
├── <span class="file">`build.common.gradle` _(**This one**)_</span>
├── <span class="file">build.gradle</span>
├── <span class="file">gradelw</span>
├── <span class="file">gradlew.bat</span>
└── <span class="file">settings.gradle</span>
:::

5. In the file, locate the line containing `minSdkVersion`. This should be around line `42`. If the number is lower than 23, replace it with 23. Like so:

```groovy{4}
defaultConfig {
  signingConfig signingConfigs.debug
  applicationId 'com.qualcomm.ftcrobotcontroller'
  minSdkVersion 23
  targetSdkVersion 28
  ...
}
```

This is to enable multidexing. With the inclusion of all these libraries, the app may exceed the 64k method limit. Android versions above API level 21 have multidexing on by default. As the ZTE speeds (which require an API level lower than 21) are no longer legal in FTC, we can increase the sdk minimum version. You can read more about the multidexing issue [here](https://developer.android.com/studio/build/multidex).

6. We now need to copy over all the java files from the `TeamCode` folder located in the online quickstart repo (all the files from [this folder](https://github.com/acmerobotics/road-runner-quickstart/tree/master/TeamCode/src/main/java/org/firstinspires/ftc/teamcode)). Copy over all the files from both the `drive` and `util` folder into a location in your project, preferably just your `TeamCode` folder. These classes include all the files and utilities required for tuning and dashboard logging.

7. Once all the files are copied into your project, it is likely that most of the files will have a lot of errors relating to imports. This is because most of the classes are expecting to find certain classes at certain locations when they import them. However, they are now in a different location and the previous class paths are no longer valid. Unfortunately, you must manually go over each file and resolve the imports yourself by providing the correct package name/ import path for each incorrect one.

8. THEN, you must edit your `FtcRobotControllerActivity.java` file to work with ftc-dashboard. Directions can be found [here](https://acmerobotics.github.io/ftc-dashboard/gettingstarted). Or just copy the `FtcRobotControllerActivity.java` file from the quickstart repo [here](https://github.com/acmerobotics/road-runner-quickstart/blob/master/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/internal/FtcRobotControllerActivity.java) and paste it into your project.

## Upgrading Firmware

It is highly recommended that you upgrade the firmware on your Control Hub or Expansion Hub to the latest version. Firmware version 1.8.2 brings a number of improvements including: DC motor output linearity, improved close-loop controls, improved I2C speeds, and USB recovery for ESD faults. Road Runner's performance directly benefits from these improvements.

Explicit directions to upgrade the Expansion/Control Hub firmware can be found [here](https://github.com/FIRST-Tech-Challenge/SKYSTONE/wiki/Managing-a-Control-Hub#Updating-the-Expansion-Hub-Firmware).

Directions to upgrade the Expansion Hub firmware can be found [here](http://www.revrobotics.com/software/#ExpansionHubFirmware).

**That's it!** You're set! The installation process is done. Now go on ahead and start tuning.
