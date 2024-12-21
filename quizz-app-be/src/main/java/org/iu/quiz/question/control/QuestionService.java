package org.iu.quiz.question.control;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.iu.quiz.question.entity.QuestionAnswer;

import java.util.List;

public class QuestionService {
  public List<QuestionAnswer> getQuestions() {
    try {
      return QuestionAnswer.listAll();
    } catch (Exception e) {
      System.out.println("Error getting questions from database");
      return List.of();
    }
  }

  public QuestionAnswer createQuestion(QuestionAnswer questionAnswer){
    try{
      questionAnswer.persist();

    }catch (Exception e){
      System.out.println("Error creating QuestionAnswerEntity");
      return null;
    }
  }


}
