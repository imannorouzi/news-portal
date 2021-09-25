package app.objects;

import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;

import javax.persistence.*;

@Entity(name = "wk_tag")
public class Tag {

    public Tag() {}

    public Tag(
             String name) {
        this.name = name;
    }

    /**
     * Created by puyan on 12/11/2017.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(name = "name")
    private String name;

    public Tag(JSONObject jo) throws JSONException {
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
