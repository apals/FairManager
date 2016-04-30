package se.apals.fairmanager.fragments.chat;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.firebase.client.Firebase;
import com.firebase.ui.FirebaseRecyclerAdapter;

import se.apals.fairmanager.R;
import se.apals.fairmanager.models.ChatMessage;

/**
 * Created by apals on 30/04/16.
 */
public class ChatMessageRecyclerViewAdapter extends FirebaseRecyclerAdapter<ChatMessage, ChatMessageRecyclerViewAdapter.ChatMessageViewHolder> {

    public ChatMessageRecyclerViewAdapter(Class<ChatMessage> modelClass, int modelLayout, Class<ChatMessageViewHolder> viewHolderClass, Firebase ref) {
        super(modelClass, modelLayout, viewHolderClass, ref);
    }

    @Override
    public void populateViewHolder(ChatMessageViewHolder chatMessageViewHolder, ChatMessage chatMessage, int position) {
        chatMessageViewHolder.nameText.setText(chatMessage.getAuthor());
        chatMessageViewHolder.messageText.setText(chatMessage.getMessage());
    }

    @Override
    public ChatMessageViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.fragment_chatmessage_list_item, parent, false);
        return new ChatMessageViewHolder(view);
    }

    public class ChatMessageViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView nameText;
        public final TextView messageText;
        public ChatMessage mItem;

        public ChatMessageViewHolder(View view) {
            super(view);
            mView = view;
            nameText = (TextView) view.findViewById(R.id.name);
            messageText = (TextView) view.findViewById(R.id.message);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + messageText.getText() + "'";
        }

    }

}


