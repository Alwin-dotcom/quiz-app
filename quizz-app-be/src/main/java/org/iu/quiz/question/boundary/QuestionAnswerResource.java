package org.iu.quiz.question.boundary;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import java.util.Objects;
import org.iu.quiz.Boundary;
import org.iu.quiz.exceptions.ValidationException;
import org.iu.quiz.question.control.QuestionService;
import org.iu.quiz.question.entity.QuestionAnswer;

@Boundary
@Path("/question-answer")
@Authenticated
public class QuestionAnswerResource {
  @Inject QuestionService questionService;

  @GET
  @Path("/")
  public Response getQuestions(@Context SecurityContext context) {
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
  @Transactional
  public Response createQuestionAnswer(
      QuestionAnswer questionAnswer, @Context SecurityContext context) {
    if (questionAnswer.answers.size() != 4) {
      return Response.status(460)
          .entity(
              new ValidationException(
                  "Expected answer size is 4 but was: " + questionAnswer.answers.size()))
          .build();
    }
    final var response =
        questionService.createQuestion(questionAnswer, context.getUserPrincipal().getName());
    if (Objects.nonNull(response)) {
      return Response.ok().entity(response).build();
    } else {
      return Response.serverError().build();
    }
  }

  @PUT
  @Path("/")
  @Transactional
  public Response updateQuestionAnswer(QuestionAnswer questionAnswer) {
    final var result = questionService.updateQuestionAnswer(questionAnswer);
    if (Objects.nonNull(result)) {
      return Response.ok().entity(result).build();
    } else {
      return Response.serverError().build();
    }
  }

  @POST
  @Path("/{id}/APPROVED")
  @Transactional
  public Response approveQuestionAnswer(@PathParam("id") String id) {
    final var questionAnswer = questionService.approveQuestionAnswer(id);
    if (Objects.nonNull(questionAnswer)) {
      return Response.ok().entity(questionAnswer).build();
    } else {
      return Response.serverError().build();
    }
  }

  @POST
  @Path("/{id}/REJECTED")
  @Transactional
  public Response rejectQuestionAnswer(@PathParam("id") String id) {
    final var questionAnswer = questionService.rejectQuestionAnswer(id);
    if (Objects.nonNull(questionAnswer)) {
      return Response.ok().entity(questionAnswer).build();
    } else {
      return Response.serverError().build();
    }
  }
}
