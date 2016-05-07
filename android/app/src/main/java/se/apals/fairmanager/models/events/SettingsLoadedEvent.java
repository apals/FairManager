package se.apals.fairmanager.models.events;

import se.apals.fairmanager.models.Settings;

/**
 * Created by apals on 30/04/16.
 */
public class SettingsLoadedEvent {

    public final Settings settings;

    public SettingsLoadedEvent(Settings settings) {
        this.settings = settings;
    }
}
