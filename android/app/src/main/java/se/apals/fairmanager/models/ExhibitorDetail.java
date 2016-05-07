package se.apals.fairmanager.models;

import com.google.gson.annotations.SerializedName;

/**
 * Created by apals on 29/04/16.
 */
public class ExhibitorDetail extends Exhibitor {

    private String info;
    private String bannerUrl;
    private String contactEmail;

    /**
     *
     * @return
     * The id
     */
    public String getId() {
        return id;
    }

    /**
     *
     * @param Id
     * The _id
     */
    public void setId(String Id) {
        this.id = Id;
    }

    /**
     *
     * @return
     * The name
     */
    public String getName() {
        return name;
    }

    /**
     *
     * @param name
     * The name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     *
     * @return
     * The info
     */
    public String getInfo() {
        return info;
    }

    /**
     *
     * @param info
     * The info
     */
    public void setInfo(String info) {
        this.info = info;
    }

    /**
     *
     * @return
     * The logoUrl
     */
    public String getLogoUrl() {
        return logoUrl;
    }

    /**
     *
     * @param logoUrl
     * The logoUrl
     */
    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    /**
     *
     * @return
     * The bannerUrl
     */
    public String getBannerUrl() {
        return bannerUrl;
    }

    /**
     *
     * @param bannerUrl
     * The bannerUrl
     */
    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public String getContactEmail() {
        return contactEmail;
    }

}
