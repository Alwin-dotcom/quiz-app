package org.iu.quiz.question.control;

import org.iu.quiz.Control;
import org.iu.quiz.question.entity.QuestionAnswer;

import java.util.List;

@Control
public class QuestionService {
  public List<QuestionAnswer> getQuestions() {
    try {
      return QuestionAnswer.listAll();
    } catch (Exception e) {
      System.out.println("Error getting questions from database: " + e.getMessage());
      return List.of();
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
