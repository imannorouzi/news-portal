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
import java.util.List;
import java.util.Optional;

@RestController
public class CategoryAPIs {

    final RepositoryFactory repositoryFactory;
    Gson gson = new Gson();

    public CategoryAPIs(RepositoryFactory repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    @GetMapping("/get-categories")
    public Response getCategories(@AuthenticationPrincipal UserDetails u)  {
        try {
            List<Category> categories = repositoryFactory.getCategoryRepository().findAll();
            return Response.ok(gson.toJson(new ResponseObject("OK", categories))).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity(gson.toJson(new ResponseObject("FAIL", e.getMessage()))).build();
        }
    }

    @PermitAll
    @PostMapping("/delete-category")
    public Response deletePost( @AuthenticationPrincipal UserDetails u,
                                   @RequestBody Integer id){

        Optional<Category> category = null;
        try {
            category = repositoryFactory.getCategoryRepository().findById(id);
            if(category.isPresent()){
                repositoryFactory.getCategoryRepository().delete(category.get());
                return Response.ok(gson.toJson(new ResponseObject("OK", category))).build();
            }else{
                return Response.ok(gson.toJson(new ResponseObject("FAIL", "NOT FOUND."))).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.ok(gson.toJson(new ResponseObject("FAIL", e.getMessage()))).build();
        }

    }
}
