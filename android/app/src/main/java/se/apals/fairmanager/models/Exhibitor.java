package se.apals.fairmanager.models;

import com.google.gson.annotations.SerializedName;


public class Exhibitor implements Comparable<Exhibitor> {

    @Override
    public boolean equals(Object o) {
        boolean instance = o instanceof Exhibitor;
        boolean id = ((Exhibitor) o).getId().equals(getId());
        return instance && id;
    }

    @SerializedName("_id")
    protected String id;
    protected String name;
    protected String logoUrl;

    /**
     * @return The id
     */
    public String getId() {
        return id;
    }

    /**
     * @param Id The _id
     */
    public void setId(String Id) {
        this.id = Id;
    }

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
     * @return The logoUrl
     */
    public String getLogoUrl() {
        return logoUrl;
    }

    /**
     * @param logoUrl The logoUrl
     */
    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    @Override
    public int compareTo(Exhibitor another) {
        return getName().compareTo(another.getName());
    }
}
