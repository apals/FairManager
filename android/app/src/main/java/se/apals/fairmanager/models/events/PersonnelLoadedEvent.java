package se.apals.fairmanager.models.events;

import java.util.List;

import se.apals.fairmanager.models.Person;

/**
 * Created by apals on 01/05/16.
 */
public class PersonnelLoadedEvent {
    public final List<Person> personnel;

    public PersonnelLoadedEvent(List<Person> personnel) {
        this.personnel = personnel;
    }
}
