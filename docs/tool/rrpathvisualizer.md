## RRPathVisualizer

RRPathVisualizer was written by David, Recharged Green 7236's lead programmer. It is a path "visualizer" in that you write your trajectories as you would for your bot and you stick them in a custom Kotlin project. If you run the program it will display a window and animate the bot along your specified trajectories. I personally prefer this workflow as you can simply copy-paste the trajectories you made in RRPathVisualizer into your own FTC project.

Keep in mind that RRPathVisualizer is written in Kotlin. It should be easy to understand Kotlin if you know Java.

## Installation

1. Install [Intellij](https://www.jetbrains.com/idea/)

   - Although the community edition is free, you can get the ultimate edition for free if you sign up with a [student account](https://www.jetbrains.com/community/education/#students)

2. Clone or download [RRPathVisualizer](https://github.com/RechargedGreen/RRPathVisualizer)
3. Open the project in Intellij

## Usage

1. Open the project in Intellij
   - Android Studio is very similar to Intellij so you should be familiar with the interface
2. You should just be able to press the play button up top without any problems

<figure align="center">
    <img src="../assets/rrpathviz/step-2-half-compress.jpg" alt="Screenshot of RRPathVisualizer open in Intellij">
    <figcaption class="mt-2 text-gray-600 text-center">Peep the play button 👀</figcaption>
</figure>

3. You may have to set the project SDK
   - If so, go to the File > Project Structure
   - Find the "Project SDK" setting. Select the latest JDK version installed. Intellij should come bundled with JDK 14
4. To make your paths, open the `TrajectoryGen.kt` file
5. Find `builder1`. That is the example `TrajectoryBuilder` provided
6. Just use the builder as you would normally
7. You can add more trajectories by calling `list.add(trajectory)`
