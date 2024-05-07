package com.minte128.user.service;

import com.minte128.user.dto.UserDTO;
import com.minte128.user.entity.User;
import com.minte128.user.exception.NotFoundException;
import com.minte128.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    public void setup() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testPostUser() {
        UserDTO userDTO = new UserDTO();
        User user = new User();

        when(userRepository.save(any(User.class))).thenReturn(user);
        when(modelMapper.map(userDTO, User.class)).thenReturn(user);
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);

        UserDTO result = userService.createUser(userDTO);

        assertNotNull(result);
        assertEquals(userDTO, result);

        verify(userRepository, times(1)).save(any(User.class));
        verify(modelMapper, times(1)).map(userDTO, User.class);
        verify(modelMapper, times(1)).map(user, UserDTO.class);
    }

    @Test
    void testLoginUser_ValidCredentials() {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("test@example.com");
        userDTO.setPassword("password123");

        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password123");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(modelMapper.map(userDTO, User.class)).thenReturn(user);
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);

        UserDTO result = userService.loginUser(userDTO);

        assertNotNull(result);
        assertEquals(userDTO, result);

        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(modelMapper, times(1)).map(user, UserDTO.class);
    }

    @Test
    void testLoginUser_InValidCredentials() {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("test@example.com");
        userDTO.setPassword("pa");

        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password123");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(modelMapper.map(userDTO, User.class)).thenReturn(user);
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);
        assertThrows(NotFoundException.class, () -> {
            userService.loginUser(userDTO);
        });
    }

    @Test
    void testLoginUser_UserNotFound() {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("nonexistent@example.com");
        userDTO.setPassword("password123");

        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> {
            userService.loginUser(userDTO);
        });

        verify(userRepository, times(1)).findByEmail("nonexistent@example.com");
        verify(modelMapper, never()).map(any(User.class), eq(UserDTO.class));
    }

    @Test
    void testPatchUser() {
        Integer id = 1;
        UserDTO userDTO = new UserDTO();
        userDTO.setPassword("newpassword");

        User user = new User();
        user.setPassword("newpassword");

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        when(userRepository.save(any(User.class))).thenReturn(user);
        when(modelMapper.map(userDTO, User.class)).thenReturn(user);
        when(modelMapper.map(user, UserDTO.class)).thenReturn(userDTO);

        UserDTO result = userService.updateUser(id, userDTO);

        assertNotNull(result);
        assertEquals(userDTO, result);

        verify(userRepository, times(1)).save(any(User.class));
        verify(modelMapper, times(1)).map(userDTO, User.class);
    }

    @Test
    void testFindUserById_UserFound() {
        Integer id = 1;
        User user = new User();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDTO.class)).thenReturn(new UserDTO());

        UserDTO result = userService.findUserById(id);

        assertNotNull(result);

        verify(userRepository, times(1)).findById(id);
        verify(modelMapper, times(1)).map(user, UserDTO.class);
    }

    @Test
    void testFindUserById_UserNotFound() {
        Integer id = 1;

        when(userRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> {
            userService.findUserById(id);
        });

        verify(userRepository, times(1)).findById(id);
    }

    @Test
    void testGetUserByEmail_UserFound() {
        String email = "test@example.com";
        User user = new User();

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDTO.class)).thenReturn(new UserDTO());

        UserDTO result = userService.getUserByEmail(email);

        assertNotNull(result);

        verify(userRepository, times(1)).findByEmail(email);
        verify(modelMapper, times(1)).map(user, UserDTO.class);
    }

    @Test
    void testGetUserByEmail_UserNotFound() {
        String email = "nonexistent@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        UserDTO result = userService.getUserByEmail(email);

        assertNull(result);

        verify(userRepository, times(1)).findByEmail(email);
        verify(modelMapper, never()).map(any(User.class), eq(UserDTO.class));
    }
}
