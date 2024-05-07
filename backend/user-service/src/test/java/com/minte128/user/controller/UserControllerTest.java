package com.minte128.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minte128.user.dto.LoginDTO;
import com.minte128.user.dto.UserDTO;
import com.minte128.user.service.JwtService;
import com.minte128.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private ModelMapper modelMapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testPostNewUser() throws Exception {
        UserDTO userDTO = new UserDTO();

        Mockito.when(userService.createUser(Mockito.any(UserDTO.class))).thenReturn(userDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testLoginUser() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("abc@gmail.com");
        userDTO.setPassword("abcderfg1@");
        userDTO.setId(1);

        LoginDTO loginDTO = new LoginDTO("user authenticated", true, userDTO.getEmail(), "TOKEN", userDTO.getId());

        Mockito.when(userService.loginUser(Mockito.any(UserDTO.class))).thenReturn(userDTO);
        Mockito.when(jwtService.generateToken(Mockito.anyString(), Mockito.anyString())).thenReturn("TOKEN");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value(loginDTO.getMessage()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(loginDTO.getEmail()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.token").value(loginDTO.getToken()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(loginDTO.getId()));
    }

    @Test
    void testLoginUserValid() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setPassword("abcderfg1@");
        userDTO.setId(1);

        LoginDTO loginDTO = new LoginDTO("user authenticated", true, userDTO.getEmail(), "TOKEN", userDTO.getId());

        Mockito.when(userService.loginUser(Mockito.any(UserDTO.class))).thenReturn(userDTO);
        Mockito.when(jwtService.generateToken(Mockito.anyString(), Mockito.anyString())).thenReturn("TOKEN");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void testUpdateUser() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1);
        userDTO.setFirstName("John Doe");
        userDTO.setEmail("john.doe@example.com");
        userDTO.setPassword("Abcas1@21");

        UserDTO updatedUserDTO = new UserDTO();
        updatedUserDTO.setId(userDTO.getId());
        updatedUserDTO.setFirstName(userDTO.getFirstName());
        updatedUserDTO.setEmail("john.doe@example.com");
        Mockito.when(userService.updateUser(Mockito.anyInt(), Mockito.any(UserDTO.class)))
                .thenReturn(updatedUserDTO);
        mockMvc.perform(MockMvcRequestBuilders.patch("/api/v1/users/{userId}", userDTO.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(userDTO.getId()));
    }

    @Test
    void testGetToken() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("test@example.com");
        userDTO.setPassword("password");

        Mockito.when(userService.getUserByEmail(Mockito.anyString())).thenReturn(null);

        Mockito.when(jwtService.generateToken(Mockito.anyString(), Mockito.anyString())).thenReturn("TOKEN");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("TOKEN"));
    }

    @Test
    void testGetTokenUserAlreadyExists() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("test@example.com");
        userDTO.setPassword("password");
        Mockito.when(userService.getUserByEmail(Mockito.anyString())).thenReturn(userDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
