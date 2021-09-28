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

        /*Predicate p = cb.disjunction();
        Predicate orClause = cb.or(cb.like(root.<String>get("title"), filter.getTitle())).
                             cb.like(root.<String>get("excerpt"), filter.getExcerpt()),
                             cb.like(root.<String>get("author"), filter.getAuthor()) );*/

        Predicate p = cb.disjunction();
        /*if (filter.getExcerpt() != null) {
            p.getExpressions().add(cb.or( cb.like(root.get("excerpt"), filter.getExcerpt())));
        }
        if (filter.getAuthor() != null) {
            p.getExpressions().add(cb.or( cb.like(root.get("author"), filter.getAuthor())));
        }*/
        if (filter.getTitle() != null) {
            p.getExpressions().add(cb.like(root.get("title"), filter.getTitle()));
        }

        return p;
    }
}
