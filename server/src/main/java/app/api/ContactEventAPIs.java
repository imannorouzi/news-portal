package app.api;

import app.objects.ContactEvent;
import app.repositories.RepositoryFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactEventAPIs {

    final RepositoryFactory repositoryFactory;

    public ContactEventAPIs(RepositoryFactory repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    @GetMapping("/contact-event/{id}")
    public ContactEvent getContactEvent(@PathVariable String id){
        int blogId = Integer.parseInt(id);
        return repositoryFactory.getContactEventRepository().findById(blogId).orElse(null);
    }

}
