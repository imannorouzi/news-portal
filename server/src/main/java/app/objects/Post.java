package app.objects;

import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity(name = "wk_post")
public class Post {

    public Post(){
    }

    /**
     * Created by Pooyan on 12/11/2017.
     */

    public enum CONTACT_TYPE {EMPLOYEE, CONTACT, UNKNOWN}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "user_id")
    Integer userId;

    @Column(name = "type")
    String type;

    @Column(name = "title")
    private String title;

    @Column(name = "status")
    private String status;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created")
    Timestamp created;

    @Column(name = "modified")
    Timestamp modified;

    @Column(name = "style")
    String style;

    @Column(name = "excerpt")
    String excerpt;

    @Column(name = "tags")
    String tags; // comma separated

    @Column(name = "author")
    String author; // comma separated

    @Column(name = "link")
    String link; // comma separated

    @ManyToMany
    List<Category> categories;

    @OneToMany
    List<PostSection> postSections;


    public Post(JSONObject jo) throws JSONException {
        this.id = jo.has("id") && jo.getInt("id") != 0 ? jo.getInt("id") : -1;
        this.type = jo.has("type") && !"".equals(jo.getString("type")) ?
                jo.getString("type").toUpperCase() : CONTACT_TYPE.UNKNOWN.name();
        this.title = jo.getString("name");
        this.status = jo.getString("phone");
        this.userId = jo.has("chairId")   ? jo.getInt("chairId") : 0;
        this.imageUrl = jo.has("imageUrl") && !"null".equals(imageUrl) ? jo.getString("imageUrl") : "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Timestamp getCreated() {
        return created;
    }

    public void setCreated(Timestamp created) {
        this.created = created;
    }

    public Timestamp getModified() {
        return modified;
    }

    public void setModified(Timestamp modified) {
        this.modified = modified;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getExcerpt() {
        return excerpt;
    }

    public void setExcerpt(String excerpt) {
        this.excerpt = excerpt;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<PostSection> getPostSections() {
        return postSections;
    }

    public void setPostSections(List<PostSection> postSections) {
        this.postSections = postSections;
    }
}
