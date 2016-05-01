package se.apals.fairmanager;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
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
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import se.apals.fairmanager.activities.ChatActivity;
import se.apals.fairmanager.fragments.events.EventFragment;
import se.apals.fairmanager.fragments.exhibitors.ExhibitorFragment;
import se.apals.fairmanager.fragments.partners.PartnerFragment;
import se.apals.fairmanager.models.Settings;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.models.Tab;

public class MainActivity extends AppCompatActivity {

    private Settings mSettings;

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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mSettings = SettingsUtils.getSettings(this);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        // Create the adapter that will return a fragment for each of the three
        // primary sections of the activity.
        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager(), mSettings.getTabs());

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        SettingsUtils.setActivityColors(this, R.id.toolbar, R.id.tabs);
        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(mViewPager);

        mViewPager.addOnPageChangeListener(onPageChangeListener);

    }


    ViewPager.OnPageChangeListener onPageChangeListener = new ViewPager.OnPageChangeListener() {

        // This method will be invoked when a new page becomes selected.
        @Override
        public void onPageSelected(int position) {
            Fragment fragment = (Fragment) mSectionsPagerAdapter.instantiateItem(mViewPager, position);
            if (fragment instanceof SearchView.OnQueryTextListener) {
                mSearchView.setOnQueryTextListener((SearchView.OnQueryTextListener) fragment);
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
        this.menu = menu;
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);


        final MenuItem item = menu.findItem(R.id.action_search);
        mSearchView = (SearchView) MenuItemCompat.getActionView(item);
        onPageChangeListener.onPageSelected(0);
        return true;
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

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {
        /**
         * The fragment argument representing the section number for this
         * fragment.
         */
        private static final String ARG_SECTION_NUMBER = "section_number";

        public PlaceholderFragment() {
        }

        /**
         * Returns a new instance of this fragment for the given section
         * number.
         */
        public static PlaceholderFragment newInstance(int sectionNumber) {
            PlaceholderFragment fragment = new PlaceholderFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_main, container, false);
            TextView textView = (TextView) rootView.findViewById(R.id.section_label);
            textView.setText(getString(R.string.section_format, getArguments().getInt(ARG_SECTION_NUMBER)));
            return rootView;
        }
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
            } else {
                f = PlaceholderFragment.newInstance(position + 1);
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
