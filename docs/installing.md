# Installing

There are two methods to installing the Road Runner library.

[Method #1](#method-1-downloading-the-quickstart), the simpler option, is to simply download [the quickstart repo](https://github.com/acmerobotics/road-runner-quickstart). The quickstart repo is an empty FTC season repo along with the preinstalled dependencies and tuning opmodes to get Road Runner up and running. It includes everything you'll need to get Road Runner up and running. However, this does not work if you already have an existing codebase.

[Method #2](#method-2-installing-rr-on-your-project) will go through installing Road Runner via gradle and copying over the necessary files from the quickstart repo into your existing team project.

Afterwards, it is highly recommended to upgrade your Rev Expansion Hub or Control Hub Firmware. Directions can be found [below](#upgrading-firmware).

## Method 1: Downloading the Quickstart

1. Navigate to [https://github.com/acmerobotics/road-runner-quickstart](https://github.com/acmerobotics/road-runner-quickstart)
2. Click the big green download button

<VideoDisplay src="./assets/installing/github-download-btn.mp4" width="100%"/>

3. Unzip/extract the folder into your directory of choice
4. Open up the folder in Android studio.
5. Voilà! You now have everything you need to get Road Runner up and going.

## Method 2: Installing RR on Your Project

::: warning
These installation instructions do not apply to versions below the **6.2** SDK (released in February 18). Please consult the [FTC Discord server](https://discord.gg/first-tech-challenge) or the [FTC subreddit](https://www.reddit.com/r/FTC/) if you are having trouble installing libraries for earlier versions of the SDK.
:::

1. We are are going to assume you have the same file structure as the _latest_ (**6.2** at the time of writing) standard FTC provided project. This can be found [here](https://github.com/FIRST-Tech-Challenge/FtcRobotController).

2. Look for the `build.dependencies.gradle` file at the root of your project.

<!-- prettier-ignore -->
::: vue
<span class="folder">FtcRobotController</span>
├── <span class="folder">.github</span>
├── <span class="folder">FtcRobotController</span>
├── <span class="folder">TeamCode</span>
├── <span class="folder">doc</span>
├── <span class="folder">gradle/wrapper</span>
├── <span class="folder">libs</span>
├── <span class="file">.gitignore</span>
├── <span class="file">README.md</span>
├── <span class="file">build.common.gradle</span>
├── <span class="file">`build.dependencies.gradle` _(**This one**)_</span>
├── <span class="file">build.gradle</span>
├── <span class="file">gradle.properties</span>
├── <span class="file">gradlew</span>
├── <span class="file">gradlew.bat</span>
└── <span class="file">settings.gradle</span>
:::

3.  Add the following snippet at the end of the `repositories` block:

    `maven { url = 'https://maven.brott.dev/' }`

    Then, add the following snippet at the end of your `dependencies` block:

    `implementation 'com.acmerobotics.dashboard:dashboard:0.4.1'`


    Your file should look like this:

```groovy{6,24}
/* build.dependencies.gradle */
repositories {
    mavenCentral()
    google() // Needed for androidx
    jcenter()  // Needed for tensorflow-lite
    maven { url = 'https://maven.brott.dev/' }
    flatDir {
        dirs rootProject.file('libs')
    }
}

dependencies {
    implementation 'org.firstinspires.ftc:Inspection:6.2.1'
    implementation 'org.firstinspires.ftc:Blocks:6.2.1'
    implementation 'org.firstinspires.ftc:RobotCore:6.2.1'
    implementation 'org.firstinspires.ftc:RobotServer:6.2.1'
    implementation 'org.firstinspires.ftc:OnBotJava:6.2.1'
    implementation 'org.firstinspires.ftc:Hardware:6.2.1'
    implementation 'org.firstinspires.ftc:FtcCommon:6.2.1'
    implementation 'org.firstinspires.ftc:tfod:1.0.2'
    implementation 'org.tensorflow:tensorflow-lite:1.10.0'
    implementation 'androidx.appcompat:appcompat:1.2.0'

    implementation 'com.acmerobotics.dashboard:dashboard:0.4.1'
}
```

If you are using [OpenRC](https://github.com/OpenFTC/OpenRC-Turbo), please read the Dashboard specific instructions [here](https://acmerobotics.github.io/ftc-dashboard/gettingstarted)

4. Look for the `TeamCode/build.gradle` file. Specifically the one in the `TeamCode` folder.

<!-- prettier-ignore -->
::: vue
<span class="folder">FtcRobotController</span>
├── <span class="folder">.github</span>
├── <span class="folder">FtcRobotController</span>
├── <span class="folder">TeamCode</span>
│  ├── <span class="folder">src/main</span>
│  └── <span class="file">`build.gradle` _(**This one**)_</span>
├── <span class="folder">doc</span>
├── <span class="folder">gradle/wrapper</span>
├── <span class="folder">libs</span>
├── <span class="file">.gitignore</span>
├── <span class="file">README.md</span>
├── <span class="file">build.common.gradle</span>
├── <span class="file">build.dependencies.gradle</span>
├── <span class="file">build.gradle</span>
├── <span class="file">gradle.properties</span>
├── <span class="file">gradlew</span>
├── <span class="file">gradlew.bat</span>
└── <span class="file">settings.gradle</span>
:::

5. In `TeamCode/build.gradle`, add the following dependencies:

   - `implementation 'org.apache.commons:commons-math3:3.6.1'`
   - `implementation 'com.acmerobotics.roadrunner:core:0.5.3'`

```groovy{9-11}
/* TeamCode/build.gradle */
apply from: '../build.common.gradle'
apply from: '../build.dependencies.gradle'

dependencies {
    implementation project(':FtcRobotController')
    annotationProcessor files('lib/OpModeAnnotationProcessor.jar')

    implementation 'org.apache.commons:commons-math3:3.6.1'

    implementation 'com.acmerobotics.roadrunner:core:0.5.3'
}
```

7. Look for the `FtcRobotController/build.gradle` file. Find `JavaVersion.VERSION_1_7` and replace it with `JavaVersion.VERSION_1_8`:

```groovy{3-4}
/* FtcRobotController/build.gradle lines 18-21 */
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}
```

8. We now need to copy over all the java files from the `TeamCode` folder located in the online quickstart repo (all the files from [this folder](https://github.com/acmerobotics/road-runner-quickstart/tree/master/TeamCode/src/main/java/org/firstinspires/ftc/teamcode)). Copy over all the files from both the `drive` and `util` folder into a location in your project, preferably just your `TeamCode` folder. These classes include all the files and utilities required for tuning and dashboard logging.

9. Finally, you must edit your `FtcRobotControllerActivity.java` file to work with ftc-dashboard. Directions can be found [here](https://acmerobotics.github.io/ftc-dashboard/gettingstarted).<br><br>Or (preferably) just copy the `FtcRobotControllerActivity.java` file from the quickstart repo [here](https://github.com/acmerobotics/road-runner-quickstart/blob/master/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/internal/FtcRobotControllerActivity.java) and paste it into your project. Replace the `FtcRobotControllerActivity.java` file located in <span class="break-words">`YourFTCProject/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/internal/FtcRobotControllerActivity.java`</span> with the file you downloaded from that GitHub link.

   It is okay if there are errors in Android Studio. The project will build fine.

## Upgrading Firmware

It is highly recommended that you upgrade the firmware on your Control Hub or Expansion Hub to the latest version. Firmware version 1.8.2 brings a number of improvements including: DC motor output linearity, improved close-loop controls, improved I2C speeds, and USB recovery for ESD faults. Road Runner's performance directly benefits from these improvements.

Directions to upgrade the Control/Expansion Hub firmware can be found [in the REV docs](https://docs.revrobotics.com/rev-control-system/managing-the-control-system/updating-firmware).

**That's it!** You're set! The installation process is done. Now go on ahead and start tuning.
