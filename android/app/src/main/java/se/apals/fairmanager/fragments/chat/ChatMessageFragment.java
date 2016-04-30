package se.apals.fairmanager.fragments.chat;

import android.content.Context;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageButton;

import com.firebase.client.Firebase;
import com.firebase.ui.FirebaseRecyclerAdapter;

import se.apals.fairmanager.R;
import se.apals.fairmanager.models.ChatMessage;
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

    @SuppressWarnings("unused")
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
        RecyclerView recyclerView = (RecyclerView) view.findViewById(R.id.list);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

        mAdapter = new ChatMessageRecyclerViewAdapter(ChatMessage.class, R.layout.fragment_chatmessage_list_item, ChatMessageRecyclerViewAdapter.ChatMessageViewHolder.class, mFirebase);
        recyclerView.setAdapter(mAdapter);

        return view;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        chatEditText = (EditText) view.findViewById(R.id.chat_edittext);
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
