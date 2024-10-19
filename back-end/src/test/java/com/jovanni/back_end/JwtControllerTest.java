package com.jovanni.back_end;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(JwtController.class)
public class JwtControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private UserDetailsService userDetailsService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private final String httpBasicPassword = "b7ca5db6-11b8-431c-85fb-61453ae45ad2";

    @Test
    public void testUserSignUp() throws Exception {
        String username = "test";
        String password = "test";
        AuthRequest authRequest = new AuthRequest(username, password);
        Mockito.when(passwordEncoder.encode(Mockito.anyString())).thenReturn("encoded-password");

        mockMvc.perform(MockMvcRequestBuilders.post("/signup")
                .with(httpBasic("user", httpBasicPassword))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(authRequest)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testUserSignIn() throws Exception {
        String username = "test";
        String password = "test";
        AuthRequest authRequest = new AuthRequest(username, password);

        mockMvc.perform(MockMvcRequestBuilders.post("/signin")
                .with(httpBasic("user", httpBasicPassword))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(authRequest)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
