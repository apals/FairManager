package se.apals.fairmanager.models;

import com.google.gson.annotations.SerializedName;

public class Person {

    @SerializedName("_id")
    private String id;
    private String name;
    private String title;

    @Override
    public boolean equals(Object o) {
        return o instanceof Person && ((Person) o).getId().equals(getId());
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
     * @return The title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title The title
     */
    public void setTitle(String title) {
        this.title = title;
    }

}
