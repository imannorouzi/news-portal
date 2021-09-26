package app.repositories;

import app.objects.Post;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class PostSpecification implements Specification<Post> {

    private Post filter;

    public PostSpecification(Post filter) {
        super();
        this.filter = filter;
    }

    public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> cq,
                                 CriteriaBuilder cb) {

        Predicate p = cb.disjunction();

        if (filter.getTitle() != null) {
            p.getExpressions()
                    .add(cb.equal(root.get("title"), filter.getTitle()));
        }
        if (filter.getExcerpt() != null) {
            p.getExpressions().add(cb.equal(root.get("excerpt"), filter.getExcerpt()));
        }
        if (filter.getAuthor() != null) {
            p.getExpressions().add(cb.equal(root.get("author"), filter.getAuthor()));
        }

        return p;
    }
}
