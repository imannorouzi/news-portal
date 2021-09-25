package app.objects;

import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;

import javax.persistence.*;

@Entity(name = "wk_style")
public class Style {

    public Style(){
    }

    public Style(
             int id,
             String attribute,
             String value) {

        this.id = id;
        this.attribute = attribute;
        this.value = value;
    }

    public Style(String attribute, String value){
        this.attribute = attribute;
        this.value = value;
    }

    /**
     * Created by puyan on 12/11/2017.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "attribute")
    String attribute;

    @Column(name = "value")
    private String value;

    public Style(JSONObject jo) throws JSONException {
        this.attribute = jo.has("attribute") ? jo.getString("attribute") : "";
        this.value = jo.has("value") ? jo.getString("value") : "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String tag) {
        this.attribute = tag;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
