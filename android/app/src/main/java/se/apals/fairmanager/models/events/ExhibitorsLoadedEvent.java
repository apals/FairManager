package se.apals.fairmanager.models.events;

import java.util.List;

import se.apals.fairmanager.models.Exhibitor;

/**
 * Created by apals on 29/04/16.
 */
public class ExhibitorsLoadedEvent {
    public final List<Exhibitor> exhibitors;
    public ExhibitorsLoadedEvent(List<Exhibitor> body) {
        exhibitors = body;
    }
}
