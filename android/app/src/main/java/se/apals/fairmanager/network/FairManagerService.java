package se.apals.fairmanager.network;

import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.http.GET;
import rx.Observable;
import se.apals.fairmanager.models.Exhibitor;
import se.apals.fairmanager.models.events.ExhibitorsLoadedEvent;
import se.apals.fairmanager.models.events.LoadExhibitorsEvent;
import se.apals.fairmanager.models.events.LoadingExhibitorsFailedEvent;

/**
 * Created by apals on 29/04/16.
 */

public class FairManagerService {
    private FairManagerApi mApi;
    private Bus mBus;

    public FairManagerService(FairManagerApi api, Bus bus) {
        mApi = api;
        mBus = bus;
    }

    @Subscribe
    public void onLoadExhibitors(LoadExhibitorsEvent event) {
        Call<List<Exhibitor>> call = mApi.getExhibitors();
        call.enqueue(new Callback<List<Exhibitor>>() {
            @Override
            public void onResponse(Call<List<Exhibitor>> call, Response<List<Exhibitor>> response) {
                mBus.post(new ExhibitorsLoadedEvent(response.body()));
            }

            @Override
            public void onFailure(Call<List<Exhibitor>> call, Throwable t) {
                mBus.post(new LoadingExhibitorsFailedEvent());
            }
        });
        /* {

            @Override
            public void success(OrganisationGroupsContainer organisationGroupsContainer, Response response) {
            }

            @Override
            public void failure(RetrofitError error) {

            }
        }) ;*/
    }

}