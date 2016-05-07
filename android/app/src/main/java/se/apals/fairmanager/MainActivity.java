package se.apals.fairmanager;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.MenuItemCompat;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.squareup.otto.Subscribe;

import java.util.ArrayList;
import java.util.List;

import se.apals.fairmanager.activities.ChatActivity;
import se.apals.fairmanager.fragments.events.EventFragment;
import se.apals.fairmanager.fragments.exhibitors.ExhibitorFragment;
import se.apals.fairmanager.fragments.partners.PartnerFragment;
import se.apals.fairmanager.fragments.personnel.PersonFragment;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.models.Settings;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.models.Tab;
import se.apals.fairmanager.models.events.LoadSettingsEvent;
import se.apals.fairmanager.models.events.SettingsLoadedEvent;

public class MainActivity extends AppCompatActivity implements UpdateSettingsInteractor {

    /**
     * The {@link android.support.v4.view.PagerAdapter} that will provide
     * fragments for each of the sections. We use a
     * {@link FragmentPagerAdapter} derivative, which will keep every
     * loaded fragment in memory. If this becomes too memory intensive, it
     * may be best to switch to a
     * {@link android.support.v4.app.FragmentStatePagerAdapter}.
     */
    private SectionsPagerAdapter mSectionsPagerAdapter;

    /**
     * The {@link ViewPager} that will host the section contents.
     */
    private ViewPager mViewPager;
    private Menu menu;
    private SearchView mSearchView;
    private TabLayout mTabLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Settings mSettings = SettingsUtils.getSettings(this);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        // Create the adapter that will return a fragment for each of the three
        // primary sections of the activity.
        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager(), mSettings.getTabs());

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);


        mTabLayout = (TabLayout) findViewById(R.id.tabs);
        mTabLayout.setupWithViewPager(mViewPager);
        setUpColors();

        mViewPager.addOnPageChangeListener(onPageChangeListener);
        mViewPager.setOffscreenPageLimit(3);

    }

    private void setUpColors() {
        Settings s = SettingsUtils.getSettings(this);
        SettingsUtils.setActivityColors(this, R.id.toolbar, R.id.tabs);
        mTabLayout.setSelectedTabIndicatorColor(Color.parseColor(s.getAccentColor()));

        mTabLayout.setTabTextColors(
            Color.parseColor(s.getTitleTextColor()),
            Color.parseColor(s.getTitleTextColor()));

        setUpMenuItemsColor();
    }


    ViewPager.OnPageChangeListener onPageChangeListener = new ViewPager.OnPageChangeListener() {

        // This method will be invoked when a new page becomes selected.
        @Override
        public void onPageSelected(int position) {
            Fragment fragment = (Fragment) mSectionsPagerAdapter.instantiateItem(mViewPager, position);
            menu.findItem(R.id.action_search).collapseActionView();
            if (fragment instanceof SearchView.OnQueryTextListener) {
                mSearchView.setOnQueryTextListener((SearchView.OnQueryTextListener) fragment);
                menu.findItem(R.id.action_search).setVisible(true);
            } else {
                menu.findItem(R.id.action_search).setVisible(false);
            }
        }

        // This method will be invoked when the current page is scrolled
        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            // Code goes here
        }

        // Called when the scroll state changes:
        // SCROLL_STATE_IDLE, SCROLL_STATE_DRAGGING, SCROLL_STATE_SETTLING
        @Override
        public void onPageScrollStateChanged(int state) {
            // Code goes here
        }
    };


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        //Only create the menu once
        if (this.menu != null) return true;
        this.menu = menu;
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        setUpMenuItemsColor();

        //Set up search view
        MenuItem searchItem = menu.findItem(R.id.action_search);
        mSearchView = (SearchView) MenuItemCompat.getActionView(searchItem);
        onPageChangeListener.onPageSelected(0);
        return true;
    }

    private void setUpMenuItemsColor() {
        Menu menu = this.menu;
        if (menu == null) return;

        MenuItem searchItem = menu.findItem(R.id.action_search);
        MenuItem chatItem = menu.findItem(R.id.action_chat);
        Drawable[] icons = new Drawable[]{searchItem.getIcon(), chatItem.getIcon()};

        for (Drawable drawable : icons) {
            // If we don't mutate the drawable, then all drawable's with this id will have a color
            // filter applied to it.
            drawable.mutate();
            drawable.setColorFilter(Color.parseColor(SettingsUtils.getSettings(this).getTitleTextColor()), PorterDuff.Mode.SRC_ATOP);
            //drawable.setAlpha(alpha);
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        } else if (id == R.id.action_chat) {
            ChatActivity.start(this);
        }

        return super.onOptionsItemSelected(item);
    }

    public static void start(Activity context, boolean withAnimation) {
        Intent i = new Intent(context, MainActivity.class);
        context.startActivity(i);
        if (!withAnimation) {
            context.overridePendingTransition(0, 0);
        }
    }

    @Subscribe
    public void onSettingsLoaded(SettingsLoadedEvent event) {
        //Save the settings
        SettingsUtils.setSettings(this, event.settings);
        setUpColors();
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
    public void refreshSettings() {
        BusProvider.getInstance().post(new LoadSettingsEvent());
    }


    /**
     * A {@link FragmentPagerAdapter} that returns a fragment corresponding to
     * one of the sections/tabs/pages.
     */
    public class SectionsPagerAdapter extends FragmentStatePagerAdapter {


        private final List<Tab> tabs = new ArrayList<>();

        public SectionsPagerAdapter(FragmentManager fm, List<Tab> tabs) {
            super(fm);

            for (Tab t : tabs) {
                if (t.isActive()) {
                    this.tabs.add(t);
                }
            }
        }


        @Override
        public Fragment getItem(int position) {
            // getItem is called to instantiate the fragment for the given page.
            // Return a PlaceholderFragment (defined as a static inner class below).

            Fragment f;
            String name = tabs.get(position).getName();

            if (name.equalsIgnoreCase(getString(R.string.exhibitors))) {
                f = ExhibitorFragment.newInstance();
            } else if (name.equalsIgnoreCase(getString(R.string.events))) {
                f = EventFragment.newInstance();
            } else if (name.equalsIgnoreCase(getString(R.string.partners))) {
                f = PartnerFragment.newInstance();
            } else if (name.equalsIgnoreCase(getString(R.string.personnel))) {
                f = PersonFragment.newInstance();
            } else {
                throw new RuntimeException("The names of the tabs do not align with the backend");
            }

            return f;
        }


        @Override
        public int getCount() {
            return tabs.size();
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return tabs.get(position).getName();
        }
    }
}
