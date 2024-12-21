package org.iu.quiz.question.entity;

import jakarta.persistence.Entity;

@Entity
public class Answer {
    public String Answer;
    public boolean isCorrect;
}
