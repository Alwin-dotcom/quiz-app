package org.iu.quiz.operations.Control;


import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import org.iu.quiz.user.entity.User;

@Singleton
public class Startup {
    @Transactional
    public void loadUsers(@Observes StartupEvent evt) {
        // reset and load all test users
        User.deleteAll();
        User.add("admin", "admin", "admin", "alwin.fuerst@web.de");
        User.add("user1", "user1", "user", "sometest1user@web.de");
        User.add("user2", "user2", "user", "sometest2user@web.de");
    }
}
