package app.repositories;

import app.objects.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {


    Category findById(int catId);
    List<Category> findAllByName(String name);
    List<Category> findAll();

}

