package app.objects;

import javax.persistence.*;

@Entity(name = "wk_post_section_meta")
public class PostSectionMeta {

    public PostSectionMeta() {}

    /**
     * Created by puyan on 12/11/2017.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "post_section_id")
    private int postSectionId;

    @Column(name = "attribute")
    private String attribute;

    @Column(name = "value")
    private String value;
}
