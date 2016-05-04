package se.apals.fairmanager.models;

import android.support.annotation.NonNull;

import com.google.gson.annotations.SerializedName;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Event implements Comparable<Event> {

    @SerializedName("_id")
    protected String id;
    protected String name;
    protected Date startDate;
    protected Date endDate;
    protected String imageUrl;

    @Override
    public boolean equals(Object o) {
        return o instanceof Event && ((Event) o).getId().equals(getId());
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
    public Date getStartDate() {
        return startDate;
    }

    /**
     * @param startDate The startDate
     */
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    /**
     * @return The endDate
     */
    public Date getEndDate() {
        return endDate;
    }

    /**
     * @param endDate The endDate
     */
    public void setEndDate(Date endDate) {
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
    public int compareTo(@NonNull Event another) {
        return getStartDate().compareTo(another.getStartDate());
    }

    public String getFormattedStartDateAndTime() {
        return new SimpleDateFormat("dd MMM\nhh:mm").format(startDate.getTime()).toString().toUpperCase();
    }

    public String getFormattedStartDate() {
        return new SimpleDateFormat("dd MMM\nyyyy").format(startDate.getTime()).toString().toUpperCase();
    }
}
