package se.apals.fairmanager.activities;

import android.content.Context;
import android.content.Intent;
import android.content.res.ColorStateList;
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
import se.apals.fairmanager.fragments.exhibitors.ExhibitorRecyclerViewAdapter;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.models.Settings;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.models.events.ExhibitorLoadedEvent;
import se.apals.fairmanager.models.events.ExhibitorsLoadedEvent;
import se.apals.fairmanager.models.events.LoadExhibitorEvent;

public class ExhibitorDetailActivity extends AppCompatActivity {

    private static final String KEY_EXHIBITOR_ID = "KEY_EXHIBITOR_ID";

    public static void start(Context c, String exhibitorId) {
        Intent i = new Intent(c, ExhibitorDetailActivity.class);
        i.putExtra(KEY_EXHIBITOR_ID, exhibitorId);
        c.startActivity(i);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exhibitor_detail);
        loadExhibitor(getIntent().getStringExtra(KEY_EXHIBITOR_ID));
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("plain/text");
                intent.putExtra(Intent.EXTRA_EMAIL, new String[]{"exhibitor@exh.com"});
                intent.putExtra(Intent.EXTRA_SUBJECT, "Regarding the fair");
                startActivity(Intent.createChooser(intent, ""));
            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        setUpColors();

    }

    private void setUpColors() {
        SettingsUtils.setActivityColors(this);
        final Settings settings = SettingsUtils.getSettings(this);

        //Sets the color of the title background when collapsed
        final CollapsingToolbarLayout collapsingToolbar = (CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar);
        if (collapsingToolbar != null) {
            collapsingToolbar.setContentScrimColor(Color.parseColor(settings.getPrimaryColor()));
        }

        //Sets the background color of the backgrop
        final View appBarLayout = findViewById(R.id.app_bar);
        if (appBarLayout != null) {
            appBarLayout.setBackgroundColor(Color.parseColor(settings.getPrimaryColor()));
        }

        final FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        if (fab != null) {
            fab.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor(settings.getAccentColor())));
        }
    }

    private void loadExhibitor(String id) {
        BusProvider.getInstance().post(new LoadExhibitorEvent(id));
    }

    @Subscribe
    public void onExhibitorLoaded(ExhibitorLoadedEvent event) {
        ((TextView) findViewById(R.id.activity_exhibitor_detail_textview_info)).setText(event.exhibitor.getInfo());
        ((CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar)).setTitle(event.exhibitor.getName());
        showLoader(false);

        if (getSupportFragmentManager().findFragmentById(R.id.chat_fragment_container) == null) {
            Fragment newFragment = ChatMessageFragment.newInstance("exhibitor/" + event.exhibitor.getName().replace(".", ""));
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            ft.add(R.id.chat_fragment_container, newFragment).commit();
        }
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
