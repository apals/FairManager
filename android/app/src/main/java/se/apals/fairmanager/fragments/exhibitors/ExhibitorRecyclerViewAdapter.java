package se.apals.fairmanager.fragments.exhibitors;

import android.graphics.drawable.Drawable;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;

import se.apals.fairmanager.R;
import se.apals.fairmanager.activities.ExhibitorDetailActivity;
import se.apals.fairmanager.models.Exhibitor;

import java.util.ArrayList;
import java.util.List;

public class ExhibitorRecyclerViewAdapter extends RecyclerView.Adapter<ExhibitorRecyclerViewAdapter.ViewHolder> {

    private final List<Exhibitor> mValues;

    public ExhibitorRecyclerViewAdapter(List<Exhibitor> items) {
        if(items == null) {
            items = new ArrayList<Exhibitor>();
        }
        mValues = items;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_exhibitor_list_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mContentView.setText(mValues.get(position).getName());
        Glide.with(holder.mView.getContext()).load(holder.mItem.getLogoUrl()).into(new GlideDrawableImageViewTarget(holder.mLogoView) {
            @Override
            public void onLoadFailed(Exception e, Drawable errorDrawable) {
                Glide.with(holder.mView.getContext()).load(R.mipmap.ic_launcher).into(holder.mLogoView);
            }
        });

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ExhibitorDetailActivity.start(v.getContext(), holder.mItem.getId());
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mContentView;
        public final ImageView mLogoView;
        public Exhibitor mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mContentView = (TextView) view.findViewById(R.id.content);
            mLogoView = (ImageView) view.findViewById(R.id.logo);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mContentView.getText() + "'";
        }
    }
}
