package se.apals.fairmanager.models.events;

import java.util.List;

import se.apals.fairmanager.models.Event;

/**
 * Created by apals on 29/04/16.
 */
public class EventsLoadedEvent {
    public final List<Event> events;
    public EventsLoadedEvent(List<Event> body) {
        this.events = body;
    }
}
