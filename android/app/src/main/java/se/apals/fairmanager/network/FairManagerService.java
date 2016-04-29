package se.apals.fairmanager.network;

import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.http.GET;
import se.apals.fairmanager.models.Exhibitor;
import se.apals.fairmanager.models.ExhibitorDetail;
import se.apals.fairmanager.models.events.ExhibitorLoadedEvent;
import se.apals.fairmanager.models.events.ExhibitorsLoadedEvent;
import se.apals.fairmanager.models.events.LoadExhibitorEvent;
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
    }

    @Subscribe
    public void onLoadExhibitor(LoadExhibitorEvent event) {
        Call<ExhibitorDetail> call = mApi.getExhibitor(event.id);
        call.enqueue(new Callback<ExhibitorDetail>() {
            @Override
            public void onResponse(Call<ExhibitorDetail> call, Response<ExhibitorDetail> response) {
                mBus.post(new ExhibitorLoadedEvent(response.body()));
            }

            @Override
            public void onFailure(Call<ExhibitorDetail> call, Throwable t) {
                mBus.post(new LoadingExhibitorsFailedEvent());
            }
        });
    }

}