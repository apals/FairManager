package se.apals.fairmanager.models;

public class Exhibitor {

    private String id;
    private String name;
    private String logoUrl;

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
}