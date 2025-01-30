package org.iu.quiz.user.boundary;

import io.quarkus.oidc.IdToken;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.iu.quiz.Boundary;
import org.iu.quiz.user.control.UserService;
import org.iu.quiz.user.entity.User;
import org.iu.quiz.user.entity.UserRank;

import java.util.Objects;

@Boundary
@Authenticated
@Path("/user")
public class UserResource {

  @Inject @IdToken JsonWebToken jsonWebToken;
  @Inject UserService userService;

  @Path("/info")
  @GET
  public Response getUserInfo() {
    return Response.ok().entity(buildUserInfo()).build();
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
  public Response getTotalRank(){
    return Response.ok().entity(userService.getTotalRank()).build();
  }

  User buildUserInfo() {
    return User.builder()
        .email(jsonWebToken.getClaim("email"))
        .userName(jsonWebToken.getClaim("nickname"))
        .build();
  }
}
