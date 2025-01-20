package org.iu.quiz.question.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Builder
@Entity
@Table(name = "question_answer", schema = "quizapp")
@SequenceGenerator(name = "question_answer_seq", sequenceName = "question_answer_seq")
@NoArgsConstructor
@AllArgsConstructor
public class QuestionAnswer extends PanacheEntity {

  @Column(name = "question")
  public String question;

  @Column(name = "answers")
  @JdbcTypeCode(SqlTypes.JSON)
  public List<Answer> answers;

  @Column(name = "module")
  public String module;

  @Column(name = "status")
  @Builder.Default
  public Status status = Status.DRAFT;

  @CreationTimestamp public LocalDateTime createdAt;

  public String creator;
}
