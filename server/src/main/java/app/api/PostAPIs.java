package app.api;

import app.objects.*;
import app.repositories.PostSpecification;
import app.utils.FileStorageService;
import app.utils.Utils;
import com.amazonaws.util.json.JSONArray;
import com.amazonaws.util.json.JSONObject;
import com.google.gson.Gson;
import app.repositories.RepositoryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.security.PermitAll;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Arrays;
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

    @GetMapping("/post/{id}")
    public Post getpost(@PathVariable String id){
        int blogId = Integer.parseInt(id);
        return repositoryFactory.getPostRepository().findById(blogId).orElse(null);
    }


    @GetMapping("/get-posts")
    public Response getPosts(@AuthenticationPrincipal UserDetails u,
                             @RequestParam(value = "page") int page,
                             @RequestParam(value = "size") int size,
                             @RequestParam(value = "attribute", required = false) String attribute,
                             @RequestParam(value = "value",required = false) String value,
                             @RequestParam(value = "status",required = false) String status,
                             @RequestParam(value = "hint", required = false) String hint)  {
        try {
            PostAttribute postAttribute = null;
            List<Post> posts;

            if ( status == null || status.isEmpty() ) {
                status = "PUBLISH";
            }

            if (!"null".equals(attribute) &&
                    attribute != null &&
                    !"null".equals(value) &&
                    value != null){
                postAttribute = new PostAttribute(attribute, value);
            }

            posts = getPosts(page, size, postAttribute, status);

            return Response.ok(gson.toJson(new ResponseObject("OK", posts))).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", e.getMessage()))).build();
        }
    }

    @GetMapping("/get-post/{postId}")
    public Response getPost(@AuthenticationPrincipal UserDetails u,
                            @PathVariable(value = "postId") int postId )  {
        try {
            Post post = repositoryFactory.getPostRepository().findPostById(postId);
            post.setPostSections(
                    repositoryFactory.getPostSectionRepository().findPostSectionByPostId(post.getId())
            );
            return Response.ok(gson.toJson(new ResponseObject("OK", post))).build();

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
                pst.get().setStatus(jsonObject.getString("status"));
                repositoryFactory.getPostRepository().save(pst.get());
                return new ResponseObject("OK", gson.toJson(pst));
            }else{
                return new ResponseObject("FAIL", gson.toJson(pst));
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseObject("FAIL", e.getMessage());
        }
    }

    @PostMapping("/update-post-attribute/{postId}")
    public Response updatePostAttribute(@AuthenticationPrincipal UserDetails user,
                                        @PathVariable(value = "postId") int postId,
                                        @RequestBody String objectString){

        Gson gson = new Gson();
        try {
            PostAttribute postAttribute = gson.fromJson(objectString, PostAttribute.class);

            Optional<Post> pst = repositoryFactory.getPostRepository().findById(postId);
            if(pst.isPresent()){
                switch (postAttribute.getAttribute()) {
                    case "status":
                        pst.get().setStatus(postAttribute.getValue());
                        break;
                    case "author":
                        pst.get().setAuthor(postAttribute.getValue());
                        break;
                    case "type":
                        pst.get().setType(postAttribute.getValue());
                        break;
                    case "style":
                        pst.get().setStyle(postAttribute.getValue());
                        break;
                }
                repositoryFactory.getPostRepository().save(pst.get());
                return Response.ok().entity(gson.toJson(new ResponseObject("OK", pst.get()))).build();
            } else {
                return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", ""))).build();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", ""))).build();
        }
    }

    @PermitAll
    @PostMapping("/update-post")
    public Response updatePost(@AuthenticationPrincipal UserDetails u,
                               @RequestParam(value = "file", required = false) MultipartFile file,
                               @RequestParam("post") String postJsonString,
                               @RequestParam(value = "filename", required = false) String filename) {
        Post post;
        try {
            User user = repositoryFactory.getUserRepository().findByUsername(u.getUsername());
            post = gson.fromJson(postJsonString, Post.class);

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
            // post sections will be saved in subsequent requests from the UI

        } catch (Exception e) {
            e.printStackTrace();

            return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", ""))).build();
        }

        return Response.ok(gson.toJson(new ResponseObject("OK", post))).build();
    }

    @GetMapping("/get-categories")
    public Response getCategories(@AuthenticationPrincipal UserDetails u,
                                  @RequestParam(value = "hint", required = false) String hint)  {
        try {
            List<Category> cate = repositoryFactory.getCategoryRepository().findAll();
            return Response.ok(gson.toJson(new ResponseObject("OK", cate))).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", e.getMessage()))).build();
        }
    }

    @GetMapping("/get-tags")
    public Response getTags(@AuthenticationPrincipal UserDetails u,
                            @RequestParam(value = "hint", required = false) String hint)  {
        try {
            List<Tag> tags = repositoryFactory.getTagRepository().findAll();
            return Response.ok(gson.toJson(new ResponseObject("OK", tags))).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", e.getMessage()))).build();
        }
    }

    List<Post> getPosts(int page, int size, PostAttribute pa, String status) {
        Pageable sortedByIds = PageRequest
                .of(page, size, Sort.by("created")
                        .descending().and(Sort.by("id")).descending());

        List<Post> posts = new ArrayList<>();

        if (pa == null) {
            posts = repositoryFactory.getPostRepository().findAllByStatus(status, sortedByIds);
        } else {
//                PostAttribute pa = gson.fromJson(postAttribute, PostAttgson.fromJsonribute.class);
            switch ( pa.getAttribute() ){
                case "type":
                    if ( pa.getValue().equals("ALL")) {
                        posts = status.equals("ALL") ?
                                repositoryFactory.getPostRepository().findAll(sortedByIds).getContent()
                                :
                                repositoryFactory.getPostRepository().findAllByStatus(status, sortedByIds);
                    } else {
                        posts = status.equals("ALL") ?
                                repositoryFactory.getPostRepository().findAllByType( pa.getValue(), sortedByIds)
                                :
                                repositoryFactory.getPostRepository().findAllByTypeAndStatus(pa.getValue(), status, sortedByIds);
                    }
                    break;
                case "author":
                    posts = status.equals("ALL") ?
                            repositoryFactory.getPostRepository().findAllByAuthor(pa.getValue(), sortedByIds)
                            :
                            repositoryFactory.getPostRepository().findAllByAuthorAndStatus(pa.getValue(), status, sortedByIds);
                    break;
                case "status":
                    if ( pa.getValue().equals("ALL")) {
                        posts = repositoryFactory.getPostRepository().findAll(sortedByIds).getContent();
                    } else {
                        posts = repositoryFactory.getPostRepository().findAllByStatus(pa.getValue(), sortedByIds);
                    }
                    break;
                case "category":

                    List<Category> categories = repositoryFactory.getCategoryRepository().findAllByName(pa.getValue());
                    posts = status.equals("ALL") ?
                            repositoryFactory.getPostRepository().findAllByCategoriesIn(categories, sortedByIds)
                            :
                            repositoryFactory.getPostRepository().findAllByCategoriesInAndStatus(categories, status, sortedByIds);
                    break;
                case "tag":
                    List<Tag> tags = repositoryFactory.getTagRepository().findAllByName(pa.getValue());
                    posts = status.equals("ALL") ?
                            repositoryFactory.getPostRepository().findAllByTagsIn(tags, sortedByIds)
                            :
                            repositoryFactory.getPostRepository().findAllByTagsInAndStatus(tags, status, sortedByIds);
                    break;
                case "search":
                        Post filter = new Post();
                        filter.setTitle(pa.getValue());
                        filter.setExcerpt(pa.getValue());
                        filter.setAuthor(pa.getValue());
                        filter.setStatus(status);

                        Specification<Post> spec = new PostSpecification(filter);

                        posts = repositoryFactory.getPostRepository().findAll(spec, sortedByIds).getContent();
                    break;
            }

        }

        for(Post post: posts) {
            post.setPostSections(
                    repositoryFactory.getPostSectionRepository().findPostSectionByPostId(post.getId())
            );
        }
        return posts;
    }
}
