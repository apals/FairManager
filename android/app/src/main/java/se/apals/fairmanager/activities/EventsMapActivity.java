package se.apals.fairmanager.activities;

import android.content.Context;
import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;

import se.apals.fairmanager.R;
import se.apals.fairmanager.models.Event;

public class EventsMapActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private List<Event> mEvents;
    private static final String KEY_EVENTS = "KEY_EVENTS";

    public static void start(Context c, List<Event> events) {
        Intent i = new Intent(c, EventsMapActivity.class);
        i.putExtra(KEY_EVENTS, (Serializable) events);
        c.startActivity(i);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_events_map);
        mEvents = (List<Event>) getIntent().getSerializableExtra(KEY_EVENTS);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
            .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        Geocoder coder = new Geocoder(this);

        //Builder so that we can center the map around
        //all the eventmarkers later
        LatLngBounds.Builder builder = new LatLngBounds.Builder();
        for(Event e : mEvents) {
            try {
                List<Address> locations = coder.getFromLocationName(e.getLocation(), 1);
                for (Address a : locations) {
                    LatLng loc = new LatLng(a.getLatitude(), a.getLongitude());
                    //Include this location in the builder,
                    //i.e. we want to center the camera later on around this and all other
                    //markers
                    builder.include(mMap.addMarker(new MarkerOptions().position(loc).title(e.getName())).getPosition());

                }
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }

        LatLngBounds bounds = builder.build();
        mMap.animateCamera(CameraUpdateFactory.newLatLngBounds(bounds, 10));

    }
}
