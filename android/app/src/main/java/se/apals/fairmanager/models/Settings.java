package se.apals.fairmanager.models;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by apals on 30/04/16.
 */

public class Settings {

    public static final String KEY_PRIMARY_COLOR = "KEY_PRIMARY_COLOR";
    public static final String KEY_SETTINGS = "KEY_SETTINGS";

    @SerializedName("_id")
    private String id;
    private String primaryColor;
    private String primaryTextColor;
    private String titleTextColor;
    private String tintColor;
    private String contentMode;
    private String accentColor;

    private String primarySubTextColor;
    private String backgroundColor;
    private Integer V;
    private List<Tab> tabs = new ArrayList<Tab>();

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
     * The primaryColor
     */
    public String getPrimaryColor() {
        return primaryColor;
    }

    /**
     *
     * @param primaryColor
     * The primaryColor
     */
    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    /**
     *
     * @return
     * The primaryTextColor
     */
    public String getPrimaryTextColor() {
        return primaryTextColor;
    }

    /**
     *
     * @param primaryTextColor
     * The primaryTextColor
     */
    public void setPrimaryTextColor(String primaryTextColor) {
        this.primaryTextColor = primaryTextColor;
    }

    /**
     *
     * @return
     * The titleTextColor
     */
    public String getTitleTextColor() {
        return titleTextColor;
    }

    /**
     *
     * @param titleTextColor
     * The titleTextColor
     */
    public void setTitleTextColor(String titleTextColor) {
        this.titleTextColor = titleTextColor;
    }

    /**
     *
     * @return
     * The tintColor
     */
    public String getTintColor() {
        return tintColor;
    }

    /**
     *
     * @param tintColor
     * The tintColor
     */
    public void setTintColor(String tintColor) {
        this.tintColor = tintColor;
    }

    /**
     *
     * @return
     * The contentMode
     */
    public String getContentMode() {
        return contentMode;
    }

    /**
     *
     * @param contentMode
     * The contentMode
     */
    public void setContentMode(String contentMode) {
        this.contentMode = contentMode;
    }

    /**
     *
     * @return
     * The accentColor
     */
    public String getAccentColor() {
        return accentColor;
    }

    /**
     *
     * @param accentColor
     * The accentColor
     */
    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    /**
     *
     * @return
     * The primarySubTextColor
     */
    public String getPrimarySubTextColor() {
        return primarySubTextColor;
    }

    /**
     *
     * @param primarySubTextColor
     * The primarySubTextColor
     */
    public void setPrimarySubTextColor(String primarySubTextColor) {
        this.primarySubTextColor = primarySubTextColor;
    }

    /**
     *
     * @return
     * The backgroundColor
     */
    public String getBackgroundColor() {
        return backgroundColor;
    }

    /**
     *
     * @param backgroundColor
     * The backgroundColor
     */
    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    /**
     *
     * @return
     * The V
     */
    public Integer getV() {
        return V;
    }

    /**
     *
     * @param V
     * The __v
     */
    public void setV(Integer V) {
        this.V = V;
    }

    /**
     *
     * @return
     * The tabs
     */
    public List<Tab> getTabs() {
        return tabs;
    }

    /**
     *
     * @param tabs
     * The tabs
     */
    public void setTabs(List<Tab> tabs) {
        this.tabs = tabs;
    }

}
class Tab {

    private String name;
    private Boolean isActive;
    private String Id;

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
     * The isActive
     */
    public Boolean getIsActive() {
        return isActive;
    }

    /**
     *
     * @param isActive
     * The isActive
     */
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    /**
     *
     * @return
     * The id
     */
    public String getId() {
        return Id;
    }

    /**
     *
     * @param Id
     * The _id
     */
    public void setId(String Id) {
        this.Id = Id;
    }

}
