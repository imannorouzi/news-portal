package app.api;

import app.mail.MailMessage;
import app.objects.*;
import app.utils.FileStorageService;
import com.amazonaws.util.json.JSONException;
import com.amazonaws.util.json.JSONObject;
import com.google.gson.Gson;
import app.mail.MailUtils;
import app.repositories.RepositoryFactory;
import org.apache.commons.io.FileUtils;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class GeneralAPIs {


    final RepositoryFactory repositoryFactory;

    private final FileStorageService fileStorageService;

    public GeneralAPIs(RepositoryFactory repositoryFactory, FileStorageService fileStorageService) {
        this.repositoryFactory = repositoryFactory;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/send-mail/{template}/{to}")
    public Response sendmail(@PathVariable("template") String template, @PathVariable("to") String to){
        MailUtils.sendTemplate( template, to);
        return Response.ok("OK").build();
    }

    @PostMapping("/contact-us")
    public Response contactUs(String jsonCommentString) {

        Gson gson = new Gson();
        try {
            JSONObject jsonComment = new JSONObject(jsonCommentString);

            ContactUsMessage cum = new ContactUsMessage(jsonComment);

            MailMessage msg = new MailMessage();
            msg.setSubject(cum.getTitle());
            msg.setTo("iman.norouzy@gmail.com");
            msg.setFrom(cum.getEmail());

            String htmlString = FileUtils.readFileToString(new File("./server/src/main/templates/meeting/newMeeting.html"));
            htmlString = htmlString.replace("$title", cum.getTitle());
            htmlString = htmlString.replace("$message", cum.getMessage());


            msg.setBody(htmlString);
            MailUtils.sendMail(msg);

            return Response.ok(gson.toJson(new ResponseObject("OK", "Recieved"))).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500)
                    .build();
        }
    }

    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @PermitAll
    @PostMapping("/upload-file")
    public Response uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
                               @FormDataParam("file") FormDataContentDisposition fileDetail,
                               @FormDataParam("file") FormDataBodyPart body) throws JSONException, IOException {


        final String SRC_UPLOAD_PATH = "./ui/app/images/event/";


        String uploadedFileName =  fileDetail.getFileName();
        String uniqueUploadedFileName =  (uploadedFileName + "_"
                + (new Date()).toString()).replace(" ", "").replace(":","")
                + "." + body.getMediaType().getSubtype();

        Files.copy(uploadedInputStream, Paths.get(SRC_UPLOAD_PATH + uniqueUploadedFileName),
                StandardCopyOption.REPLACE_EXISTING);


        Gson gson = new Gson();
        try {

            String url = "/images/event/" + uniqueUploadedFileName;

            return Response.ok(gson.toJson(new ResponseObject("OK", url)))
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500)
                    .build();
        }
    }

    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @PermitAll
    @PostMapping("/upload-album-image")
    public Response uploadAlbumImage(@FormDataParam("file") InputStream uploadedInputStream,
                                     @FormDataParam("file") FormDataContentDisposition fileDetail,
                                     @FormDataParam("file") FormDataBodyPart body){

        Gson gson = new Gson();

        String url = "";//Utils.saveFile(uploadedInputStream, fileDetail, body, "/images/event/album");

        return Response.ok(gson.toJson(new ResponseObject("OK", url)))
                .build();
    }

    @GetMapping("/convert-date/{date}")
    public Response getAppDetails(@PathVariable("date") String dateString) throws ParseException {
//        String dateString = "2020-07-20T14:00:00.000Z";
        TimeZone tz = TimeZone.getTimeZone("UTC");
        Calendar cal = Calendar.getInstance(tz);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        sdf.setCalendar(cal);
        cal.setTime(sdf.parse(dateString));
        Date date = cal.getTime();


        return Response.ok().entity("OK").build();
    }


    @RequestMapping(value = "/{[path:[^\\.]*}")
    public ResponseEntity<Resource> ui(HttpServletRequest request) throws Exception {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        return ResponseEntity.ok(new InputStreamResource(Objects.requireNonNull(classloader.getResourceAsStream("public/index.html"))));

    }
}
