package se.apals.fairmanager;

import android.app.Application;

import com.firebase.client.Firebase;
import com.squareup.otto.Bus;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.network.ApiConstants;
import se.apals.fairmanager.network.FairManagerApi;
import se.apals.fairmanager.network.FairManagerService;

/**
 * Created by apals on 29/04/16.
 */
public class FairManagerApplication extends Application {


    private FairManagerService fairManagerService;
    private Bus mBus = BusProvider.getInstance();


    @Override
    public void onCreate() {
        super.onCreate();
        Firebase.setAndroidContext(this);
        fairManagerService = new FairManagerService(buildApi(), mBus);
        mBus.register(fairManagerService);
        mBus.register(this); //listen for "global" events
    }

    private FairManagerApi buildApi() {
        Retrofit f = new Retrofit.Builder()
                .baseUrl(ApiConstants.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        return f.create(FairManagerApi.class);
    }

}
