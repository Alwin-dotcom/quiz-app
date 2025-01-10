package org.iu.quiz.login.boundary;

import io.quarkus.oidc.IdToken;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.iu.quiz.Boundary;
import org.iu.quiz.login.control.LoginService;

import java.util.Objects;

@Boundary
@Path("/login")
public class LoginResource {
  @Inject LoginService loginService;

  @Inject
  @IdToken
  JsonWebToken idToken;

  @GET
  @Authenticated
  @Produces(MediaType.TEXT_PLAIN)
  public String hello() {
    return "Hello, " + idToken.getName();
  }

  @POST
  Response login(String username, String password) {
    final var user = loginService.login(username, password);
    if (Objects.nonNull(user)) {
      return Response.ok().entity(user).build();
    } else {
      return Response.status(403).build();
    }
  }
}
