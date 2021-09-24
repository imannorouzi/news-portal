package app.repositories;

import app.objects.Post;
import app.objects.PostMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostMetaRepository extends JpaRepository<PostMeta, Integer> {

    // custom query to search to blog post by title or content
//    List<Contact> findByTitleContainingOrContentContaining(String name, String textAgain);


    PostMeta findPostMetaByPostId(int postId);

    List<PostMeta> findPostMetaByPostIdAndAttribute(int postId, String attr);

}

