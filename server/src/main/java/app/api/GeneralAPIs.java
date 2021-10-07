package app.api;

import app.Application;
import app.mail.MailMessage;
import app.objects.*;
import app.utils.FileStorageService;
import app.utils.Utils;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.HttpHeaders;
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

    @GetMapping("/api/send-mail/{template}/{to}")
    public Response sendmail(@PathVariable("template") String template, @PathVariable("to") String to){
        MailUtils.sendTemplate( template, to);
        return Response.ok("OK").build();
    }

    @PostMapping("/api/contact-us")
    public Response contactUs(@RequestBody String jsonContactUs) {

        Gson gson = new Gson();
        try {

            ContactUsMessage cu = gson.fromJson(jsonContactUs, ContactUsMessage.class);

            Post post = new Post();
            post.setTitle(cu.getTitle());
            post.setExcerpt(cu.getMessage() + "\n\n" + cu.getEmail());
            post.setAuthor(cu.getName());
            post.setType("CONTACT_US");
            post.setStatus("DRAFT");
            post.setStyle("2");
            post.setCreated(new Timestamp(System.currentTimeMillis()));
            repositoryFactory.getPostRepository().save(post);
            /*MailMessage msg = new MailMessage();
            msg.setSubject(cum.getTitle());
            msg.setTo("iman.norouzy@gmail.com");
            msg.setFrom(cum.getEmail());*/

            /*String htmlString = FileUtils.readFileToString(new File("./server/src/main/templates/meeting/newMeeting.html"));
            htmlString = htmlString.replace("$title", cum.getTitle());
            htmlString = htmlString.replace("$message", cum.getMessage());


            msg.setBody(htmlString);
            MailUtils.sendMail(msg);*/

            return Response.ok(gson.toJson(new ResponseObject("OK", post))).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500)
                    .build();
        }
    }

    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @PermitAll
    @PostMapping("/api/upload-file")
    public Response uploadFile(@AuthenticationPrincipal UserDetails u,
                               @RequestParam(value = "file", required = false) MultipartFile file,
                               @FormDataParam("file") FormDataBodyPart body,
                               @RequestParam(value = "filename", required = false) String filename) {

        try {
            String fileUrl = "";
            if(filename != null && !filename.isEmpty() && file != null) {

                String uniqueUploadedFileName =  (
                        (new Date()).toString()).replace(" ", "").replace(":","")
                        + "_" + filename;


                String fileName = fileStorageService.storeFile(file, "files/file/" + uniqueUploadedFileName, "/");

                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/download/")
                        .path(fileName)
                        .toUriString();

                fileUrl = Utils.fixUri(fileDownloadUri);
            }
            Gson gson = new Gson();
            return Response.ok(gson.toJson(new ResponseObject("OK", fileUrl)))
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500)
                    .build();
        }
    }

    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @PermitAll
    @PostMapping("/api/upload-album-image")
    public Response uploadAlbumImage(@FormDataParam("file") InputStream uploadedInputStream,
                                     @FormDataParam("file") FormDataContentDisposition fileDetail,
                                     @FormDataParam("file") FormDataBodyPart body){

        Gson gson = new Gson();

        String url = "";//Utils.saveFile(uploadedInputStream, fileDetail, body, "/images/event/album");

        return Response.ok(gson.toJson(new ResponseObject("OK", url)))
                .build();
    }

    @GetMapping("/api/convert-date/{date}")
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


//    @RequestMapping(value = "/{[path:[^\\.]*}")
    @RequestMapping(value = "/**/{path:[^.]*}")
    public ResponseEntity<Resource> ui(HttpServletRequest request) throws Exception {
            ClassLoader classloader = Thread.currentThread().getContextClassLoader();
            return ResponseEntity.ok(new InputStreamResource(Objects.requireNonNull(classloader.getResourceAsStream("public/index.html"))));
    }

    @GetMapping("/api/download/{dir}/{type}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,
                                                 @PathVariable String type,
                                                 @PathVariable String dir,
                                                 HttpServletRequest request) throws Exception {
        // type could be venues, users, contacts
        Resource resource = fileStorageService.loadFileAsResource(fileName, dir + "/" + type);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            Application.logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
