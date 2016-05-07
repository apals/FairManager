package se.apals.fairmanager.fragments.chat;

import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.graphics.drawable.DrawableCompat;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageButton;

import com.firebase.client.ChildEventListener;
import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.ui.FirebaseRecyclerAdapter;

import se.apals.fairmanager.R;
import se.apals.fairmanager.models.ChatMessage;
import se.apals.fairmanager.models.SettingsUtils;
import se.apals.fairmanager.network.ApiConstants;


public class ChatMessageFragment extends Fragment {

    private FirebaseRecyclerAdapter mAdapter;
    private Firebase mFirebase;
    private static final String KEY_TYPE = "KEY_TYPE";
    private EditText chatEditText;
    private String mUsername;
    private String mType;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public ChatMessageFragment() {
    }

    public static ChatMessageFragment newInstance(String type) {
        ChatMessageFragment fragment = new ChatMessageFragment();
        Bundle args = new Bundle();
        args.putString(KEY_TYPE, type);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mUsername = PreferenceManager.getDefaultSharedPreferences(getContext()).getString("KEY_USERNAME", "Anonymous");
        mType = getArguments().getString(KEY_TYPE);
        mFirebase = new Firebase(ApiConstants.FIREBASE_URL + "/" + mType);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_chatmessage_list, container, false);

        Context context = view.getContext();
        final RecyclerView recyclerView = (RecyclerView) view.findViewById(R.id.list);
        final LinearLayoutManager layout = new LinearLayoutManager(context);
        recyclerView.setLayoutManager(layout);

        mAdapter = new ChatMessageRecyclerViewAdapter(ChatMessage.class, R.layout.fragment_chatmessage_list_item, ChatMessageRecyclerViewAdapter.ChatMessageViewHolder.class, mFirebase);
        recyclerView.setAdapter(mAdapter);

        mFirebase.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                recyclerView.scrollToPosition(mAdapter.getItemCount() - 1);
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(FirebaseError firebaseError) {

            }
        });
        return view;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        chatEditText = (EditText) view.findViewById(R.id.chat_edittext);
        Drawable wrappedDrawable = DrawableCompat.wrap(chatEditText.getBackground());
        DrawableCompat.setTint(wrappedDrawable.mutate(), Color.parseColor(SettingsUtils.getSettings(getActivity()).getAccentColor()));
        chatEditText.setBackground(wrappedDrawable);

        ((ImageButton) view.findViewById(R.id.send_button)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String msg = chatEditText.getText().toString();
                if (!msg.trim().isEmpty()) {
                    mFirebase.push().setValue(new ChatMessage(mUsername, msg));
                    chatEditText.setText("");
                }
            }
        });
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mAdapter.cleanup();
    }
}
