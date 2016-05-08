# Architecture
In order to decouple network logic from the activities, an event bus is used. 
The class FairManagerService.java contains all the networking, but has no connection to any activity. Instead,
the networking is attached to the application context. This decoupling removes the need of checking for e.g.
activity destruction on the UI-thread after a network response has been reported.



## Screenshots

#### Splash screen

![Launcher screenshot](/android/screenshots/launcher-small.png?raw=true "Launcher")

#### Events

![Events screenshot](/android/screenshots/events-small.png?raw=true "Events") &nbsp; &nbsp; 
![Armada event screenshot](/android/screenshots/events-armada-small.png?raw=true "Armada event")
![Armada event chat screen screenshot](/android/screenshots/armada-chat-small.png?raw=true "Chat screen for an event")
!["Global" map for maps](/android/screenshots/events-map-small.png?raw=true "Map for all events")

#### Exhibitors

![Exhibitors](/android/screenshots/exhibitors-small.png?raw=true "Exhibitors")
![Exhibitor search](/android/screenshots/search-small.png?raw=true "Search among exhibitors")
![Spotify exhibitor](/android/screenshots/spotify-small.png?raw=true "Spotify as an exhibitor")

#### Personnel

![Personnel](/android/screenshots/personnel-small.png?raw=true "Personnel")

#### Partners

![Partners](/android/screenshots/partners.png?raw=true "Partners")

#### Chat

![Chat](/android/screenshots/chat.png?raw=true "Chat")


