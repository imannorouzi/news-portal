package app.repositories;

import app.objects.PostSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostSectionRepository extends JpaRepository<PostSection, Integer> {

    // custom query to search to blog post by title or content
//    List<Contact> findByTitleContainingOrContentContaining(String name, String textAgain);


    PostSection findPostById(int postSectionId);

    List<PostSection> findPostSectionByPostId(int postId);

}

