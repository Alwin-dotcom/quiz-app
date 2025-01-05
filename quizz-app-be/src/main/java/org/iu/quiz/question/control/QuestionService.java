package org.iu.quiz.question.control;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import org.iu.quiz.Control;
import org.iu.quiz.question.entity.QuestionAnswer;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Control
public class QuestionService {
  @Inject EntityManager em;

  public List<QuestionAnswer> getQuestions() {
    try {
      return QuestionAnswer.listAll();
    } catch (Exception e) {
      System.out.println("Error getting questions from database: " + e.getMessage());
      return List.of();
    }
  }

  public List<QuestionAnswer> getQuestionsByModule(String module) {
    try {
      return QuestionAnswer.list("where module=?1", module);
    } catch (Exception e) {
      System.out.println("Error fetching questions for module: " + e.getMessage());
      return List.of();
    }
  }

  public Set<String> getDistinctModules() {
    try {
      return new HashSet<>(
          em.createQuery("select distinct module from QuestionAnswer", String.class)
              .getResultList());
    } catch (Exception e) {
      System.out.println("Error fetching modules");
      return Set.of();
    }
  }

  public QuestionAnswer createQuestion(QuestionAnswer questionAnswer) {
    try {
      questionAnswer.persistAndFlush();
      return QuestionAnswer.findById(questionAnswer.id);

    } catch (Exception e) {
      System.out.println("Error creating QuestionAnswerEntity: " + e.getMessage());
      return null;
    }
  }

  public QuestionAnswer updateQuestionAnswer(QuestionAnswer questionAnswer) {
    try {
      QuestionAnswer.update(
          "set question=?1 and answers =?2 where id=?3",
          questionAnswer.question,
          questionAnswer.answers,
          questionAnswer.id);
      return QuestionAnswer.findById(questionAnswer.id);
    } catch (Exception e) {
      System.out.println("Error during updating questionAnswer");
      return null;
    }
  }
}
