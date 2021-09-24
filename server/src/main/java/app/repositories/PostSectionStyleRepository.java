package app.repositories;

import app.objects.PostSectionStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostSectionStyleRepository extends JpaRepository<PostSectionStyle, Integer> {

    // custom query to search to blog post by title or content
//    List<Contact> findByTitleContainingOrContentContaining(String name, String textAgain);

    List<PostSectionStyle> findAllByPostSectionId(int postSectionId);

}

