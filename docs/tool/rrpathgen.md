# RRPathGen

RRPathGen is a program that allows teams to quickly generate trajectories through a GUI. 

Current features:
- Viewing of paths by importing them
- Modification of paths through either the GUI or changing the values in the text fields
- Export of paths in the form of Java code
- Customisation of length and width of the robot
- Support for different sized screens and resolutions
- Paths can be flipped to account for the robot starting in different sides of the field
- Uses same field coordinates as MeepMeep

Check the [GitHub repository](https://www.github.com/Jarhead20/RRPathGen) for more information.

## Installation (Jar)

1. Download the jar from the [releases page](https://github.com/Jarhead20/RRPathGen/releases).
2. Check that you have at least java 8 installed `java --version`
3. Run the jar either by double clicking it or through the command line with `java -jar RRPathGen-X.X.X.jar`


## Installation (Intellij)

1. Clone the repo `git clone https://github.com/Jarhead20/RRPathGen.git`
2. Setup a run configuration
3. Run the app

## Usage

Generate your paths using the key binds below and once you are done export the path with the export button and copy paste it into your autonomous program.

| Key Bind            | Action                  |
|---------------------|-------------------------|
| Left Click          | Add New Point           |
| Left Drag (Point)   | Drags Selected Point    |
| Alt + Left Click    | Change Heading          |
| Left Arrow          | Next Path               |
| Right Arrow         | Previous Path           |
| R                   | Reverse Robot Direction |
| Delete              | Delete Selected Node    |
| Ctrl + Z            | Undo Previous Action    |

If you accidentally do something wrong with the config, just delete it at `%appdata%/RRPathGen` for Windows, `~/Library/Application Support/RRPathGen/config.properties` for MacOS and `~/.RRPathGen/config.properties` for Linux.


## Acknowledgements 
The inspiration from this project came from Technic Bots' [Blitz](https://technicbots.com/Blitz) app.<br />
The field images were aquired from [MeepMeep](https://github.com/NoahBres/MeepMeep).<br />
And a big thank you to [Ryan Brott](https://github.com/rbrott) for helping me with the spline implementation.