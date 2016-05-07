package se.apals.fairmanager.models;

import com.google.gson.annotations.SerializedName;

/**
 * Created by apals on 29/04/16.
 */
public class Partner {

    @SerializedName("_id")
    private String id;
    private String name;
    private String websiteUrl;
    private String logoUrl;

    @Override
    public boolean equals(Object o) {
        return o instanceof Partner && ((Partner) o).getId().equals(getId());
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
     * @return The websiteUrl
     */
    public String getWebsiteUrl() {
        return websiteUrl;
    }

    /**
     * @param websiteUrl The websiteUrl
     */
    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
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

}
