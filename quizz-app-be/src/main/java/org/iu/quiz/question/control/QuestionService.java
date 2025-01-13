package org.iu.quiz.question.control;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.iu.quiz.Control;
import org.iu.quiz.question.entity.QuestionAnswer;

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

  public QuestionAnswer createQuestion(QuestionAnswer questionAnswer, String creator) {
    try {
      questionAnswer.creator = creator;
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
          "question = ?1, answers = ?2, module=?3 where id = ?4",
          questionAnswer.question,
          questionAnswer.answers,
          questionAnswer.module,
          questionAnswer.id);
      return QuestionAnswer.findById(questionAnswer.id);
    } catch (Exception e) {
      System.out.println("Error during updating questionAnswer");
      return null;
    }
  }
}
