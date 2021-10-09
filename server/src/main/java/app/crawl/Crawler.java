package app.crawl;

import app.objects.Post;
import app.objects.PostSection;
import com.amazonaws.util.json.JSONException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.net.URL;
import java.sql.Timestamp;
import java.util.*;

public class Crawler {

    public static Post crawl(String url) throws IOException {
        System.out.println("Fetching " + url + "...");
        Document doc = Jsoup.connect(url).get();
        Post post = null;
        try {
            URL address = new URL(url);
            switch ( address.getHost() ) {
                case "www.akhbar-rooz.com":
                case "akhbar-rooz.com":
                    post = Crawler.extractAkhbarRooz(doc);
                    post.setLink(url);
                    break;
                case "www.bepish.org":
                case "bepish.org":
                    post = Crawler.extractBepish(doc);
                    post.setLink(url);
                    break;
                case "www.rahekargar.net":
                case "rahekargar.net":
                    post = Crawler.extractRaheKargar(doc);
                    post.setLink(url);
                    break;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        System.out.println("Crawling done.");
        return post;
    }


    public static Post extractAkhbarRooz(Document document) throws JSONException {

        Post post = new Post();
        post.setTitle(document.select("h1.elementor-heading-title").toString().replaceAll("\\<[^>]*>",""));
        post.setExcerpt(document.select(".elementor-widget-theme-post-excerpt .elementor-widget-container").toString().replaceAll("\\<[^>]*>",""));
        post.setStatus("PUBLISH");
        post.setStyle("2");
        post.setType("ARTICLE");
        post.setTwitterText("");
        post.setCreated(new Timestamp(System.currentTimeMillis()));

        PostSection ps = new PostSection();
        ps.setStyles(new ArrayList<>());
        ps.setText(document.select(".pf-content").toString());
        ps.setType("TEXT");

        post.setPostSections(Collections.singletonList(ps));

        return post;
    }

    public static Post extractBepish(Document document) throws JSONException {

        Post post = new Post();
        post.setTitle(document.select("h1.page-header").toString().replaceAll("\\<[^>]*>",""));
        post.setExcerpt(document.select(".field_body_summary").toString().replaceAll("\\<[^>]*>",""));
        post.setAuthor(document.select(".field-name-field-nevisande").text());
        post.setStatus("PUBLISH");
        post.setStyle("2");
        post.setType("ARTICLE");
        post.setTwitterText("");
        post.setImageUrl(document.select(".field-name-field-image .img-responsive").first().attr("src"));
        post.setCreated(new Timestamp(System.currentTimeMillis()));

        PostSection ps = new PostSection();
        ps.setStyles(new ArrayList<>());
        ps.setText(document.select(".field-name-body").toString());
        ps.setType("TEXT");

        post.setPostSections(Collections.singletonList(ps));

        return post;
    }

    public static Post extractRaheKargar(Document document) throws JSONException {

        Post post = new Post();
        post.setStatus("PUBLISH");
        post.setStyle("2");
        post.setType("ARTICLE");
        post.setTwitterText("");
        post.setCreated(new Timestamp(System.currentTimeMillis()));

        PostSection ps = new PostSection();
        ps.setStyles(new ArrayList<>());
        ps.setText(document.select(".Section1").toString());
        ps.setType("TEXT");

        post.setPostSections(Collections.singletonList(ps));

        return post;
    }
}
