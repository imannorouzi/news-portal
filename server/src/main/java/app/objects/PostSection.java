package app.objects;

import com.amazonaws.util.json.JSONArray;
import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Entity(name = "wk_post_section")
public class PostSection {

    public PostSection(){

    }

    public PostSection(
             int id,
             int postId,
             String type,
             String imageUrl,
             String text,
             List<PostSectionStyle> styles) {

        this.imageUrl = "null".equals(imageUrl) ? "" : imageUrl;
        this.type = "null".equals(type) ? POST_SECTION_TYPE.UNKNOWN.name() : type;
        this.postId = postId;
        this.id = id;
        this.text = text;
        this.postSectionStyles = styles;
    }

    /**
     * Created by Pooyan on 12/11/2017.
     */

    public enum POST_SECTION_TYPE {IMAGE, FILE, VIDEO, AUDIO, UNKNOWN}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "post_id")
    Integer postId;

    @Column(name = "image_url")
    String imageUrl;

    @Column(name = "text")
    private String text;

    @Column(name = "type")
    private String type;

    @OneToMany
    private List<PostSectionStyle> postSectionStyles;

    public PostSection(JSONObject jo) throws JSONException {
        this.id = jo.has("id") && jo.getInt("id") != 0 ? jo.getInt("id") : -1;
        this.type = jo.has("type") && !"".equals(jo.getString("type")) ?
                jo.getString("type").toUpperCase() : POST_SECTION_TYPE.UNKNOWN.name();
        this.imageUrl = jo.has("imageUrl") ? jo.getString("imageUrl") : "";
        this.text = jo.has("text") ? jo.getString("text") : "";

        JSONObject psso = jo.getJSONObject("style");
        List<PostSectionStyle> styles = new ArrayList<>();

        for (Iterator it = psso.keys(); it.hasNext(); ) {
            String key = (String) it.next();
            styles.add( new PostSectionStyle( key, psso.getString(key)));
        }
        this.setPostSectionStyles(styles);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<PostSectionStyle> getPostSectionStyles() {
        return postSectionStyles;
    }

    public void setPostSectionStyles(List<PostSectionStyle> postSectionStyles) {
        this.postSectionStyles = postSectionStyles;
    }
}
