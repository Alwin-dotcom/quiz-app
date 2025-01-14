package org.iu.quiz.user.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="user_rank")
@SequenceGenerator(schema = "iu", name = "user_rank_seq")
public class UserRank extends PanacheEntity {
  public String email;
  public String userName;
  public int rank;
}
