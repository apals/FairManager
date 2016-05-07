package se.apals.fairmanager.fragments.partners;

import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;

import java.util.ArrayList;
import java.util.List;

import se.apals.fairmanager.R;
import se.apals.fairmanager.models.Partner;

public class PartnerRecyclerViewAdapter extends RecyclerView.Adapter<PartnerRecyclerViewAdapter.ViewHolder> {

    private final List<Partner> mValues;

    public PartnerRecyclerViewAdapter() {
        mValues = new ArrayList<>();
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.fragment_partner_list_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mContentView.setText(mValues.get(position).getName());

        Glide.with(holder.mView.getContext()).load(holder.mItem.getLogoUrl()).fitCenter().crossFade().into(new GlideDrawableImageViewTarget(holder.mBackdrop) {
            @Override
            public void onLoadFailed(Exception e, Drawable errorDrawable) {
                Glide.with(holder.mView.getContext()).load(R.mipmap.ic_launcher).into(holder.mBackdrop);
            }
        });

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String url = holder.mItem.getWebsiteUrl();
                if (!url.startsWith("http://") && !url.startsWith("https://")) {
                    url = "http://" + url;
                }
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                v.getContext().startActivity(browserIntent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public void addAll(List<Partner> partners) {
        for (Partner e : partners) {
            if (!mValues.contains(e)) {
                mValues.add(e);
            }
        }
        notifyDataSetChanged();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mContentView;
        public final ImageView mBackdrop;
        public Partner mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mContentView = (TextView) view.findViewById(R.id.content);
            mBackdrop = (ImageView) view.findViewById(R.id.partner_backdrop);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mContentView.getText() + "'";
        }
    }
}
