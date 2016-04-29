package se.apals.fairmanager.fragments.exhibitors;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.squareup.otto.Subscribe;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import se.apals.fairmanager.R;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.models.Exhibitor;
import se.apals.fairmanager.models.events.ExhibitorsLoadedEvent;
import se.apals.fairmanager.models.events.LoadExhibitorsEvent;


/**
 * A fragment representing a list of Exhibitors
 */
public class ExhibitorFragment extends Fragment implements SearchView.OnQueryTextListener {

    private RecyclerView mRecyclerView;
    private SwipeRefreshLayout mSwipeRefreshLayout;
    private ExhibitorRecyclerViewAdapter mAdapter;
    private List<Exhibitor> mExhibitors;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public ExhibitorFragment() {
    }

    public static ExhibitorFragment newInstance() {
        ExhibitorFragment fragment = new ExhibitorFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadExhibitors();
    }

    public void loadExhibitors() {
        BusProvider.getInstance().post(new LoadExhibitorsEvent());
    }

    @Subscribe
    public void onExhibitorsLoaded(ExhibitorsLoadedEvent event) {
        mExhibitors = event.exhibitors;
        Collections.sort(mExhibitors);
        mAdapter.addAll(mExhibitors);
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
        View view = inflater.inflate(R.layout.fragment_exhibitor_list, container, false);
        Context context = view.getContext();
        mSwipeRefreshLayout = (SwipeRefreshLayout) view.findViewById(R.id.swipeRefreshLayout);
        mRecyclerView = (RecyclerView) view.findViewById(R.id.list);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(context));
        mAdapter = new ExhibitorRecyclerViewAdapter();
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
                    loadExhibitors();
                }
            }
        );
    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        return false;
    }

    @Override
    public boolean onQueryTextChange(String query) {
        final List<Exhibitor> filteredModelList = filter(mExhibitors, query);
        mAdapter.animateTo(filteredModelList);
        mRecyclerView.scrollToPosition(0);
        return true;
    }

    private List<Exhibitor> filter(List<Exhibitor> models, String query) {
        query = query.toLowerCase();

        final List<Exhibitor> filteredModelList = new ArrayList<>();
        for (Exhibitor model : models) {
            final String text = model.getName().toLowerCase();
            if (text.contains(query)) {
                filteredModelList.add(model);
            }
        }
        return filteredModelList;
    }

}
