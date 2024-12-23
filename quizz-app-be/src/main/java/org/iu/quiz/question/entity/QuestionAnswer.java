package org.iu.quiz.question.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
public class QuestionAnswer extends PanacheEntity {
  @Id
  @GeneratedValue
  public Long id;

  @Column(name="question")
  public String question;

  @Column(name="answers")
  @JdbcTypeCode(SqlTypes.JSON)
  public List<Answer> answers;
}
