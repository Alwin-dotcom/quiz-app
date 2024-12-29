package org.iu.quiz.login.control;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import org.iu.quiz.Control;
import org.iu.quiz.login.entity.User;


@Control
public class LoginService {
  @Inject EntityManager em;

  public User login(String userName, String password) {
    try {
      return (User) em.createQuery("select * from User u where username =?1 and password=?2")
          .setParameter(1, userName)
          .setParameter(2, password)
          .getSingleResult();

    } catch (NoResultException e) {
      System.out.println("No user found for given parameters");
      return null;
    } catch (Exception e) {
      System.out.println("Problem fetching users from database");
      return null;
    }
  }
}
