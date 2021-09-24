package app.repositories;

import app.objects.PostSectionMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostSectionMetaRepository extends JpaRepository<PostSectionMeta, Integer> {

    PostSectionMeta findPostSectionMetaByPostSectionId(int postId);

}

