package app.repositories;

import app.objects.Category;
import app.objects.Post;
import app.objects.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer>, JpaSpecificationExecutor<Post> {

    // custom query to search to blog post by title or content
//    List<Contact> findByTitleContainingOrContentContaining(String name, String textAgain);


    Post findPostById(int postId);

    List<Post> findAllByTypeAndStatus(String type, String status, Pageable pageable);
    List<Post> findAllByAuthorAndStatus(String author, String status, Pageable pageable);
    List<Post> findAllByStatus(String status, Pageable pageable, Specification<Post> spec);
    List<Post> findAllByStatus(String status, Pageable pageable);
    List<Post> findAllByCategoriesInAndStatus(List<Category> categories, String status, Pageable pageable);
    List<Post> findAllByTagsInAndStatus(List<Tag> tags, String status, Pageable pageable);


    List<Post> findAllByType(String type, Pageable pageable);
    List<Post> findAllByAuthor(String author, Pageable pageable);
    List<Post> findAllByCategoriesIn(List<Category> categories, Pageable pageable);
    List<Post> findAllByTagsIn(List<Tag> tags, Pageable pageable);
}

