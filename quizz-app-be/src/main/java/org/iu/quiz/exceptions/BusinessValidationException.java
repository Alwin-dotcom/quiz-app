package org.iu.quiz.exceptions;

public class BusinessValidationException extends RuntimeException{
    public BusinessValidationException() {
    }

    public BusinessValidationException(String message) {
        super(message);
    }
}
