package app.api;

import app.objects.*;
import app.repositories.RepositoryFactory;
import app.utils.FileStorageService;
import app.utils.Utils;
import com.amazonaws.util.json.JSONObject;
import com.google.gson.Gson;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.security.PermitAll;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class PostSectionAPI {

    final RepositoryFactory repositoryFactory;

    private final FileStorageService fileStorageService;

    Gson gson = new Gson();

    public PostSectionAPI(RepositoryFactory repositoryFactory, FileStorageService fileStorageService) {
        this.repositoryFactory = repositoryFactory;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/update-post-section")
    public Response updatePostSection(@AuthenticationPrincipal UserDetails u,
                                      @RequestParam(value = "file", required = false) MultipartFile file,
                                      @RequestParam("postSection") String postJsonString,
                                      @RequestParam(value = "filename", required = false) String filename) {

        User user = repositoryFactory.getUserRepository().findByUsername(u.getUsername());
        PostSection postSection;
        try {
//            JSONObject jsonpost = new JSONObject(postJsonString);
//            postSection = new PostSection(jsonpost);
            postSection = gson.fromJson(postJsonString, PostSection.class);

            if (filename != null && !filename.isEmpty() && file != null) {
                filename = "post_" + user.getId() + "_" + filename.replaceAll("\\s+", "");

                String fileName = fileStorageService.storeFile(file, "files/post-section/" + filename, "/");

                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/download/")
                        .path(fileName)
                        .toUriString();

                postSection.setFileUrl(Utils.fixUri(fileDownloadUri));
            }

            postSection = repositoryFactory.getPostSectionRepository().save(postSection);

        } catch (Exception e) {
            e.printStackTrace();

            return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", ""))).build();
        }


        return Response.ok(gson.toJson(new ResponseObject("OK", postSection.getId()))).build();
    }
}
