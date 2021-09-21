package app.mail;

import app.objects.*;
import app.utils.Utils;
import org.apache.commons.io.FileUtils;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.util.Properties;

public class MailUtils {

    public static void sendMail(MailMessage msg){
        String to = msg.getTo();
        String from = "root@sholop.com"; //msg.getTo();
        String host = "localhost";//or IP address
        Properties properties = System.getProperties();
        properties.setProperty("mail.smtp.host", host);
        Session session = Session.getDefaultInstance(properties);

        try{
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
            message.setSubject(msg.getSubject());
            message.setContent(msg.getBody(),  "text/html;charset=utf-8");

            // Send message
            Transport.send(message);

        }catch (MessagingException mex) {mex.printStackTrace();}
    }



    public static void sendRegisterMail(User user) {

        try {

            MailMessage msg = new MailMessage();
            msg.setSubject("با شالاپ خوش آمدید");
            msg.setTo(user.getEmail());
            msg.setFrom("root@sholop.com");

            String htmlString = FileUtils.readFileToString(new File("./content/templates/register.html"));
            htmlString = htmlString.replace("$name", user.getName());
            htmlString = htmlString.replace("$confirm-email-url", Utils.WEBSITE_URL + "/confirm-email/" + user.getConfirmEmailUUID());

            msg.setBody(htmlString);
            MailUtils.sendMail(msg);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void sendTemplate(String templateName, String to) {

        try {

            MailMessage msg = new MailMessage();
            msg.setSubject("خیلی خوش اومدید");
            msg.setTo(to);
            msg.setFrom("root@sholop.com");

            String htmlString = FileUtils.readFileToString(new File("./content/templates/" + templateName + ".html"));

            msg.setBody(htmlString);
            MailUtils.sendMail(msg);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
