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

    public ExhibitorRecyclerViewAdapter() {
        mValues = new ArrayList<Exhibitor>();
    }

    public void addAll(List<Exhibitor> exhibitors) {
        for (Exhibitor e : exhibitors) {
            if(!mValues.contains(e)) {
                mValues.add(e);
            }
        }
        notifyDataSetChanged();
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

    public Exhibitor removeItem(int position) {
        final Exhibitor model = mValues.remove(position);
        notifyItemRemoved(position);
        return model;
    }

    public void addItem(int position, Exhibitor model) {
        mValues.add(position, model);
        notifyItemInserted(position);
    }

    public void moveItem(int fromPosition, int toPosition) {
        final Exhibitor model = mValues.remove(fromPosition);
        mValues.add(toPosition, model);
        notifyItemMoved(fromPosition, toPosition);
    }

    public void animateTo(List<Exhibitor> models) {
        applyAndAnimateRemovals(models);
        applyAndAnimateAdditions(models);
        applyAndAnimateMovedItems(models);
    }

    private void applyAndAnimateRemovals(List<Exhibitor> newModels) {
        for (int i = mValues.size() - 1; i >= 0; i--) {
            final Exhibitor model = mValues.get(i);
            if (!newModels.contains(model)) {
                removeItem(i);
            }
        }
    }

    private void applyAndAnimateAdditions(List<Exhibitor> newModels) {
        for (int i = 0, count = newModels.size(); i < count; i++) {
            final Exhibitor model = newModels.get(i);
            if (!mValues.contains(model)) {
                addItem(i, model);
            }
        }
    }

    private void applyAndAnimateMovedItems(List<Exhibitor> newModels) {
        for (int toPosition = newModels.size() - 1; toPosition >= 0; toPosition--) {
            final Exhibitor model = newModels.get(toPosition);
            final int fromPosition = mValues.indexOf(model);
            if (fromPosition >= 0 && fromPosition != toPosition) {
                moveItem(fromPosition, toPosition);
            }
        }
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
            mLogoView = (ImageView) view.findViewById(R.id.startdate);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mContentView.getText() + "'";
        }
    }
}
