package se.apals.fairmanager.network;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import se.apals.fairmanager.models.Exhibitor;
import se.apals.fairmanager.models.ExhibitorDetail;

/**
 * Created by apals on 29/04/16.
 */
public interface FairManagerApi {

    @GET("companies")
    Call<List<Exhibitor>> getExhibitors();

    @GET("companies/{id}")
    Call<ExhibitorDetail> getExhibitor(@Path("id") String id);
}