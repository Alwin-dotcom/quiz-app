package org.iu.quiz.login.entity;

import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class User {
  public String userName;
  public String password;
  public String emailAddress;
  public String firstName;
  public String lastName;
}
