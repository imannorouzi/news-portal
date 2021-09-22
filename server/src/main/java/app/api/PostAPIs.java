package app.api;

import app.objects.Post;
import app.objects.ResponseObject;
import app.objects.User;
import app.utils.FileStorageService;
import app.utils.Utils;
import com.amazonaws.util.json.JSONObject;
import com.google.gson.Gson;
import app.repositories.RepositoryFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.security.PermitAll;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Optional;

@RestController
public class PostAPIs {

    final RepositoryFactory repositoryFactory;

    private final FileStorageService fileStorageService;

    Gson gson = new Gson();

    public PostAPIs(RepositoryFactory repositoryFactory, FileStorageService fileStorageService) {
        this.repositoryFactory = repositoryFactory;
        this.fileStorageService = fileStorageService;
    }

//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @GetMapping("/post/{id}")
    public Post getpost(@PathVariable String id){
        int blogId = Integer.parseInt(id);
        return repositoryFactory.getPostRepository().findById(blogId).orElse(null);
    }


    @GetMapping("/get-posts")
    public Response getposts(@AuthenticationPrincipal UserDetails u,
                                @RequestParam("hint") String hint)  {

        try {

            List<Post> posts = null;
            User user = repositoryFactory.getUserRepository().findByUsername(u.getUsername());


            return Response.ok(gson.toJson(new ResponseObject("OK", posts))).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", e.getMessage()))).build();
        }
    }

    @PostMapping("/update-post-status")
    public ResponseObject updatePostStatus(@RequestBody User user, String objectString){

        Gson gson = new Gson();
        try {
            JSONObject jsonObject = new JSONObject(objectString);

            Optional<Post> pst = repositoryFactory.getPostRepository().findById(jsonObject.getInt("postId"));
            if(pst.isPresent()){
//                pst.get().setStatus(Post.STATUS.valueOf(jsonObject.getString("status")));
                pst.get().setStatus(jsonObject.getString("status"));
                repositoryFactory.getPostRepository().save(pst.get());
                return new ResponseObject("OK", pst);
            }else{
                return new ResponseObject("FAIL", pst);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseObject("FAIL", e.getMessage());
        }
    }


    @PostMapping("/update-post")
    public Response updatePost(@AuthenticationPrincipal UserDetails u,
                                  @RequestParam(value = "file", required = false) MultipartFile file,
                                  @RequestParam("post") String postJsonString,
                                  @RequestParam(value = "filename", required = false) String filename) {


        User user = repositoryFactory.getUserRepository().findByUsername(u.getUsername());
        Post post;
        try {
            JSONObject jsonpost = new JSONObject(postJsonString);
            post = new Post(jsonpost);

            // check if any user has been registered with the same email

            if(filename != null && !filename.isEmpty() && file != null) {
                filename = "post_" + user.getId() + "_" + filename.replaceAll("\\s+", "");

                String fileName = fileStorageService.storeFile(file, "images/posts/" + filename, "/");

                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/download/")
                        .path(fileName)
                        .toUriString();

                post.setImageUrl(Utils.fixUri(fileDownloadUri));
            }

            post.setUserId(user.getId());

            post = repositoryFactory.getPostRepository().save(post);

        } catch (Exception e) {
            e.printStackTrace();

            return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", ""))).build();
        }


        return Response.ok(gson.toJson(new ResponseObject("OK", post))).build();
    }

    @PermitAll
    @PostMapping("/delete-post")
    public Response deletePost( @AuthenticationPrincipal UserDetails u,
                                   @RequestBody Integer id){

        User user = repositoryFactory.getUserRepository().findByUsername(u.getUsername());
        Post post = null;
        try {
            post = repositoryFactory.getPostRepository().findPostById(id);
            if(post != null && post.getUserId() == user.getId()){
                repositoryFactory.getPostRepository().delete(post);
                return Response.ok(gson.toJson(new ResponseObject("OK", post))).build();
            }else{
                return Response.ok(gson.toJson(new ResponseObject("FAIL", "NOT FOUND."))).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.ok(gson.toJson(new ResponseObject("FAIL", e.getMessage()))).build();
        }

    }
}
