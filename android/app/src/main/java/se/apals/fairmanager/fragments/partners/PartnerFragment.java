package se.apals.fairmanager.fragments.partners;

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
import se.apals.fairmanager.fragments.partners.PartnerRecyclerViewAdapter;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.models.Partner;
import se.apals.fairmanager.models.events.PartnersLoadedEvent;
import se.apals.fairmanager.models.events.LoadPartnersEvent;

/**
 * A fragment representing a list of Partners
 */
public class PartnerFragment extends Fragment {

    private PartnerRecyclerViewAdapter mAdapter;
    private RecyclerView mRecyclerView;
    private SwipeRefreshLayout mSwipeRefreshLayout;
    private List<Partner> mPartners;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public PartnerFragment() {
    }

    public static PartnerFragment newInstance() {
        PartnerFragment fragment = new PartnerFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadPartners();
    }

    public void loadPartners() {
        BusProvider.getInstance().post(new LoadPartnersEvent());
    }

    @Subscribe
    public void onPartnersLoaded(PartnersLoadedEvent event) {
        mPartners = event.partners;
        mAdapter.addAll(event.partners);
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
        View view = inflater.inflate(R.layout.fragment_partner_list, container, false);
        Context context = view.getContext();
        mSwipeRefreshLayout = (SwipeRefreshLayout) view.findViewById(R.id.swipeRefreshLayout);
        mRecyclerView = (RecyclerView) view.findViewById(R.id.list);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(context));
        mAdapter = new PartnerRecyclerViewAdapter();
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
                    loadPartners();
                }
            }
        );
    }
}
