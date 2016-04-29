package se.apals.fairmanager.models;

/**
 * Created by apals on 29/04/16.
 */
import com.squareup.otto.Bus;

public final class BusProvider {

    private static final Bus BUS = new Bus();

    public static Bus getInstance(){
        return BUS;
    }

    private BusProvider(){}
}
