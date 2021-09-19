import com.google.gson.Gson;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ServiceTest {

    public static void main(String []args) throws IOException {
        Gson gson = new Gson();
        String jsonString = new String(Files.readAllBytes(Paths.get("services.json")));
        Services servicesObj = gson.fromJson(jsonString, Services.class);

        System.out.println(servicesObj);
    }
}
