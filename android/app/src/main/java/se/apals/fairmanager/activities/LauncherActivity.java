package se.apals.fairmanager.activities;

import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.squareup.otto.Subscribe;

import se.apals.fairmanager.MainActivity;
import se.apals.fairmanager.R;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.models.Settings;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.models.events.LoadSettingsEvent;
import se.apals.fairmanager.models.events.SettingsLoadedEvent;

public class LauncherActivity extends AppCompatActivity {


    private boolean hasUsername = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launcher);
        hasUsername = PreferenceManager.getDefaultSharedPreferences(this).contains("KEY_USERNAME");

        /**
         * If the user already has used the app, there already is a user name registered
         * Hide the edittext, and send button, and display loading message
         */
        if(hasUsername) {
            ((TextView) findViewById(R.id.login_welcome_textview)).setText(R.string.loading_text);
            findViewById(R.id.login_edittext).setVisibility(View.GONE);
            findViewById(R.id.button_send).setVisibility(View.GONE);
        }
        if(hasSettings()) {
            MainActivity.start(this, true);
            return;
        }
        loadSettings();
    }

    private boolean hasSettings() {
        return PreferenceManager.getDefaultSharedPreferences(this).contains("KEY_SETTINGS");
    }

    @Override
    public void onStart() {
        super.onStart();
        BusProvider.getInstance().register(this);
    }

    @Override
    public void onStop() {
        super.onStop();
        BusProvider.getInstance().unregister(this);
    }

    private void loadSettings() {
        BusProvider.getInstance().post(new LoadSettingsEvent());
    }

    @Subscribe
    public void onSettingsLoaded(SettingsLoadedEvent event) {
        //Save the settings
        SettingsUtils.setSettings(this, event.settings);

        /**
         * If the user already has an account,
         * launch mainactivity once settings have been loaded
         */
        if (hasUsername) {
            MainActivity.start(this, true);
        } else {
            showLoader(false);
            findViewById(R.id.button_send).setEnabled(true);
        }
    }

    private void showLoader(boolean show) {
        int visibility = show ? View.VISIBLE : View.GONE;
        findViewById(R.id.progress_bar).setVisibility(visibility);
    }

    public void setUserName(View view) {
        String username = ((EditText) findViewById(R.id.login_edittext)).getText().toString().trim();
        if (username.trim().isEmpty()) {
            Toast.makeText(this, "Your username cannot consist of only whitespace or be empty!", Toast.LENGTH_SHORT).show();
            return;
        }
        PreferenceManager.getDefaultSharedPreferences(this).edit().putString("KEY_USERNAME", username).commit();
        MainActivity.start(this, true);
    }
}
