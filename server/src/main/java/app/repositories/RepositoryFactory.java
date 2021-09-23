package app.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RepositoryFactory {

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostSectionRepository postSectionRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LocationRepository locationRepository;

    public RepositoryFactory(){
    }


    public PostRepository getPostRepository() {
        return postRepository;
    }

    public CommentRepository getCommentRepository() {
        return commentRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public LocationRepository getLocationRepository() {
        return locationRepository;
    }

    public PostSectionRepository getPostSectionRepository() {
        return postSectionRepository;
    }
}
