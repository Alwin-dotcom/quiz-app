package org.iu.quiz.user.control;

import jakarta.ws.rs.NotFoundException;
import org.iu.quiz.Control;
import org.iu.quiz.user.entity.UserRank;

import java.util.List;

@Control
public class UserService {
  public UserRank upsertRank(UserRank userRank) {
    try {
      UserRank existingUserRank = UserRank.findById(userRank.id);
      userRank.id = existingUserRank.id;
      userRank.persistAndFlush();
      return userRank;
    } catch (NotFoundException e) {
      userRank.persistAndFlush();
      final List<UserRank> matchingUserRanks =
          UserRank.find("where email=?1 and userName = ?2", userRank.email, userRank.userName)
              .list();
      if (matchingUserRanks.size() == 1) {
        return matchingUserRanks.get(0);
      } else {
        throw new NotFoundException("finding user rank returned more or less than one result");
      }
    } catch (Exception e) {
      System.out.println("Error persisting userRank:" + e.getMessage());
      return null;
    }
  }

  public List<UserRank> getAllUserRanks() {
    return UserRank.findAll().list();
  }
}
