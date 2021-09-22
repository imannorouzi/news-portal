package app.objects;

import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlElement;
import java.sql.Timestamp;

@Entity(name = "wk_user")
public class User{

    public User(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;


    @Column(name = "full_name") private String name;
    private String username;
    @Column(name = "role") private String role;
    private String password, email, phone, description = "";
    @Column(name = "confirm_email_uuid") String confirmEmailUUID = "";
    @Column(name = "forget_password_uuid") String forgetPasswordUUID = "";
    @Column(name = "image_url") String imageUrl = "";
    @Transient private String token;

    public enum USER_TYPE {PERSONAL, BUSINESS, UNKNOWN}

    @Column(name = "created_by") private Integer createdBy;
    @Column(name = "modified_by") private Integer modifiedBy;
    Timestamp created, modified;

    @Transient
    USER_TYPE userType;
    @Column(name = "google_password") String googlePassword;

    public User(String name, String type, String email, String password, String imageUrl, String phone) {

        this.name = name;
        this.userType = USER_TYPE.valueOf(type);
        this.username = email;
        this.email = email;
        this.imageUrl = imageUrl;
        this.phone = phone;
        this.password = password;
        this.id = -1;
        this.role = null;
    }

    public User(String name, String password, String role) {
        this.name = name;
        this.role = role;
        this.password = password;
    }

    public User(int id,
                String type,
                String name,
                String username,
                String password,
                String googlePassword,
                String email,
                String imageUrl,
                String phone,
                String description,
                String roles,
                Timestamp created,
                int createdBy,
                Timestamp modified,
                int modifiedBy) {

        this.id = id;
        this.userType = USER_TYPE.valueOf(type);
        this.name  = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.imageUrl = imageUrl;
        this.phone = phone;
        this.googlePassword = googlePassword;
        this.role = role;

        this.description = description;

        this.created = created;
        this.createdBy = createdBy;
        this.modified = modified;
        this.modifiedBy = modifiedBy;
    }

    public User (JSONObject jo) throws JSONException {
        this.setId(jo.getInt("id"));
        this.setUsername(jo.getString("username"));
        this.setName(jo.getString("name"));
        this.setEmail(jo.getString("email"));
        this.setPassword(jo.has("password") ? jo.getString("password") : "");

//        this.setUserType(jo.has("type") ? USER_TYPE.valueOf(jo.getString("type")) : USER_TYPE.PERSONAL);
        this.setPhone(jo.has("phone") ? jo.getString("phone") : "");
        this.setDescription(jo.has("welcomeMessage") ? jo.getString("welcomeMessage") : "");
        this.role = jo.has("role") ? jo.getString("role") : "user";
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    @XmlElement
    public void setName(String name) {
        this.name = name;
    }

    @XmlElement
    public void setRole(String roles) {
        this.role = roles;
    }

    public String getPassword() {
        return password;
    }

    @XmlElement
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int createdBy) {
        this.createdBy = createdBy;
    }

    public Integer getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(int modifiedBy) {
        this.modifiedBy = modifiedBy;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGooglePassword() {
        return googlePassword;
    }

    public void setGooglePassword(String googlePassword) {
        this.googlePassword = googlePassword;
    }

    public USER_TYPE getUserType() {
        return userType;
    }

    public void setUserType(USER_TYPE userType) {
        this.userType = userType;
    }

    public String getConfirmEmailUUID() {
        return confirmEmailUUID;
    }

    public void setConfirmEmailUUID(String confirmEmailUUID) {
        this.confirmEmailUUID = confirmEmailUUID;
    }

    public String getForgetPasswordUUID() {
        return forgetPasswordUUID;
    }

    public void setForgetPasswordUUID(String forgetPasswordUUID) {
        this.forgetPasswordUUID = forgetPasswordUUID;
    }
}
