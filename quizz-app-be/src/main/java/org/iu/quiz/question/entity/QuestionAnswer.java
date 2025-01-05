package org.iu.quiz.question.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "question_answer")
@SequenceGenerator(schema = "iu", name = "question_answer_seq")
public class QuestionAnswer extends PanacheEntity {

  @Column(name = "question")
  public String question;

  @Column(name = "answers")
  @JdbcTypeCode(SqlTypes.JSON)
  public List<Answer> answers;

  @Column(name = "module")
  public String module;

  @CreationTimestamp
  public String createdAt;

  public String creator;
}
