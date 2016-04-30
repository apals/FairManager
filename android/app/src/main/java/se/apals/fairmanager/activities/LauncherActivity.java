package se.apals.fairmanager.activities;

import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import se.apals.fairmanager.MainActivity;
import se.apals.fairmanager.R;

public class LauncherActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launcher);

        if (PreferenceManager.getDefaultSharedPreferences(this).contains("KEY_USERNAME")) {
            MainActivity.start(this, false);
        }
    }

    public void setUserName(View view) {
        String username = ((EditText) findViewById(R.id.login_edittext)).getText().toString().trim();
        if(username.trim().isEmpty()) {
            Toast.makeText(this, "Your username cannot consist of only whitespace or be empty!", Toast.LENGTH_SHORT).show();
            return;
        }
        PreferenceManager.getDefaultSharedPreferences(this).edit().putString("KEY_USERNAME", username).commit();
        MainActivity.start(this, true);
    }
}
