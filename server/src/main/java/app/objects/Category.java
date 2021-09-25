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
             String name) {
        this.name = name;
    }



    /**
     * Created by puyan on 12/11/2017.
     */

    public enum CONTACT_TYPE {EMPLOYEE, CONTACT, UNKNOWN}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(name = "name")
    private String name;

    public Category(JSONObject jo) throws JSONException {
        this.id = jo.has("id") && jo.getInt("id") != 0 ? jo.getInt("id") : null;
        this.name = jo.has("name") ? jo.getString("name") : "";
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
