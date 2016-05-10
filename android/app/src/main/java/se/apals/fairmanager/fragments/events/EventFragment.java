package se.apals.fairmanager.fragments.events;

import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.support.v4.graphics.drawable.DrawableCompat;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.squareup.otto.Subscribe;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import se.apals.fairmanager.R;
import se.apals.fairmanager.activities.EventsMapActivity;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.models.Event;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.models.events.EventsLoadedEvent;
import se.apals.fairmanager.models.events.LoadEventsEvent;

/**
 * A fragment representing a list of Events
 */
public class EventFragment extends Fragment implements SearchView.OnQueryTextListener {

    private EventRecyclerViewAdapter mAdapter;
    private RecyclerView mRecyclerView;
    private SwipeRefreshLayout mSwipeRefreshLayout;
    private List<Event> mEvents;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public EventFragment() {
    }

    public static EventFragment newInstance() {
        EventFragment fragment = new EventFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadEvents();
    }

    public void loadEvents() {
        BusProvider.getInstance().post(new LoadEventsEvent());
    }

    @Subscribe
    public void onEventsLoaded(EventsLoadedEvent event) {
        mEvents = event.events;
        mAdapter.addAll(event.events);
        showLoader(false);
    }

    private void showLoader(boolean visible) {
        if (getView() == null)
            return;
        int visibility = visible ? View.VISIBLE : View.GONE;
        getView().findViewById(R.id.progress_bar).setVisibility(visibility);

        if (!visible) {
            mSwipeRefreshLayout.setRefreshing(false);
        }
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

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_event_list, container, false);
        Context context = view.getContext();
        mSwipeRefreshLayout = (SwipeRefreshLayout) view.findViewById(R.id.swipeRefreshLayout);
        mRecyclerView = (RecyclerView) view.findViewById(R.id.list);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(context));
        mAdapter = new EventRecyclerViewAdapter();
        mRecyclerView.setAdapter(mAdapter);

        return view;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mSwipeRefreshLayout.setOnRefreshListener(
            new SwipeRefreshLayout.OnRefreshListener() {
                @Override
                public void onRefresh() {
                    //Log.i(LOG_TAG, "onRefresh called from SwipeRefreshLayout");

                    // This method performs the actual data-refresh operation.
                    // The method calls setRefreshing(false) when it's finished.
                    loadEvents();
                }
            }
        );

        final FloatingActionButton fab = (FloatingActionButton) view.findViewById(R.id.fab);
        if (fab != null) {

            Drawable drawable = fab.getDrawable();
            // Wrap the drawable so that future tinting calls work
            // on pre-v21 devices. Always use the returned drawable.
            drawable = DrawableCompat.wrap(drawable);

            // We can now set a tint
            DrawableCompat.setTint(drawable, ContextCompat.getColor(getContext(), android.R.color.white));
            // ...or a tint list
            DrawableCompat.setTintList(drawable, ColorStateList.valueOf(ContextCompat.getColor(getContext(), android.R.color.white)));
            fab.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor(SettingsUtils.getSettings(getActivity()).getAccentColor())));
            fab.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    EventsMapActivity.start(getContext(), mEvents);
                }
            });
        }
    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        return false;
    }

    @Override
    public boolean onQueryTextChange(String query) {
        final List<Event> filteredModelList = filter(mEvents, query);
        mAdapter.animateTo(filteredModelList);
        mRecyclerView.scrollToPosition(0);
        return true;
    }

    private List<Event> filter(List<Event> models, String query) {
        query = query.toLowerCase();

        final List<Event> filteredModelList = new ArrayList<>();
        for (Event model : models) {
            final String text = model.getName().toLowerCase();
            if (text.contains(query)) {
                filteredModelList.add(model);
            }
        }
        Collections.sort(filteredModelList);
        return filteredModelList;
    }
}
