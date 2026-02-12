package com.example.system_erp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Esto permite usar @PreAuthorize para el requisito de Admin
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(org.springframework.security.config.Customizer.withDefaults()) // Habilita CORS
                .csrf(csrf -> csrf.disable()) // Deshabilitamos CSRF porque usaremos JWT
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sin
                                                                                                              // sesiones
                                                                                                              // en el
                                                                                                              // servidor
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll() // El login es público
                        .requestMatchers("/api/users/reset-admin-password").permitAll() // Reset de contraseña (temporal)
                        .requestMatchers("/api/users/register").permitAll() // Registro es público
                        .anyRequest().authenticated() // Todo lo demás requiere login
                );
        return http.build();
    }
}
