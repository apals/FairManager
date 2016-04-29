package se.apals.fairmanager.models;

import com.google.gson.annotations.SerializedName;

public class Event implements Comparable<Event> {

    @SerializedName("_id")
    protected String id;
    protected String name;
    protected String startDate;
    protected String endDate;
    protected String imageUrl;

    @Override
    public boolean equals(Object o) {
        return o instanceof Event && ((Event) o).getId() == getId();
    }

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
     * @return The startDate
     */
    public String getStartDate() {
        return startDate;
    }

    /**
     * @param startDate The startDate
     */
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    /**
     * @return The endDate
     */
    public String getEndDate() {
        return endDate;
    }

    /**
     * @param endDate The endDate
     */
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    /**
     * @return The imageUrl
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * @param imageUrl The imageUrl
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public int compareTo(Event another) {
        return getName().compareTo(another.getName());
    }
}
