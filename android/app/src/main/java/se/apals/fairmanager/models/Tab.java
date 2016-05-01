package se.apals.fairmanager.models;

/**
 * Created by apals on 30/04/16.
 */
public class Tab implements Comparable<Tab> {

    private String name;
    private Boolean isActive;
    private String Id;

    /**
     * @return The name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name The name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return The isActive
     */
    public Boolean isActive() {
        return isActive;
    }

    /**
     * @param isActive The isActive
     */
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    /**
     * @return The id
     */
    public String getId() {
        return Id;
    }

    /**
     * @param Id The _id
     */
    public void setId(String Id) {
        this.Id = Id;
    }

    @Override
    public int compareTo(Tab another) {

        int i = isActive().compareTo(another.isActive());
        if (i != 0) return i;

        return getName().compareTo(another.getName());

    }
}
