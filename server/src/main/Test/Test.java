import app.repositories.RepositoryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class Test {

    @Autowired
    RepositoryFactory repositoryFactory;

    public static void main(String []args){

        /*try {
            (new Test()).readByDate();
        } catch (ParseException e) {
            e.printStackTrace();
        }*/


        (new Test()).sendMessageToTelegram();
    }

    public void hash(){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String bc = bCryptPasswordEncoder.encode("mingus");

        System.out.println(bc);
    }


    /*public void readByDate() throws ParseException {

        String dateString = "2020-07-20T14:00:00.000Z";
        TimeZone tz = TimeZone.getTimeZone("UTC");
        Calendar cal = Calendar.getInstance(tz);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        sdf.setCalendar(cal);
        cal.setTime(sdf.parse(dateString));
        Date date = cal.getTime();

        List<Event> events = repositoryFactory.getEventRepository().findMyMeetings(
                22,
                "iman.norouzy@gmail.com",
                new Timestamp(date.getTime()),
                true
        );
        System.out.println(events.size());
    }*/

    public void sendMessageToTelegram() {
        try {
        String urlString = "https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s";

        String apiToken = "855924836:AAGmLLAg_uG1cT7sTb82oH31ZQdpKTClbMA";
        String chatId = "@iraneAzadChannel";
        String text = "Hello world!";

        urlString = String.format(urlString, apiToken, chatId, text);

        URL url = new URL(urlString);
        URLConnection conn = null;
            conn = url.openConnection();


        StringBuilder sb = new StringBuilder();
        InputStream is = new BufferedInputStream(conn.getInputStream());
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String inputLine = "";
        while ((inputLine = br.readLine()) != null) {
            sb.append(inputLine);
        }
        String response = sb.toString();} catch (IOException e) {
            e.printStackTrace();
        }
    }


}
