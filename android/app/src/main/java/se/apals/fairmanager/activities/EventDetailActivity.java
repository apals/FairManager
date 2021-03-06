package se.apals.fairmanager.activities;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.provider.CalendarContract;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.ActivityOptionsCompat;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.content.ContextCompat;
import android.support.v4.graphics.drawable.DrawableCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.drawable.GlideDrawable;
import com.bumptech.glide.request.animation.GlideAnimation;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.squareup.otto.Subscribe;

import java.io.IOException;
import java.util.List;

import se.apals.fairmanager.R;
import se.apals.fairmanager.fragments.chat.ChatMessageFragment;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.models.EventDetail;
import se.apals.fairmanager.models.Settings;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.models.events.EventLoadedEvent;
import se.apals.fairmanager.models.events.LoadEventEvent;

public class EventDetailActivity extends AppCompatActivity {

    private static final String KEY_EVENT_ID = "KEY_EVENT_ID";
    private EventDetail mEvent;
    private FloatingActionButton mFab;


    public static void start(Context context, String exhibitorId) {
        ActivityOptionsCompat compat = ActivityOptionsCompat.makeSceneTransitionAnimation((Activity) context);
        Intent i = new Intent(context, EventDetailActivity.class);
        i.putExtra(KEY_EVENT_ID, exhibitorId);
        context.startActivity(i, compat.toBundle());
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_detail);
        loadEvent(getIntent().getStringExtra(KEY_EVENT_ID));
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setUpFab();
        setUpColors();
    }

    private void setBackdrop() {
        final ImageView imageView = (ImageView) findViewById(R.id.backdrop);

        Glide.with(this).load(mEvent.getImageUrl()).crossFade().into(new GlideDrawableImageViewTarget(imageView) {
            @Override
            public void onResourceReady(GlideDrawable resource, GlideAnimation<? super GlideDrawable> animation) {
                super.onResourceReady(resource, animation);
                resource.setBounds(imageView.getLeft(), imageView.getTop(), imageView.getRight(), imageView.getBottom());
            }
        });
    }

    private void loadEvent(String id) {
        BusProvider.getInstance().post(new LoadEventEvent(id));
    }

    @Subscribe
    public void onEventLoaded(EventLoadedEvent event) {
        mEvent = event.event;
        setUpTitle();
        setUpLocation();
        setUpAbout();
        setUpDateAndTime();
        showLoader(false);
        addChatFragmentForEvent();
        setUpMapFragment();
        setBackdrop();
    }

    private void setUpFab() {
        mFab = (FloatingActionButton) findViewById(R.id.fab);
        if (mFab != null) {
            mFab.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {

                    Intent intent = new Intent(Intent.ACTION_INSERT)
                        .setData(CalendarContract.Events.CONTENT_URI)
                        .putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, mEvent.getStartDate().getTime())
                        .putExtra(CalendarContract.EXTRA_EVENT_END_TIME, mEvent.getEndDate().getTime())
                        .putExtra(CalendarContract.Events.TITLE, mEvent.getName())
                        .putExtra(CalendarContract.Events.DESCRIPTION, mEvent.getInfo())
                        .putExtra(CalendarContract.Events.EVENT_LOCATION, mEvent.getLocation())
                        .putExtra(CalendarContract.Events.AVAILABILITY, CalendarContract.Events.AVAILABILITY_BUSY);
                    startActivity(intent);
                }
            });
        }
    }

    private void setUpMapFragment() {
        SupportMapFragment mapFragment = SupportMapFragment.newInstance();




        OnMapReadyCallback mapReadyCallback = new OnMapReadyCallback() {
            @Override
            public void onMapReady(GoogleMap googleMap) {
                Geocoder coder = new Geocoder(EventDetailActivity.this);
                List<Address> addresses;
                try {
                    addresses = coder.getFromLocationName(mEvent.getLocation(), 1);
                } catch (IOException e) {
                    e.printStackTrace();
                    return;
                }

                for (Address a : addresses) {
                    LatLng place = new LatLng(a.getLatitude(), a.getLongitude());
                    googleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(place, 14.0f));
                    googleMap.addMarker(new MarkerOptions().position(place));
                }
            }
        };
        mapFragment.getMapAsync(mapReadyCallback);
        getSupportFragmentManager().beginTransaction().add(R.id.map_fragment_container, mapFragment).commit();

    }

    private void setUpLocation() {
        ((TextView) findViewById(R.id.event_location)).setText(mEvent.getLocation());
    }

    private void addChatFragmentForEvent() {
        if (getSupportFragmentManager().findFragmentById(R.id.chat_fragment_container) == null) {
            Fragment newFragment = ChatMessageFragment.newInstance("event/" + mEvent.getName());
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            ft.add(R.id.chat_fragment_container, newFragment).commit();
        }
    }

    private void setUpTitle() {
        ((CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar)).setTitle(mEvent.getName());
    }

    private void setUpDateAndTime() {
        String time = mEvent.getFormattedStartDate();
        time += "\n";
        time += mEvent.getFormattedStartTime() + " - " + mEvent.getFormattedEndTime();
        ((TextView) findViewById(R.id.event_date)).setText(time);
    }

    private void setUpAbout() {
        ((TextView) findViewById(R.id.activity_event_detail_textview_info)).setText(mEvent.getInfo());
    }


    private void setUpColors() {

        SettingsUtils.setActivityColors(this);
        final Settings settings = SettingsUtils.getSettings(this);

        Drawable drawable = mFab.getDrawable();
        // Wrap the drawable so that future tinting calls work
        // on pre-v21 devices. Always use the returned drawable.
        drawable = DrawableCompat.wrap(drawable);

        // We can now set a tint
        DrawableCompat.setTint(drawable, ContextCompat.getColor(this, android.R.color.white));
        // ...or a tint list
        DrawableCompat.setTintList(drawable, ColorStateList.valueOf(ContextCompat.getColor(this, android.R.color.white)));


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
