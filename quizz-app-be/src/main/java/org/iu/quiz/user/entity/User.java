package org.iu.quiz.user.entity;

import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_table")
@UserDefinition
@SequenceGenerator(schema = "quizapp", name = "user_table_seq")
public class User extends PanacheEntity {
  public String email;
  @Column(name="user_name")
  @Username public String userName;
  @Password public String password;
  @Roles public String role;

  /**
   * Adds a new user to the database
   *
   * @param username the username
   * @param password the unencrypted password (it is encrypted with bcrypt)
   * @param role the comma-separated roles
   */
  public static void add(String username, String password, String role, String email) {
    User user = new User();
    user.userName = username;
    user.password = BcryptUtil.bcryptHash(password);
    user.role = role;
    user.email = email;
    user.persist();
  }
}
