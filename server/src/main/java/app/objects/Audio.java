package app.objects;

import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;

import javax.persistence.*;

@Entity(name = "wk_audio")
public class Audio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @Column(name = "url")
    String url;

    @Column(name = "filename")
    private String filename;

    @Column(name = "status")
    private String status;

    @Column(name = "title")
    private String title;

    public Audio(){
    }

    public Audio(String attribute, String value){
        this.url = attribute;
        this.filename = value;
    }

    public Audio(JSONObject jo) throws JSONException {
        this.url = jo.has("attribute") ? jo.getString("attribute") : "";
        this.filename = jo.has("value") ? jo.getString("value") : "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String tag) {
        this.url = tag;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String value) {
        this.filename = value;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
