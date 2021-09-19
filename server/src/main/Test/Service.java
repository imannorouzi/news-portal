public class Service {
    /*
    *
    *  "id": 13,
      "name": "MTN Gaming Premier League (GPL) Weekly",
      "status": "testing",
      "service_id": "23401220000028199",
      "operator_id": "23401",
      "sp_id": "2340110011628",
      "sp_name": "AFICAN CONTENT LIMITED(GPL)",
      "product": "234012000024264",
      "channel_id": "1",
      "short_code": "5775",
      "operator": "MTN"
      *
      * */

    int id;
    String name,
        status,
    service_id,
    operator_id,
    sp_id,
    sp_name,
    product,
    channel_id,
    short_code,
    operator;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getService_id() {
        return service_id;
    }

    public void setService_id(String service_id) {
        this.service_id = service_id;
    }

    public String getOperator_id() {
        return operator_id;
    }

    public void setOperator_id(String operator_id) {
        this.operator_id = operator_id;
    }

    public String getSp_id() {
        return sp_id;
    }

    public void setSp_id(String sp_id) {
        this.sp_id = sp_id;
    }

    public String getSp_name() {
        return sp_name;
    }

    public void setSp_name(String sp_name) {
        this.sp_name = sp_name;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getChannel_id() {
        return channel_id;
    }

    public void setChannel_id(String channel_id) {
        this.channel_id = channel_id;
    }

    public String getShort_code() {
        return short_code;
    }

    public void setShort_code(String short_code) {
        this.short_code = short_code;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }
}
