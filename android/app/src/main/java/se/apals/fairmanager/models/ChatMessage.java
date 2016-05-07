package se.apals.fairmanager.models;

/**
 * Created by apals on 30/04/16.
 */
public class ChatMessage {

    private String message;
    private String author;

    // Required default constructor for Firebase object mapping
    @SuppressWarnings("unused")
    private ChatMessage() {
    }

    public ChatMessage(String author, String message) {
        this.author = author;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public String getAuthor() {
        return author;
    }
}
