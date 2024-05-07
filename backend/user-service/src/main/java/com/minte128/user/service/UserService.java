package com.minte128.user.service;

import com.minte128.user.dto.UserDTO;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);

    UserDTO loginUser(UserDTO userDTO);

    UserDTO updateUser(Integer id, UserDTO userDTO);

    UserDTO getUserByEmail(String email);
}
