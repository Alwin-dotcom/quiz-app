package org.iu.quiz.user.boundary;

import io.quarkus.oidc.IdToken;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.iu.quiz.Boundary;
import org.iu.quiz.user.entity.User;

@Boundary
@Authenticated
@Path("/user")
public class UserResource {

  @Inject @IdToken JsonWebToken jsonWebToken;

  @Path("/info")
  @GET
  public Response getUserInfo() {
    return Response.ok().entity(buildUserInfo()).build();
  }

  User buildUserInfo() {
    return User.builder()
        .email(jsonWebToken.getClaim("email"))
        .userName(jsonWebToken.getClaim("nickname"))
        .build();
  }
}
