package app.utils;

import app.objects.Category;
import app.objects.Post;
import app.objects.Tag;
import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;
import com.google.gson.Gson;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.UUID;
import java.util.stream.Collectors;

public class Utils {

    public static final String RELATIONAL_WEBSITE_URL = "";
    //    public static final String WEBSITE_URL = "http://185.173.104.77";
    public static final String WEBSITE_URL = "http://185.173.104.77";

    static TimeZone tz = TimeZone.getTimeZone("UTC");
    static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    public static String generateRandomString(){
        return UUID.randomUUID().toString();
    }

    public static String formatTimeString(String timeString){
        return timeString.substring(0, 2) + ":" + timeString.substring(2);
    }

    public static String fixUri(String fileDownloadUri) {
        try {
            return new URL(fileDownloadUri).getPath();
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return fileDownloadUri.replace("http://localhost:8083", "/api/");
        }
    }

    /*public static String saveFile(InputStream uploadedInputStream,
                           FormDataContentDisposition fileDetail,
                           FormDataBodyPart body,
                           String relPath) throws IOException {

        final String SRC_UPLOAD_PATH = "./ui/app" + relPath;

        String uploadedFileName =  fileDetail.getFileName();
        String uniqueUploadedFileName =  (uploadedFileName + "_"
                + (new Date()).toString()).replace(" ", "").replace(":","")
                + "." + body.getMediaType().getSubtype();

        Files.copy(uploadedInputStream, Paths.get(SRC_UPLOAD_PATH + uniqueUploadedFileName),
                StandardCopyOption.REPLACE_EXISTING);

        return relPath + uniqueUploadedFileName;
    }


    public static void setCommentsAuthor(List<Comment> comments, UserDao userDao, ContactDao contactDao) {
        comments.forEach(comment -> {
            if(comment.getUserId() > 0){
                User u = userDao.getUserById(comment.getUserId());
                comment.setUserName(u.getName());
                comment.setUserImageUrl(u.getImageUrl());
            }else if(comment.getContactId() > 0 ){
                Contact contact = contactDao.getContactById(comment.getContactId());
                comment.setUserName(contact.getName());
                comment.setUserImageUrl(contact.getImageUrl());
            }
        });
    }*/


    public static Date convertStringToDateUTC(String dateString){
        Calendar cal = Calendar.getInstance(tz);
        sdf.setCalendar(cal);
        try {
            cal.setTime(sdf.parse(dateString));
            return cal.getTime();
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }

    }

    public static void sendMessageToTelegram(Post post) {
        try {
            String urlString = "https://api.telegram.org/bot%s/sendMessage";

            String apiToken = "855924836:AAGmLLAg_uG1cT7sTb82oH31ZQdpKTClbMA";
            String chatId = "@iraneAzadChannel";

            String text = "";

            String tags = post.getTags().stream().map(tag -> "#" + tag.getName()).collect(Collectors.joining(" "));
            String categories = post.getCategories().stream().map(Category::getName).collect(Collectors.joining(" | "));

            text += "<b>" + post.getTitle() + "</b>\n" +
                    (post.getAuthor() != null ? post.getAuthor() + "\n\n" : "") +
                    categories + "\n" +
                    post.getExcerpt() + "\n" + "\n" +
                    tags + "\n" +
                    "<a href=\"http://iraneazad.org/" + post.getId() + "\">Read more...</a> \n" +
                    (post.getLink() != null ? "<a href=\"" + post.getLink() + "\">Source</a> " : "");

            urlString = String.format(urlString, apiToken);
/*
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
            String response = sb.toString();*/


            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestMethod("POST");

            JSONObject jObject = new JSONObject();
            jObject.accumulate("chat_id", chatId);
            jObject.accumulate("text", text);
            jObject.accumulate("disable_notification", "true");
            jObject.accumulate("parse_mode", "HTML");

            Gson gson = new Gson();
            OutputStream os = conn.getOutputStream();
            os.write(jObject.toString().getBytes("UTF-8"));
            os.close();

            InputStream in = new BufferedInputStream(conn.getInputStream());
            String result = org.apache.commons.io.IOUtils.toString(in, "UTF-8");


            in.close();
            conn.disconnect();

        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }
    }

}
