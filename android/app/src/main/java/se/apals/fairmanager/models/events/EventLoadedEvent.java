package se.apals.fairmanager.models.events;

import se.apals.fairmanager.models.EventDetail;

/**
 * Created by apals on 29/04/16.
 */
public class EventLoadedEvent {
    public final EventDetail event;

    public EventLoadedEvent(EventDetail body) {
        this.event = body;
    }
}
