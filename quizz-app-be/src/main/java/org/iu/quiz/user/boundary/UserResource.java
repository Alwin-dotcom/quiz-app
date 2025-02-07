package org.iu.quiz.user.boundary;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.iu.quiz.Boundary;
import org.iu.quiz.exceptions.ValidationException;
import org.iu.quiz.user.control.UserService;
import org.iu.quiz.user.entity.User;
import org.iu.quiz.user.entity.UserRank;

import java.util.List;
import java.util.Objects;

@Boundary
@Authenticated
@Path("/user")
public class UserResource {

  @Inject UserService userService;

  @Path("/info")
  @GET
  public Response getUserInfo(@Context SecurityContext securityContext) {

    return Response.ok()
        .entity(buildUserInfo(securityContext.getUserPrincipal().getName()))
        .build();
  }

  private User buildUserInfo(String userName) {
    List<User> users = User.find("where userName = ?1", userName).list();
    if (users.size() != 1) {
      throw new ValidationException("Not only one user found:" + users.size());
    }
    return users.get(0);
  }

  @Path("/rank")
  @POST
  @Transactional
  public Response upsertRank(UserRank userRank) {
    final var updatedRank = userService.upsertRank(userRank);
    if (Objects.nonNull(updatedRank)) {
      return Response.ok().entity(updatedRank).build();
    } else {
      return Response.serverError().build();
    }
  }

  @Path("/ranks")
  @GET()
  public Response getUserRanks() {
    return Response.ok().entity(userService.getAllUserRanks()).build();
  }

  @Path("ranks/total")
  @GET
  public Response getTotalRank() {
    return Response.ok().entity(userService.getTotalRank()).build();
  }
}
