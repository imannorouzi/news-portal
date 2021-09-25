package app.repositories;

import app.objects.Style;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostSectionStyleRepository extends JpaRepository<Style, Integer> {


}

