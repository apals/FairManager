package se.apals.fairmanager.models.events;

import java.util.List;

import se.apals.fairmanager.models.Partner;

/**
 * Created by apals on 01/05/16.
 */
public class PartnersLoadedEvent {

    public final List<Partner> partners;

    public PartnersLoadedEvent(List<Partner> partners) {
        this.partners = partners;
    }
}
