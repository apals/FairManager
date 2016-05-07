## Colors
- Tab indicator should be accent color
- FAB in detail activities should be accent color

# Architecture
In order to decouple network logic from the activities, an event bus is used. 
The class FairManagerService.java contains all the networking, but has no connection to any activity. Instead,
the networking is attached to the application context. This decoupling removes the need of checking for e.g.
activity destruction on the UI-thread after a network response has been reported.

