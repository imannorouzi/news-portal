package app.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RepositoryFactory {

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostMetaRepository postMetaRepository;

    @Autowired
    PostSectionMetaRepository postSectionMetaRepository;

    @Autowired
    PostSectionRepository postSectionRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    PostSectionStyleRepository postSectionStyleRepository;

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

    public CategoryRepository getCategoryRepository() {
        return categoryRepository;
    }

    public PostSectionStyleRepository getPostSectionStyleRepository() {
        return postSectionStyleRepository;
    }

    public PostMetaRepository getPostMetaRepository() {
        return postMetaRepository;
    }

    public PostSectionMetaRepository getPostSectionMetaRepository() {
        return postSectionMetaRepository;
    }

    public TagRepository getTagRepository() {
        return tagRepository;
    }
}
