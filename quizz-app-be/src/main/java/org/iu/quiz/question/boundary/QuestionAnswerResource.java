package org.iu.quiz.question.boundary;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;
import org.iu.quiz.question.control.QuestionService;
import org.iu.quiz.question.entity.QuestionAnswer;

import java.util.Objects;

@Path("/question-answer")
public class QuestionAnswerResource {
  @Inject QuestionService questionService;

  @GET
  @Path("/")
  Response getQuestions() {
    return Response.ok().entity(questionService.getQuestions()).build();
  }

  @POST
  @Path("/")
  Response createQuestionAnswer(QuestionAnswer questionAnswer) {
    final var response = questionService.createQuestion(questionAnswer);
    if (Objects.nonNull(response)) {
      return Response.ok().entity(response).build();
    } else {
      return Response.serverError().build();
    }
  }

  @GET
  @Path("/{id}")
  Response getQuestionAnswer(@PathParam("id") String id){

  }
}
