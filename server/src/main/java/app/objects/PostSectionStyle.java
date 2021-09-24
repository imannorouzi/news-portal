package app.objects;

import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity(name = "wk_post_section_style")
public class PostSectionStyle {

    public PostSectionStyle(){

    }

    public PostSectionStyle(
             int id,
             int postId,
             String tag,
             String value) {

        this.id = id;
        this.postSectionId = postId;
        this.tag = tag;
        this.value = value;

    }

    public PostSectionStyle(int postSectionId, String tag, String value){
        this.postSectionId = postSectionId;
        this.tag = tag;
        this.value = value;
    }
    public PostSectionStyle(String tag, String value){
        this.tag = tag;
        this.value = value;
    }

    /**
     * Created by puyan on 12/11/2017.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "post_section_id")
    Integer postSectionId;

    @Column(name = "tag")
    String tag;

    @Column(name = "value")
    private String value;

    public PostSectionStyle(JSONObject jo) throws JSONException {
        this.id = jo.has("id") && jo.getInt("id") != 0 ? jo.getInt("id") : -1;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getPostSectionId() {
        return postSectionId;
    }

    public void setPostSectionId(Integer postId) {
        this.postSectionId = postId;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
