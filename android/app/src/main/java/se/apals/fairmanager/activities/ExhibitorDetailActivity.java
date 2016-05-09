package se.apals.fairmanager.activities;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityOptionsCompat;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.transition.Explode;
import android.transition.Transition;
import android.transition.TransitionInflater;
import android.transition.TransitionSet;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.drawable.GlideDrawable;
import com.bumptech.glide.request.animation.GlideAnimation;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;
import com.squareup.otto.Subscribe;

import se.apals.fairmanager.R;
import se.apals.fairmanager.fragments.chat.ChatMessageFragment;
import se.apals.fairmanager.fragments.exhibitors.ExhibitorRecyclerViewAdapter;
import se.apals.fairmanager.models.BusProvider;
import se.apals.fairmanager.models.ExhibitorDetail;
import se.apals.fairmanager.models.Settings;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.models.events.ExhibitorLoadedEvent;
import se.apals.fairmanager.models.events.ExhibitorsLoadedEvent;
import se.apals.fairmanager.models.events.LoadExhibitorEvent;

public class ExhibitorDetailActivity extends AppCompatActivity {

    private static final String KEY_EXHIBITOR_ID = "KEY_EXHIBITOR_ID";
    private ExhibitorDetail mExhibitor;

    public static void start(Context context, String exhibitorId, View transitionView) {
        ActivityOptionsCompat compat = ActivityOptionsCompat.makeSceneTransitionAnimation((Activity) context, transitionView.findViewById(R.id.content), "transition_view");
        Intent i = new Intent(context, ExhibitorDetailActivity.class);
        i.putExtra(KEY_EXHIBITOR_ID, exhibitorId);
        context.startActivity(i, compat.toBundle());
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_exhibitor_detail);

        /*if (Build.VERSION.SDK_INT >= 21) {
            postponeEnterTransition();
        }*/

        loadExhibitor(getIntent().getStringExtra(KEY_EXHIBITOR_ID));
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        TextView mTextViewToolbarTitle = getTextViewTitle(toolbar);
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            mTextViewToolbarTitle.setTransitionName("transition_view");
        }



        setUpColors();

    }

    public static TextView getTextViewTitle(Toolbar toolbar){
        TextView textViewTitle = null;
        for(int i = 0; i<toolbar.getChildCount(); i++) {
            View view = toolbar.getChildAt(i);
            if(view instanceof TextView) {
                textViewTitle = (TextView) view;
                break;
            }
        }
        return textViewTitle;
    }

    private void setBackdrop() {
        final ImageView imageView = (ImageView) findViewById(R.id.backdrop);
        /*if (Build.VERSION.SDK_INT >= 21) {
            startPostponedEnterTransition();
        } else {
            imageView.setVisibility(View.VISIBLE);
        }*/
        Glide.with(this).load(mExhibitor.getBannerUrl()).crossFade().into(new GlideDrawableImageViewTarget(imageView) {
            @Override
            public void onResourceReady(GlideDrawable resource, GlideAnimation<? super GlideDrawable> animation) {
                super.onResourceReady(resource, animation);
                resource.setBounds(imageView.getLeft(), imageView.getTop(), imageView.getRight(), imageView.getBottom());
            }
        });
    }

    private void setUpColors() {
        SettingsUtils.setActivityColors(this);
        final Settings settings = SettingsUtils.getSettings(this);

        //Sets the color of the title background when collapsed
        final CollapsingToolbarLayout collapsingToolbar = (CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar);
        if (collapsingToolbar != null) {
            collapsingToolbar.setContentScrimColor(Color.parseColor(settings.getPrimaryColor()));
        }

        //Sets the background color of the backgrop
        final View appBarLayout = findViewById(R.id.app_bar);
        if (appBarLayout != null) {
            appBarLayout.setBackgroundColor(Color.parseColor(settings.getPrimaryColor()));
        }

        final FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        if (fab != null) {
            fab.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor(settings.getAccentColor())));
        }
    }

    private void loadExhibitor(String id) {
        BusProvider.getInstance().post(new LoadExhibitorEvent(id));
    }

    @Subscribe
    public void onExhibitorLoaded(final ExhibitorLoadedEvent event) {
        mExhibitor = event.exhibitor;
        ((TextView) findViewById(R.id.activity_exhibitor_detail_textview_info)).setText(event.exhibitor.getInfo());
        ((CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar)).setTitle(event.exhibitor.getName());

        showLoader(false);

        if (getSupportFragmentManager().findFragmentById(R.id.chat_fragment_container) == null) {
            Fragment newFragment = ChatMessageFragment.newInstance("exhibitor/" + event.exhibitor.getName().replace(".", ""));
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            ft.add(R.id.chat_fragment_container, newFragment).commit();
        }

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("plain/text");
                intent.putExtra(Intent.EXTRA_EMAIL, new String[]{event.exhibitor.getContactEmail()});
                intent.putExtra(Intent.EXTRA_SUBJECT, getString(R.string.fair_email_subject));
                startActivity(Intent.createChooser(intent, ""));
            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setBackdrop();
    }

    private void showLoader(boolean b) {
        int visibility = b ? View.VISIBLE : View.GONE;
        findViewById(R.id.progress_bar).setVisibility(visibility);
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

}
