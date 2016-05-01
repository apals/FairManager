package se.apals.fairmanager.activities;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.squareup.otto.Subscribe;

import se.apals.fairmanager.R;
import se.apals.fairmanager.fragments.chat.ChatMessageFragment;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.models.events.EventLoadedEvent;
import se.apals.fairmanager.models.events.LoadEventEvent;

public class EventDetailActivity extends AppCompatActivity {

    private static final String KEY_EXHIBITOR_ID = "KEY_EXHIBITOR_ID";

    public static void start(Context c, String eventId) {
        Intent i = new Intent(c, EventDetailActivity.class);
        i.putExtra(KEY_EXHIBITOR_ID, eventId);
        c.startActivity(i);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_detail);
        loadEvent(getIntent().getStringExtra(KEY_EXHIBITOR_ID));
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                    .setAction("Action", null).show();
            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        setUpColors();
    }

    private void loadEvent(String id) {
        BusProvider.getInstance().post(new LoadEventEvent(id));
    }

    @Subscribe
    public void onEventLoaded(EventLoadedEvent event) {
        ((TextView) findViewById(R.id.activity_event_detail_textview_info)).setText(event.event.getInfo());
        ((CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar)).setTitle(event.event.getName());
        showLoader(false);

        if (getSupportFragmentManager().findFragmentById(R.id.chat_fragment_container) == null) {
            Fragment newFragment = ChatMessageFragment.newInstance("event/" + event.event.getName());
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            ft.add(R.id.chat_fragment_container, newFragment).commit();
        }
    }



    private void setUpColors() {
        SettingsUtils.setActivityColors(this);
        ((CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar))
            .setContentScrimColor(
                Color.parseColor(SettingsUtils.getSettings(this).getPrimaryColor())
            );
    }

    private void showLoader(boolean b) {
        int visibility = b ? View.VISIBLE : View.GONE;
        findViewById(R.id.progress_bar).setVisibility(visibility);
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

}