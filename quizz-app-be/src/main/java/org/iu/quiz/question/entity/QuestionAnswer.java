package org.iu.quiz.question.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

import java.util.List;

@Entity
public class QuestionAnswer extends PanacheEntity {
  public String Question;
  public List<Answer> answers;
}
