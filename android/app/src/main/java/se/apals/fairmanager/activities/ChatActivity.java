package se.apals.fairmanager.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.client.ValueEventListener;

import se.apals.fairmanager.MainActivity;
import se.apals.fairmanager.R;

public class ChatActivity extends AppCompatActivity {

    private Firebase mFirebase;

    public static void start(Context context) {
        Intent i = new Intent(context, ChatActivity.class);
        context.startActivity(i);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);
        final TextView tv = (TextView) findViewById(R.id.textview_chat);
        Firebase.setAndroidContext(this);
        mFirebase = new Firebase("https://chatexample1337.firebaseio.com/");
        mFirebase.child("message").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                tv.setText(tv.getText() + "\n" + snapshot.getValue());
            }

            @Override
            public void onCancelled(FirebaseError error) {
            }
        });

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    public void sendMessage(View v) {
        String msg = ((EditText) findViewById(R.id.chat_edittext)).getText().toString();
        mFirebase.child("message").setValue(msg);
    }

}
