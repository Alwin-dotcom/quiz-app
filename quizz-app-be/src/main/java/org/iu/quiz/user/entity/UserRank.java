package org.iu.quiz.user.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_rank")
@SequenceGenerator(schema = "quizapp", name = "user_rank_seq")
public class UserRank extends PanacheEntity {
  @Column(name = "email")
  public String email;

  @Column(name = "user_name")
  public String userName;

  @Column(name = "rank")
  public int rank;
}
