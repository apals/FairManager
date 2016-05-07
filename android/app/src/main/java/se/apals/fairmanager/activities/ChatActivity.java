package se.apals.fairmanager.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import se.apals.fairmanager.R;
import se.apals.fairmanager.fragments.chat.ChatMessageFragment;
import se.apals.fairmanager.models.ChatMessage;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.network.ApiConstants;

public class ChatActivity extends AppCompatActivity {


    public static void start(Context context) {
        Intent i = new Intent(context, ChatActivity.class);
        context.startActivity(i);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        SettingsUtils.setActivityColors(this, R.id.toolbar);


        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        if (getSupportFragmentManager().findFragmentById(R.id.chat_fragment_container) == null) {
            Fragment newFragment = ChatMessageFragment.newInstance("general");
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            ft.add(R.id.chat_fragment_container, newFragment).commit();
        }
    }

}
