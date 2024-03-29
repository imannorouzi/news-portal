package app.objects;

import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;

/**
 * Created by puyan on 3/20/2018.
 */
public class AppImage {

    int id, postId;
    String name, url;

    public AppImage(int id,
                    int postId,
                    String name,
                    String url){
        this.postId = postId;
        this.id = id;
        this.name = name;
        this.url = url;
    }

    public AppImage(JSONObject jo) throws JSONException {

        this.postId = jo.getInt("event_id");
        this.id = jo.has("id") ? jo.getInt("id") : -1;
        this.name = jo.getString("name");
        this.url = jo.getString("url");
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }
}
