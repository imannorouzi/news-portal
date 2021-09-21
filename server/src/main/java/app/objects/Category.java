package app.objects;

import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity(name = "wk_category")
public class Category {

    public Category() {}

    public Category(
             int id,
             String name) {

        this.id = id;
        this.name = name;
    }

    /**
     * Created by Pooyan on 12/11/2017.
     */

    public enum CONTACT_TYPE {EMPLOYEE, CONTACT, UNKNOWN}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "name")
    private String name;

    public Category(JSONObject jo) throws JSONException {
        this.id = jo.has("id") && jo.getInt("id") != 0 ? jo.getInt("id") : -1;
    }

}
