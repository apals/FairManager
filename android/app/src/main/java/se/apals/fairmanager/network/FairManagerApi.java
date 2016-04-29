package se.apals.fairmanager.network;

import java.io.IOException;
import java.util.List;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
import rx.Observable;
import rx.schedulers.Schedulers;
import se.apals.fairmanager.models.Exhibitor;

/**
 * Created by apals on 29/04/16.
 */
public interface FairManagerApi {

    @GET("companies")
    Call<List<Exhibitor>> getExhibitors();
}