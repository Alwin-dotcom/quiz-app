package org.iu.quiz;

import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Stereotype;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Stereotype
@Transactional
@RequestScoped
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Authenticated
public @interface Boundary {}
