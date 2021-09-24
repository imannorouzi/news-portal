package app.objects;

import javax.persistence.*;

@Entity(name = "wk_post_meta")
public class PostMeta {

    public PostMeta() {}

    public PostMeta(int postId, String attribute, String value) {
        this.postId = postId;
        this.attribute = attribute;
        this.value = value;
    }

    /**
     * Created by puyan on 12/11/2017.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "post_id")
    private int postId;

    @Column(name = "attribute")
    private String attribute;

    @Column(name = "value")
    private String value;

    public int getId() {
        return id;
    }

    public int getPostId() {
        return postId;
    }

    public String getAttribute() {
        return attribute;
    }

    public String getValue() {
        return value;
    }
}
