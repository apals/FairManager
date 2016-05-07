package se.apals.fairmanager.models.events;

import se.apals.fairmanager.models.ExhibitorDetail;

/**
 * Created by apals on 29/04/16.
 */
public class ExhibitorLoadedEvent {
    public final ExhibitorDetail exhibitor;
    public ExhibitorLoadedEvent(ExhibitorDetail body) {
        exhibitor = body;
    }
}
