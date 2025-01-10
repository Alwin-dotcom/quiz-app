package org.iu.quiz.question.boundary;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.iu.quiz.Boundary;
import org.iu.quiz.question.control.QuestionService;
import org.iu.quiz.question.entity.QuestionAnswer;

import java.util.Objects;

@Boundary
@Path("/question-answer")
@Authenticated
public class QuestionAnswerResource {
  @Inject QuestionService questionService;

  @GET
  @Path("/")
  public Response getQuestions() {
    return Response.ok().entity(questionService.getQuestions()).build();
  }

  @GET
  @Path("/modules")
  public Response getModules() {
    return Response.ok().entity(questionService.getDistinctModules()).build();
  }

  @GET
  @Path("/modules/{module}")
  public Response getQuestionsByModule(@PathParam("module") String module) {
    return Response.ok().entity(questionService.getQuestionsByModule(module)).build();
  }

  @POST
  @Path("/")
  public Response createQuestionAnswer(QuestionAnswer questionAnswer) {
    if (questionAnswer.answers.size() != 3) {
      return Response.status(404).build();
    }
    final var response = questionService.createQuestion(questionAnswer);
    if (Objects.nonNull(response)) {
      return Response.ok().entity(response).build();
    } else {
      return Response.serverError().build();
    }
  }

  @PUT
  @Path("/")
  public Response updateQuestionAnswer(QuestionAnswer questionAnswer) {
    final var result = questionService.updateQuestionAnswer(questionAnswer);
    if (Objects.nonNull(result)) {
      return Response.ok().entity(result).build();
    } else {
      return Response.serverError().build();
    }
  }
}
