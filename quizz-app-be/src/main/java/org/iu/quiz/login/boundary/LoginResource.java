package org.iu.quiz.login.boundary;

import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.iu.quiz.login.control.LoginService;

import java.util.Objects;

@Path("/login")
public class LoginResource {
  @Inject LoginService loginService;

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
