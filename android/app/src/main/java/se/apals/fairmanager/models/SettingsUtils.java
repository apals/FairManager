package se.apals.fairmanager.models;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.preference.PreferenceManager;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.google.gson.Gson;

/**
 * Created by apals on 30/04/16.
 */
public class SettingsUtils {

    private static final String KEY_SETTINGS = "KEY_SETTINGS";
    private static final Gson gson = new Gson();

    public static Settings getSettings(Context c) {
        SharedPreferences p = PreferenceManager.getDefaultSharedPreferences(c);
        String json = p.getString(KEY_SETTINGS, "");

        return gson.fromJson(json, Settings.class);
    }

    public static void setSettings(Context c, Settings s) {
        SharedPreferences.Editor editor = PreferenceManager.getDefaultSharedPreferences(c).edit();
        String json = new Gson().toJson(s);
        editor.putString(Settings.KEY_SETTINGS, json).commit();
    }

    public static void setActivityColors(Activity a, int toolbarId, int tabsId) {
        Settings s = getSettings(a);


        final Toolbar toolbar = (Toolbar) a.findViewById(toolbarId);
        final View tabs = a.findViewById(tabsId);

        if (toolbar != null) {
            toolbar.setBackgroundColor(Color.parseColor(s.getPrimaryColor()));
            toolbar.setTitleTextColor(Color.parseColor(s.getTitleTextColor()));
        }
        if (tabs != null) tabs.setBackgroundColor(Color.parseColor(s.getPrimaryColor()));

        Window window = a.getWindow();

        // clear FLAG_TRANSLUCENT_STATUS flag:
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);

        // add FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS flag to the window
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

        // finally change the color
        window.setStatusBarColor(Color.parseColor(s.getPrimaryColorDark()));

    }

    public static void setActivityColors(Activity a, int toolbarId) {
        setActivityColors(a, toolbarId, -1);
    }

    public static void setActivityColors(Activity a) {
        setActivityColors(a, -1, -1);
    }
}
