package app.repositories;

import app.objects.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

    // custom query to search to blog post by title or content
    List<Location> findAllByUserIdAndIsActiveAndIsVirtual(Integer userId, boolean isActive, boolean isVirtual);

}

