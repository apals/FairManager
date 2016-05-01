package se.apals.fairmanager.network;

import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.http.GET;
import se.apals.fairmanager.models.Event;
import se.apals.fairmanager.models.EventDetail;
import se.apals.fairmanager.models.Exhibitor;
import se.apals.fairmanager.models.ExhibitorDetail;
import se.apals.fairmanager.models.Partner;
import se.apals.fairmanager.models.Settings;
import se.apals.fairmanager.models.events.EventLoadedEvent;
import se.apals.fairmanager.models.events.EventsLoadedEvent;
import se.apals.fairmanager.models.events.ExhibitorLoadedEvent;
import se.apals.fairmanager.models.events.ExhibitorsLoadedEvent;
import se.apals.fairmanager.models.events.LoadEventEvent;
import se.apals.fairmanager.models.events.LoadEventsEvent;
import se.apals.fairmanager.models.events.LoadExhibitorEvent;
import se.apals.fairmanager.models.events.LoadExhibitorsEvent;
import se.apals.fairmanager.models.events.LoadPartnersEvent;
import se.apals.fairmanager.models.events.LoadSettingsEvent;
import se.apals.fairmanager.models.events.LoadingEventsFailedEvent;
import se.apals.fairmanager.models.events.LoadingExhibitorsFailedEvent;
import se.apals.fairmanager.models.events.LoadingPartnersFailedEvent;
import se.apals.fairmanager.models.events.PartnersLoadedEvent;
import se.apals.fairmanager.models.events.SettingsLoadedEvent;

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



    @Subscribe
    public void onLoadEvents(LoadEventsEvent event) {
        Call<List<Event>> call = mApi.getEvents();
        call.enqueue(new Callback<List<Event>>() {
            @Override
            public void onResponse(Call<List<Event>> call, Response<List<Event>> response) {
                mBus.post(new EventsLoadedEvent(response.body()));
            }

            @Override
            public void onFailure(Call<List<Event>> call, Throwable t) {
                mBus.post(new LoadingEventsFailedEvent());
            }
        });
    }

    @Subscribe
    public void onLoadEvent(LoadEventEvent event) {
        Call<EventDetail> call = mApi.getEvent(event.id);
        call.enqueue(new Callback<EventDetail>() {
            @Override
            public void onResponse(Call<EventDetail> call, Response<EventDetail> response) {
                mBus.post(new EventLoadedEvent(response.body()));
            }

            @Override
            public void onFailure(Call<EventDetail> call, Throwable t) {
                mBus.post(new LoadingEventsFailedEvent());
            }
        });
    }

    @Subscribe
    public void onLoadSettings(LoadSettingsEvent event) {
        Call<Settings> call = mApi.getSettings();
        call.enqueue(new Callback<Settings>() {
            @Override
            public void onResponse(Call<Settings> call, Response<Settings> response) {
                mBus.post(new SettingsLoadedEvent(response.body()));
            }

            @Override
            public void onFailure(Call<Settings> call, Throwable t) {
                mBus.post(new LoadingEventsFailedEvent());
            }
        });
    }

    @Subscribe
    public void onLoadPartners(LoadPartnersEvent event) {
        Call<List<Partner>> call = mApi.getPartners();
        call.enqueue(new Callback<List<Partner>>() {
            @Override
            public void onResponse(Call<List<Partner>> call, Response<List<Partner>> response) {
                mBus.post(new PartnersLoadedEvent(response.body()));
            }

            @Override
            public void onFailure(Call<List<Partner>> call, Throwable t) {
                mBus.post(new LoadingPartnersFailedEvent());
            }
        });
    }

}
