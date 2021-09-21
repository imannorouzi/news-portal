package app.objects;

import javax.persistence.*;

@Entity(name = "wk_category_post")
public class CategoryPost {

    public CategoryPost() {}

    /**
     * Created by Pooyan on 12/11/2017.
     */

    public enum CONTACT_TYPE {EMPLOYEE, CONTACT, UNKNOWN}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "postId")
    private int postId;

    @Column(name = "category_id")
    private int categoryId;


}
