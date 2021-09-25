package app.repositories;

import app.objects.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {

    Tag findById(int catId);
    List<Tag> findAllByName(String name);
    List<Tag> findAll();
}

